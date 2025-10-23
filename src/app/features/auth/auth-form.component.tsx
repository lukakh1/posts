"use client";
import { useAuth } from "@/app/entities/api/auth";
import { GoogleSvg, SubmitButton } from "@/app/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  LoginSchema,
  SignupSchema,
  type LoginFormData,
  type SignupFormData,
} from "./auth.schemas";
import { AUTH_CONFIGS, AuthType } from "./auth.types";

interface AuthFormProps {
  type: AuthType;
}

export default function AuthForm({ type }: AuthFormProps) {
  const { authenticate, errorMessage, isLoading } = useAuth();
  const isLogin = type === "login";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData | SignupFormData>({
    resolver: zodResolver(isLogin ? LoginSchema : SignupSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData | SignupFormData> = (data) => {
    authenticate(isLogin ? "signin" : "signup", data);
  };

  const handleGmailLogin = () => {
    authenticate("google");
  };

  const config = AUTH_CONFIGS[type];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-4 border border-slate-100 rounded-3xl p-8 bg-slate-600 shadow-lg"
    >
      {errorMessage && (
        <div className="text-red-300 text-center mb-2 p-3 bg-red-900/20 rounded-lg border border-red-800">
          {errorMessage}
        </div>
      )}

      <div>
        <SubmitButton
          type="button"
          className="w-full mb-2 flex items-center justify-center gap-2 hover:bg-slate-400 transition-colors"
          onClick={handleGmailLogin}
          disabled={isLoading}
        >
          <GoogleSvg />
          Continue with Google
        </SubmitButton>
      </div>

      <div className="flex items-center gap-4 my-2">
        <div className="flex-1 h-px bg-slate-400"></div>
        <span className="text-slate-300 text-sm">or</span>
        <div className="flex-1 h-px bg-slate-400"></div>
      </div>

      <div className="space-y-1">
        <label htmlFor="email" className="text-slate-200 font-medium">
          Email
        </label>
        <input
          id="email"
          className="w-full px-4 py-3 rounded-lg bg-slate-800 text-slate-100 border border-slate-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
          placeholder="jonjones@gmail.com"
          type="email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-red-300 text-sm block mt-1">
            This field is required
          </span>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="text-slate-200 font-medium">
          Password
        </label>
        <input
          id="password"
          className="w-full px-4 py-3 rounded-lg bg-slate-800 text-slate-100 border border-slate-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-red-300 text-sm block mt-1">
            {errors.password.message}
          </span>
        )}
      </div>

      {!isLogin && (
        <div className="space-y-1">
          <label
            htmlFor="confirmPassword"
            className="text-slate-200 font-medium"
          >
            Repeat password
          </label>
          <input
            id="confirmPassword"
            className="w-full px-4 py-3 rounded-lg bg-slate-800 text-slate-100 border border-slate-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
            type="password"
            {...register("confirmPassword", { required: true })}
          />
          {(errors as Record<string, { message: string }>).confirmPassword && (
            <span className="text-red-300 text-sm block mt-1">
              {
                (errors as Record<string, { message: string }>).confirmPassword
                  ?.message
              }
            </span>
          )}
        </div>
      )}

      <div>
        <button
          className="w-full mt-6 px-4 py-3 rounded-lg bg-slate-800 text-slate-100 border border-slate-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all hover:bg-blue-300 cursor-pointer"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? config.loadingText : config.submitText}
        </button>
      </div>
    </form>
  );
}
