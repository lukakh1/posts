import { UnifiedForm } from "@/app/features";
import { FormWidget } from "@/app/widgets";

export const dynamic = "force-static";

export default function AddBlog() {
  return (
    <FormWidget type="blog">
      <UnifiedForm type="blog" />
    </FormWidget>
  );
}
