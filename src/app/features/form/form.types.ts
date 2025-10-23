import { BlogFormData, PostFormData } from "./form.schemas";

export type FormType = "post" | "blog";

export interface FormConfig {
  title: string;
  description?: string;
  submitText: string;
  loadingText: string;
  successMessage: string;
  errorMessage: string;
}

export const FORM_CONFIGS: Record<FormType, FormConfig> = {
  post: {
    title: "Create New Post",
    submitText: "Submit Post",
    loadingText: "Submitting...",
    successMessage: "Post has been created successfully.",
    errorMessage: "Failed to create post.",
  },
  blog: {
    title: "Create New Blog",
    submitText: "Submit Blog",
    loadingText: "Submitting...",
    successMessage: "Blog has been created successfully.",
    errorMessage: "Failed to create blog.",
  },
};

export interface UnifiedFormProps {
  type: FormType;
  className?: string;
}

export type UnifiedFormData = PostFormData | BlogFormData;
