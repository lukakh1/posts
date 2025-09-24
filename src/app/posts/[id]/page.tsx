import { SlugProps } from "@/shared/types";

export default async function PostPage({ params }: SlugProps) {
  const { id } = params;
  return <div>postpage</div>;
}
