"use server";
import { ApiResponse } from "@/shared/api";
import { Post } from "@/shared/types";
import { NewPost } from "@/shared/types/post";
import { revalidateTag } from "next/cache";

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
