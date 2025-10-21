import { LoginModule } from "@/app/modules";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginModule />
    </Suspense>
  );
}
