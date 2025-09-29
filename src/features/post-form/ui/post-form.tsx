"use client";
import { useAddPost } from "@/shared/hooks/use-posts";
import {
  Input as HeroInput,
  Textarea as HeroTextarea,
  NumberInput,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { PostSchema } from "../model";
import { StatusAlert, SubmitButton } from "./form-components";

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
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      userId: 0,
      title: "",
      body: "",
    },
  });
  const addPostMutation = useAddPost();

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setStatus(null);
    try {
      await addPostMutation.mutateAsync(data);
      setStatus({
        type: "success",
        message: "Post has been created successfully.",
      });
      reset({
        userId: 0,
        title: "",
        body: "",
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create post.";
      setStatus({ type: "error", message });
    }
  };

  return (
    <>
      <StatusAlert status={status} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 text-slate-900"
      >
        <Controller
          name="userId"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <NumberInput
              isRequired
              type="number"
              label="user id"
              placeholder="Enter the user id"
              size="md"
              disabled={addPostMutation.isPending}
              isInvalid={!!errors.userId}
              errorMessage={errors.userId?.message}
              {...field}
              value={
                typeof field.value === "number" && Number.isFinite(field.value)
                  ? field.value
                  : 0
              }
              onChange={(value) => {
                const parsed =
                  typeof value === "number" ? value : Number(value);
                if (Number.isNaN(parsed)) {
                  return;
                }
                field.onChange(parsed);
              }}
            />
          )}
        />

        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <HeroInput
              isRequired
              label="post title"
              type="text"
              variant="bordered"
              disabled={addPostMutation.isPending}
              isInvalid={!!errors.title}
              errorMessage={errors.title?.message}
              className="bg-slate-200 rounded-2xl"
              {...field}
            />
          )}
        />

        <Controller
          name="body"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <HeroTextarea
              isRequired
              id="body"
              className="w-full bg-transparent"
              label="Description"
              placeholder="enter post description"
              rows={20}
              disabled={addPostMutation.isPending}
              isInvalid={!!errors.body}
              errorMessage={errors.body?.message}
              {...field}
            />
          )}
        />

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
