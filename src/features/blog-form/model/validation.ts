import { z } from "zod";

export const BlogSchema = z.object({
  title: z.string().min(2).max(50),
  sub_title: z.string().min(2).max(50).optional(),
  body: z.string().min(2).max(500),
  tags: z.array(z.string()).optional(),
});
