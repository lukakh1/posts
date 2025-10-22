"use server";
import { ApiResponse } from "@/app/shared/types";
import { db } from "@/pkg/libraries/drizzle";
import { blogs } from "@/pkg/libraries/drizzle/schema";
import { handleServerActionError } from "@/pkg/libraries/error-handler";
import { desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { unstable_cache } from "next/cache";
import { Blog, NewBlog } from "../../models";

export const getBlogs = unstable_cache(
  async (): Promise<ApiResponse<Blog[]>> => {
    try {
      const rows = await db
        .select()
        .from(blogs)
        .orderBy(desc(blogs.created_at));

      return { success: true, data: rows as Blog[] };
    } catch (error: unknown) {
      const errorMessage = handleServerActionError(error, "getBlogs", {
        table: "blogs",
      });
      throw new Error(errorMessage);
    }
  },
  ["blogs-list"],
  {
    revalidate: 30,
    tags: ["blogs-list"],
  }
);

export async function addBlog(blog: NewBlog): Promise<ApiResponse<Blog>> {
  try {
    const [inserted] = await db
      .insert(blogs)
      .values({
        title: blog.title,
        subTitle: blog.sub_title ?? null,
        body: blog.body,
        tags: blog.tags ?? null,
      })
      .returning();

    revalidatePath("/blogs");

    return { success: true, data: inserted };
  } catch (error: unknown) {
    const errorMessage = handleServerActionError(error, "addBlog", {
      blogData: {
        title: blog.title,
      },
      table: "blogs",
    });
    throw new Error(errorMessage);
  }
}
