"use server";
import { ApiResponse } from "@/app/shared/types";
import { envClient } from "@/config/env";
import {
  handlePrefetchError,
  handleServerActionError,
} from "@/pkg/libraries/error-handler";
import { getQueryClient } from "@/pkg/libraries/rest-api";
import ky from "ky";
import { revalidateTag } from "next/cache";
import { NewPost, Post } from "../../models";

export interface PaginatedResponse {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: Post[];
}

interface GetPostsOptions {
  limit?: number;
  page?: number;
  pageParam?: number;
}

export async function getPosts(
  options: GetPostsOptions = {}
): Promise<ApiResponse<Post[]>> {
  const { limit, page, pageParam } = options;

  let url = `${envClient.NEXT_PUBLIC_API_URL}/posts`;
  const usePagination = limit || page || pageParam !== undefined;

  if (usePagination) {
    const currentPage = pageParam !== undefined ? pageParam + 1 : page || 1;
    const perPage = limit || 10;

    url += `?_page=${currentPage}&_per_page=${perPage}`;
  }

  try {
    const result = await ky
      .get(url, {
        next: { revalidate: 30, tags: ["posts"] },
      })
      .json<PaginatedResponse | Post[]>();

    return {
      success: true,
      data: usePagination
        ? (result as PaginatedResponse).data
        : (result as Post[]),
      total: usePagination
        ? (result as PaginatedResponse).items
        : (result as Post[]).length,
    };
  } catch (error: unknown) {
    const errorMessage = handleServerActionError(error, "getPosts", {
      url,
      limit: limit ?? null,
      page: page ?? null,
      pageParam: pageParam ?? null,
    });
    throw new Error(errorMessage);
  }
}

export async function getPost(id: string): Promise<ApiResponse<Post>> {
  try {
    const data = await ky
      .get(`${envClient.NEXT_PUBLIC_API_URL}/posts/${id}`, {
        next: { revalidate: 30, tags: ["posts"] },
      })
      .json<Post>();

    return { success: true, data: data };
  } catch (error: unknown) {
    const errorMessage = handleServerActionError(error, "getPost", {
      postId: id,
      url: `${envClient.NEXT_PUBLIC_API_URL}/posts/${id}`,
    });
    throw new Error(errorMessage);
  }
}

export async function addPost(postData: NewPost): Promise<ApiResponse<Post>> {
  try {
    const data = await ky
      .post(`${envClient.NEXT_PUBLIC_API_URL}/posts`, {
        json: postData,
      })
      .json<Post>();

    revalidateTag("posts");
    return { success: true, data: data };
  } catch (error: unknown) {
    const errorMessage = handleServerActionError(error, "addPost", {
      postData: {
        title: postData.title,
      },
      url: `${envClient.NEXT_PUBLIC_API_URL}/posts`,
    });
    throw new Error(errorMessage);
  }
}

export async function prefetchPosts(options?: {
  limit?: number;
  page?: number;
  pageParam?: number;
  prefetchPages?: number;
}) {
  const queryClient = getQueryClient();
  const { limit, page, pageParam, prefetchPages = 4 } = options || {};

  if (!limit && !page && pageParam === undefined) {
    await queryClient.prefetchQuery({
      queryKey: ["posts"],
      queryFn: () => getPosts(),
      staleTime: 30 * 1000,
    });
    return queryClient;
  }

  if (pageParam !== undefined) {
    await queryClient.prefetchInfiniteQuery<ApiResponse<Post[]>>({
      queryKey: ["postsInf"],
      queryFn: ({ pageParam }) =>
        getPosts({
          pageParam: pageParam as number,
          limit: limit || 10,
        }),
      initialPageParam: 0,
      getNextPageParam: (
        lastPage: ApiResponse<Post[]>,
        allPages: ApiResponse<Post[]>[]
      ) => {
        const pageLimit = limit || 10;
        const nextSkip = allPages.length * pageLimit;
        return lastPage.total && nextSkip < lastPage.total
          ? allPages.length
          : undefined;
      },
    });
    return queryClient;
  }

  if (page && limit) {
    const currentPage = page;
    const prefetchPromises: Promise<unknown>[] = [];

    for (let i = 0; i < prefetchPages; i++) {
      const pageToFetch = currentPage + i;

      prefetchPromises.push(
        queryClient
          .prefetchQuery({
            queryKey: ["posts", "paginated", { limit, page: pageToFetch }],
            queryFn: async () => {
              try {
                const result = await getPosts({
                  limit,
                  page: pageToFetch,
                });
                if (!result.success) {
                  throw new Error(result.error ?? "Failed to fetch posts");
                }
                return result;
              } catch (error) {
                handlePrefetchError(error, ["posts", "paginated"], {
                  limit,
                  page: pageToFetch,
                  currentPage,
                  prefetchIndex: i,
                });
                throw error;
              }
            },
            staleTime: 1000 * 30,
          })
          .catch((error) => {
            console.error(`Failed to prefetch page ${pageToFetch}:`, error);
          })
      );
    }

    await Promise.all(prefetchPromises);
    return queryClient;
  }

  if (limit) {
    await queryClient.prefetchInfiniteQuery<ApiResponse<Post[]>>({
      queryKey: ["postsInf"],
      queryFn: ({ pageParam }) =>
        getPosts({
          pageParam: pageParam as number,
          limit,
        }),
      initialPageParam: 0,
      getNextPageParam: (
        lastPage: ApiResponse<Post[]>,
        allPages: ApiResponse<Post[]>[]
      ) => {
        const nextSkip = allPages.length * limit;
        return lastPage.total && nextSkip < lastPage.total
          ? allPages.length
          : undefined;
      },
    });
    return queryClient;
  }

  return queryClient;
}
