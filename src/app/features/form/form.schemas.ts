import { z } from "zod";

export const PostSchema = z.object({
  userId: z.number().min(1, "User ID is required"),
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Body is required"),
});

export const BlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  sub_title: z.string().optional(),
  body: z.string().min(1, "Body is required"),
  tags: z.array(z.string()).optional(),
});

export type PostFormData = z.infer<typeof PostSchema>;
export type BlogFormData = z.infer<typeof BlogSchema>;

export const FORM_FIELDS = {
  post: [
    { name: "userId", type: "number", label: "User ID", required: true },
    { name: "title", type: "text", label: "Post Title", required: true },
    { name: "body", type: "textarea", label: "Description", required: true },
  ],
  blog: [
    { name: "title", type: "text", label: "Blog Title", required: true },
    {
      name: "sub_title",
      type: "text",
      label: "Subtitle (Optional)",
      required: false,
    },
    { name: "body", type: "textarea", label: "Description", required: true },
  ],
};
