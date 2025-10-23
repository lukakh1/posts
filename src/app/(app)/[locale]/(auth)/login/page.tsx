import { AuthForm } from "@/app/features";
import { CustomLink } from "@/app/shared";

export default function LoginPage() {
  return (
    <div className="max-h-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-800 via-slate-100 to-blue-400 px-4 overflow-hidden">
      <div className="w-full flex items-center">
        <div className="flex flex-col items-center w-1/2 justify-center">
          <h1 className="text-6xl font-bold my-3 text-center tracking-tight font-serif text-slate-800">
            Welcome Back
          </h1>
          <p className="text-slate-800 text-center mb-8 text-xl font-serif">
            Please enter your details to sign in
          </p>
        </div>

        <div className="flex w-1/2 flex-col items-center">
          <div>
            <AuthForm type="login" />
          </div>

          <div className="text-center mt-4 p-4 rounded-2xl bg-slate-700">
            <p className="text-slate-300">
              Don&apos;t have an account?{" "}
              <CustomLink href="/signup" type="secondary">
                Sign up here
              </CustomLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
