import { z } from "zod";

export const PostSchema = z.object({
  userId: z.number(),
  title: z.string().min(2).max(50),
  body: z.string().min(2).max(500),
});
