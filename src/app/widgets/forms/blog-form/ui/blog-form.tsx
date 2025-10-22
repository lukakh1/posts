"use client";
import { useAddBlog } from "@/app/entities/api/blogs";
import { StatusAlert, SubmitButton } from "@/app/shared/ui";
import { mixpanel } from "@/pkg/libraries/mixpanel";
import {
  Button,
  Chip,
  Input as HeroInput,
  Textarea as HeroTextarea,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { BlogSchema } from "../model";

type Inputs = z.infer<typeof BlogSchema>;

export default function BlogForm() {
  const [status, setStatus] = useState<
    | { type: "success"; message: string }
    | { type: "error"; message: string }
    | null
  >(null);
  const [tagInput, setTagInput] = useState("");

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Inputs>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      title: "",
      sub_title: "",
      body: "",
      tags: [],
    },
  });

  const addBlogMutation = useAddBlog();
  const currentTags = watch("tags") || [];

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !currentTags.includes(trimmedTag)) {
      setValue("tags", [...currentTags, trimmedTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setStatus(null);
    try {
      // Transform undefined tags to null to match NewBlog type
      const blogData = {
        ...data,
        tags: data.tags ?? null,
      };
      await addBlogMutation.mutateAsync(blogData);
      setStatus({
        type: "success",
        message: "Blog has been created successfully.",
      });

      mixpanel.track("add blog", {
        timestamp: new Date().toISOString(),
      });

      reset({
        title: "",
        sub_title: "",
        body: "",
        tags: [],
      });
      setTagInput("");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create blog.";
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
          name="title"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <HeroInput
              isRequired
              label="Blog Title"
              type="text"
              variant="bordered"
              disabled={addBlogMutation.isPending}
              isInvalid={!!errors.title}
              errorMessage={errors.title?.message}
              className="bg-slate-200 rounded-2xl"
              {...field}
            />
          )}
        />

        <Controller
          name="sub_title"
          control={control}
          render={({ field }) => (
            <HeroInput
              label="Subtitle (Optional)"
              type="text"
              variant="bordered"
              disabled={addBlogMutation.isPending}
              isInvalid={!!errors.sub_title}
              errorMessage={errors.sub_title?.message}
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
              placeholder="Enter blog description"
              rows={20}
              disabled={addBlogMutation.isPending}
              isInvalid={!!errors.body}
              errorMessage={errors.body?.message}
              {...field}
            />
          )}
        />

        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-700">
            Tags (Optional)
          </label>

          <div className="flex gap-2">
            <HeroInput
              type="text"
              variant="bordered"
              placeholder="Enter a tag"
              disabled={addBlogMutation.isPending}
              className="bg-slate-200 rounded-2xl flex-1"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button
              type="button"
              color="primary"
              onClick={handleAddTag}
              disabled={!tagInput.trim() || addBlogMutation.isPending}
              className="px-6"
            >
              Add
            </Button>
          </div>

          {currentTags.length > 0 && (
            <div className="flex flex-wrap gap-2 p-3 bg-slate-100 rounded-xl">
              {currentTags.map((tag) => (
                <Chip
                  key={tag}
                  onClose={() => handleRemoveTag(tag)}
                  variant="flat"
                  color="primary"
                >
                  {tag}
                </Chip>
              ))}
            </div>
          )}

          {errors.tags && (
            <p className="text-sm text-red-500">{errors.tags.message}</p>
          )}
        </div>

        <div className="pt-4">
          <SubmitButton
            isLoading={addBlogMutation.isPending}
            loadingText="Submitting..."
          >
            Submit Blog
          </SubmitButton>
        </div>
      </form>
    </>
  );
}
