"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { PostSchema } from "../model";
import { useState } from "react";
import { useAddPost } from "@/shared/hooks/use-posts";
import {
  StatusAlert,
  FormField,
  Input,
  Textarea,
  SubmitButton,
} from "./form-components";

type Inputs = {
  userId: number;
  title: string;
  body: string;
};

export default function PostForm() {
  const [status, setStatus] = useState<
    | { type: "success"; message: string }
    | { type: "error"; message: string }
    | null
  >(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(PostSchema) });
  const addPostMutation = useAddPost();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setStatus(null);
    try {
      await addPostMutation.mutateAsync(data);
      setStatus({
        type: "success",
        message: "Post has been created successfully.",
      });
      reset();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create post.";
      setStatus({ type: "error", message });
    }
  };

  return (
    <>
      <StatusAlert status={status} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          label="User ID"
          htmlFor="userId"
          error={errors.userId?.message}
        >
          <Input
            id="userId"
            type="number"
            min="1"
            placeholder="Enter user ID"
            disabled={addPostMutation.isPending}
            hasError={!!errors.userId}
            {...register("userId", { valueAsNumber: true })}
          />
        </FormField>

        <FormField label="Title" htmlFor="title" error={errors.title?.message}>
          <Input
            id="title"
            type="text"
            placeholder="Enter post title"
            disabled={addPostMutation.isPending}
            hasError={!!errors.title}
            {...register("title")}
          />
        </FormField>

        <FormField label="Body" htmlFor="body" error={errors.body?.message}>
          <Textarea
            id="body"
            rows={6}
            placeholder="Enter post content"
            disabled={addPostMutation.isPending}
            hasError={!!errors.body}
            {...register("body")}
          />
        </FormField>

        <div className="pt-4">
          <SubmitButton
            isLoading={addPostMutation.isPending}
            loadingText="Submitting..."
          >
            Submit Post
          </SubmitButton>
        </div>
      </form>
    </>
  );
}
