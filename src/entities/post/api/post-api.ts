"use server";
import { ApiResponse } from "@/shared/api";
import { Post } from "@/shared/types";

export async function getPosts(): Promise<ApiResponse<Post[]>> {
  try {
    const response = await fetch(`${process.env.API_URL}/posts`, {
      next: { revalidate: 30 },
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
