"use server";
import { ApiResponse, createClient } from "@/shared/api";
import { Blog, NewBlog } from "@/shared/types";
import { revalidatePath } from "next/cache";

export async function getBlogs(): Promise<ApiResponse<Blog[]>> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return { success: true, data: data };
}

export async function addBlog(blog: NewBlog): Promise<ApiResponse<null>> {
  const supabase = await createClient();

  const { error: insertError } = await supabase.from("blogs").insert(blog);

  if (insertError) {
    throw new Error(insertError.message);
  }
  revalidatePath("/blogs");

  return { success: true };
}
