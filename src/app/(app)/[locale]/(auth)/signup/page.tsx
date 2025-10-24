import { AuthForm } from "@/app/features";
import { CustomLink } from "@/app/shared";

export const dynamic = "force-static";

export default function SignupPage() {
  return (
    <div className="max-h-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-800 via-slate-100 to-green-500 px-4 overflow-hidden">
      <div className="w-full flex items-center">
        <div className="flex flex-col items-center w-1/2 justify-center">
          <h1 className="text-6xl font-bold my-3 text-center tracking-tight font-serif text-slate-800">
            Create Account
          </h1>
          <p className="text-slate-800 text-center mb-8 text-lg font-serif">
            Join us today and get started!
          </p>
        </div>

        <div className="flex w-1/2 flex-col items-center">
          <div>
            <AuthForm type="signup" />
          </div>

          <div className="text-center mt-4 p-4 rounded-2xl bg-slate-700">
            <p className="text-slate-300">
              Already have an account?{" "}
              <CustomLink
                href="/login"
                type="secondary"
                className="transition-colors"
              >
                Sign in here
              </CustomLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
