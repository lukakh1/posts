"use server";
import { ApiResponse } from "@/app/shared/types";
import { envClient } from "@/config/env";
import { handleServerActionError } from "@/pkg/utils/error-handler";
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
    return {
      success: false,
      error: errorMessage,
    };
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
    return {
      success: false,
      error: errorMessage,
    };
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
    return {
      success: false,
      error: errorMessage,
    };
  }
}
