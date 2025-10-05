"use server";
import { ApiResponse } from "@/shared/api";
import { handleServerActionError } from "@/shared/lib";
import { NewPost, Post } from "@/shared/types";
import ky from "ky";
import { revalidateTag } from "next/cache";

interface GetPostsOptions {
  limit?: number;
  page?: number;
  pageParam?: number;
}

export async function getPosts(
  options: GetPostsOptions = {}
): Promise<ApiResponse<Post[]>> {
  const { limit, page, pageParam } = options;

  let url = `${process.env.API_URL}/posts`;

  if (limit) {
    const skip =
      pageParam !== undefined
        ? pageParam * limit
        : page
        ? (page - 1) * limit
        : 0;

    url += `?limit=${limit}&skip=${skip}`;
  }
  try {
    const result = await ky
      .get(url, {
        next: { revalidate: 30, tags: ["posts"] },
      })
      .json<{ posts: Post[]; total: number }>();

    return {
      success: true,
      data: result.posts,
      total: result.total,
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
      .post(`${process.env.API_URL}/posts/add`, {
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
      url: `${process.env.API_URL}/posts/add`,
    });
    throw new Error(errorMessage);
  }
}
