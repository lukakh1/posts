"use client";
import { useAddBlog } from "@/app/entities/api/blogs";
import { useCreatePost } from "@/app/entities/api/posts";
import { StatusAlert, SubmitButton } from "@/app/shared/ui";
import { mixpanel } from "@/pkg/libraries/mixpanel";
import {
  Button,
  Chip,
  Input as HeroInput,
  Textarea as HeroTextarea,
  NumberInput,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  BlogSchema,
  FORM_FIELDS,
  PostSchema,
  type BlogFormData,
  type PostFormData,
} from "./form.schemas";
import { FORM_CONFIGS, UnifiedFormData, UnifiedFormProps } from "./form.types";

const isPostFormData = (data: UnifiedFormData): data is PostFormData => {
  return "userId" in data;
};

const isBlogFormData = (data: UnifiedFormData): data is BlogFormData => {
  return "tags" in data;
};

export default function UnifiedForm({ type }: UnifiedFormProps) {
  const [status, setStatus] = useState<
    | { type: "success"; message: string }
    | { type: "error"; message: string }
    | null
  >(null);
  const [tagInput, setTagInput] = useState("");

  const isPost = type === "post";
  const isBlog = type === "blog";
  const config = FORM_CONFIGS[type];

  const form = useForm<UnifiedFormData>({
    resolver: zodResolver(isPost ? PostSchema : BlogSchema),
    defaultValues: isPost
      ? { userId: 0, title: "", body: "" }
      : { title: "", sub_title: "", body: "", tags: [] },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
    watch,
    setValue,
  } = form;

  const addPostMutation = useCreatePost();
  const addBlogMutation = useAddBlog();
  const isLoading = isPost
    ? addPostMutation.isPending
    : addBlogMutation.isPending;

  const watchedTags = watch("tags");
  const currentTags = isBlog && Array.isArray(watchedTags) ? watchedTags : [];

  const fields = FORM_FIELDS[type];

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleAddTag = () => {
    if (!isBlog) return;
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !currentTags.includes(trimmedTag)) {
      setValue("tags", [...currentTags, trimmedTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    if (!isBlog) return;
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

  const onSubmit: SubmitHandler<UnifiedFormData> = async (data) => {
    setStatus(null);
    try {
      if (isPost && isPostFormData(data)) {
        await addPostMutation.mutateAsync(data);
        setStatus({
          type: "success",
          message: config.successMessage,
        });
        mixpanel.track("add post", { timestamp: new Date().toISOString() });
        reset({ userId: 0, title: "", body: "" });
      } else if (isBlog && isBlogFormData(data)) {
        const blogData = { ...data, tags: data.tags ?? null };
        await addBlogMutation.mutateAsync(blogData);
        setStatus({
          type: "success",
          message: config.successMessage,
        });
        mixpanel.track("add blog", { timestamp: new Date().toISOString() });
        reset({ title: "", sub_title: "", body: "", tags: [] });
        setTagInput("");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : config.errorMessage;
      setStatus({ type: "error", message });
    }
  };

  const renderField = (field: {
    name: string;
    type: string;
    label: string;
    required: boolean;
  }) => {
    const fieldError = errors[field.name as keyof typeof errors];
    const isInvalid = !!fieldError;

    return (
      <Controller
        key={field.name}
        name={field.name as keyof UnifiedFormData}
        control={control}
        rules={{ required: field.required }}
        render={({ field: controllerField }) => {
          if (field.type === "number") {
            return (
              <NumberInput
                isRequired={field.required}
                label={field.label}
                disabled={isLoading}
                isInvalid={isInvalid}
                errorMessage={fieldError?.message}
                {...controllerField}
                value={
                  typeof controllerField.value === "number"
                    ? controllerField.value
                    : 0
                }
              />
            );
          }

          if (field.type === "textarea") {
            return (
              <HeroTextarea
                isRequired={field.required}
                label={field.label}
                disabled={isLoading}
                isInvalid={isInvalid}
                errorMessage={fieldError?.message}
                rows={20}
                {...controllerField}
              />
            );
          }

          return (
            <HeroInput
              isRequired={field.required}
              label={field.label}
              disabled={isLoading}
              isInvalid={isInvalid}
              errorMessage={fieldError?.message}
              className="bg-slate-200 rounded-2xl"
              variant="bordered"
              {...controllerField}
            />
          );
        }}
      />
    );
  };

  return (
    <>
      <StatusAlert status={status} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 text-slate-900"
      >
        {fields.map(renderField)}

        {isBlog && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700">
              Tags (Optional)
            </label>
            <div className="flex gap-2">
              <HeroInput
                type="text"
                variant="bordered"
                placeholder="Enter a tag"
                disabled={isLoading}
                className="bg-slate-200 rounded-2xl flex-1"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button
                type="button"
                color="primary"
                onClick={handleAddTag}
                disabled={!tagInput.trim() || isLoading}
                className="px-6"
              >
                Add
              </Button>
            </div>
            {currentTags.length > 0 && (
              <div className="flex flex-wrap gap-2 p-3 bg-slate-100 rounded-xl">
                {currentTags.map((tag: string) => (
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
            {isBlog && (errors as Record<string, { message: string }>).tags && (
              <p className="text-sm text-red-500">
                {(errors as Record<string, { message: string }>).tags?.message}
              </p>
            )}
          </div>
        )}

        <div className="pt-4">
          <SubmitButton isLoading={isLoading} loadingText={config.loadingText}>
            {config.submitText}
          </SubmitButton>
        </div>
      </form>
    </>
  );
}
