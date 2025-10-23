import { UnifiedForm } from "@/app/features";
import { FormWidget } from "@/app/widgets";

export default function AddPost() {
  return (
    <FormWidget type="post">
      <UnifiedForm type="post" />
    </FormWidget>
  );
}
