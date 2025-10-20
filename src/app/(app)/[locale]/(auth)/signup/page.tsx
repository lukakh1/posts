import { SignupModule } from "@/app/modules";
import { Suspense } from "react";

export default function SignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupModule />
    </Suspense>
  );
}
