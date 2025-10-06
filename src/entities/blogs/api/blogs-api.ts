"use server";
import { ApiResponse, createFrontClient } from "@/shared/api";
import { handleServerActionError } from "@/shared/lib";
import { Blog, NewBlog } from "@/shared/types";
import { revalidatePath } from "next/cache";

export async function getBlogs(): Promise<ApiResponse<Blog[]>> {
  try {
    const supabase = await createFrontClient();

    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return { success: true, data: data };
  } catch (error: unknown) {
    const errorMessage = handleServerActionError(error, "getBlogs", {
      table: "blogs",
    });
    throw new Error(errorMessage);
  }
}

export async function addBlog(blog: NewBlog): Promise<ApiResponse<Blog>> {
  try {
    const supabase = await createFrontClient();

    const { data, error: insertError } = await supabase
      .from("blogs")
      .insert(blog)
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    revalidatePath("/blogs");

    return { success: true, data: data };
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
