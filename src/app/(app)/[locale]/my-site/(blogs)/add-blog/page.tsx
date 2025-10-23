import { UnifiedForm } from "@/app/features";
import { FormWidget } from "@/app/widgets";

export default function AddBlog() {
  return (
    <FormWidget type="blog">
      <UnifiedForm type="blog" />
    </FormWidget>
  );
}
