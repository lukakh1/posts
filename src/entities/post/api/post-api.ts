"use server";
import { ApiResponse } from "@/shared/api";
import { Post } from "@/shared/types";
import { NewPost } from "@/shared/types/post";
import { revalidateTag } from "next/cache";

export async function getInfinitePosts(
  pageParam: number = 0,
  limit: number = 10
): Promise<ApiResponse<Post[]>> {
  const skip = pageParam * limit;
  try {
    const response = await fetch(
      `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return {
      success: true,
      data: result.posts,
      total: result.total,
    };
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      return { success: false, error: (error as { message: string }).message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
}

export async function getPosts(): Promise<ApiResponse<Post[]>> {
  try {
    const response = await fetch(`${process.env.API_URL}/posts`, {
      next: { revalidate: 30, tags: ["posts"] },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return { success: true, data: data };
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      return { success: false, error: (error as { message: string }).message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
}

export async function getPostsByPag(
  limit: number,
  page: number
): Promise<ApiResponse<Post[]>> {
  try {
    const baseUrl = process.env.API_URL;
    const response = await fetch(
      `${baseUrl}/posts?_page=${page}&_limit=${limit}`,
      {
        next: { revalidate: 30, tags: ["posts"] },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    // Get total count from headers (json-server provides this)
    const totalCount = parseInt(
      response.headers.get("X-Total-Count") || "0",
      10
    );

    return {
      success: true,
      data: data,
      total: totalCount,
    };
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      return { success: false, error: (error as { message: string }).message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
}

export async function getPost(id: string): Promise<ApiResponse<Post>> {
  try {
    const response = await fetch(`${process.env.API_URL}/posts/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return { success: true, data: data };
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      return { success: false, error: (error as { message: string }).message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
}

export async function addPost(postData: NewPost): Promise<ApiResponse<Post>> {
  try {
    const response = await fetch(`${process.env.API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    revalidateTag("posts");
    return { success: true, data: data };
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      return { success: false, error: (error as { message: string }).message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
}
