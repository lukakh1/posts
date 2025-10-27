"use server";
import { ApiResponse } from "@/app/shared/types";
import { envClient } from "@/config/env";
import { restApiFetcher } from "@/pkg/libraries/rest-api/fetcher/rest-api.fetcher";
import { handleServerActionError } from "@/pkg/utils/error-handler";
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

  const usePagination = limit || page || pageParam !== undefined;

  const currentPage = pageParam !== undefined ? pageParam + 1 : page || 1;
  const perPage = limit || 10;

  const searchParams = usePagination
    ? { _page: currentPage.toString(), _per_page: perPage.toString() }
    : {};

  try {
    const result = (await restApiFetcher
      .get("posts", {
        searchParams,
        timeout: 10000,
        next: {
          revalidate: 30,
          tags: ["posts"],
        },
      })
      .json()) as PaginatedResponse | Post[];

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
    console.error("[getPosts] Error:", error);
    const errorMessage = handleServerActionError(error, "getPosts", {
      limit: limit ?? null,
      page: page ?? null,
      pageParam: pageParam ?? null,
      apiUrl: envClient.NEXT_PUBLIC_API_URL,
    });
    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function getPost(id: string): Promise<ApiResponse<Post>> {
  try {
    const data = (await restApiFetcher
      .get(`posts/${id}`, {
        timeout: 10000,
        next: {
          revalidate: 30,
          tags: ["posts"],
        },
      })
      .json()) as Post;

    return { success: true, data };
  } catch (error: unknown) {
    console.error("[getPost] Error:", error);
    const errorMessage = handleServerActionError(error, "getPost", {
      postId: id,
      apiUrl: envClient.NEXT_PUBLIC_API_URL,
    });
    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function addPost(postData: NewPost): Promise<ApiResponse<Post>> {
  try {
    const data = (await restApiFetcher
      .post("posts", {
        json: postData,
      })
      .json()) as Post;

    revalidateTag("posts");
    return { success: true, data };
  } catch (error: unknown) {
    const errorMessage = handleServerActionError(error, "addPost", {
      postData: {
        title: postData.title,
      },
    });
    return {
      success: false,
      error: errorMessage,
    };
  }
}
