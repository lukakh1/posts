"use server";
import { ApiResponse } from "@/shared/api";
import { handleServerActionError } from "@/shared/lib";
import { NewPost, Post } from "@/shared/types";
import ky from "ky";
import { revalidateTag } from "next/cache";
import { GetPostsOptions, PaginatedResponse } from "./post-api-types";

export async function getPosts(
  options: GetPostsOptions = {}
): Promise<ApiResponse<Post[]>> {
  const { limit, page, pageParam } = options;

  let url = `${process.env.API_URL}/posts`;
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
      .get(`${process.env.API_URL}/posts/${id}`, {
        next: { revalidate: 30, tags: ["posts"] },
      })
      .json<Post>();

    return { success: true, data: data };
  } catch (error: unknown) {
    const errorMessage = handleServerActionError(error, "getPost", {
      postId: id,
      url: `${process.env.API_URL}/posts/${id}`,
    });
    throw new Error(errorMessage);
  }
}

export async function addPost(postData: NewPost): Promise<ApiResponse<Post>> {
  try {
    const data = await ky
      .post(`${process.env.API_URL}/posts`, {
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
      url: `${process.env.API_URL}/posts`,
    });
    throw new Error(errorMessage);
  }
}
