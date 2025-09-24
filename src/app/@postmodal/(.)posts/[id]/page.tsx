import { SlugProps } from "@/shared/types";
import PostModal from "@/shared/ui/modal/modal";

export default async function PostPage({ params }: SlugProps) {
  const { id } = params;
  return (
    <PostModal>
      <div>postpage modal</div>
    </PostModal>
  );
}
