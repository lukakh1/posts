import { z } from "zod";

export const SignupSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export type SignupInputs = z.infer<typeof SignupSchema>;
