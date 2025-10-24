"use server";
import { ApiResponse } from "@/app/shared/types";
import { envClient } from "@/config/env";
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

// Use native fetch for better Next.js integration
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
    console.log("[getPosts] Fetching from:", url);

    const response = await fetch(url, {
      next: {
        revalidate: 30,
        tags: ["posts"],
      },
      // In CI/production during build, force cache to work offline after initial fetch
      cache: process.env.CI === "true" ? "force-cache" : "default",
      // Add timeout to fail fast if server isn't available
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = (await response.json()) as PaginatedResponse | Post[];

    console.log(
      "[getPosts] Success:",
      usePagination
        ? `${(result as PaginatedResponse).items} items`
        : `${(result as Post[]).length} items`
    );

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
      url,
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
    console.log("[getPost] Fetching post:", id);

    const response = await fetch(
      `${envClient.NEXT_PUBLIC_API_URL}/posts/${id}`,
      {
        next: {
          revalidate: 30,
          tags: ["posts"],
        },
        cache: process.env.CI === "true" ? "force-cache" : "default",
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = (await response.json()) as Post;

    console.log("[getPost] Success:", data.id);

    return { success: true, data };
  } catch (error: unknown) {
    console.error("[getPost] Error:", error);
    const errorMessage = handleServerActionError(error, "getPost", {
      postId: id,
      url: `${envClient.NEXT_PUBLIC_API_URL}/posts/${id}`,
      apiUrl: envClient.NEXT_PUBLIC_API_URL,
    });
    return {
      success: false,
      error: errorMessage,
    };
  }
}

// This IS a server action (mutation)
export async function addPost(postData: NewPost): Promise<ApiResponse<Post>> {
  try {
    const response = await fetch(`${envClient.NEXT_PUBLIC_API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = (await response.json()) as Post;

    revalidateTag("posts");
    return { success: true, data };
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
