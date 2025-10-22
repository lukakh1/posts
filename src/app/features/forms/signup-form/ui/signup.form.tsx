"use client";
import { useAuth } from "@/app/entities/api/auth";
import { GoogleSvg, SubmitButton } from "@/app/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import { type SignupInputs, SignupSchema } from "../model/validation";

export default function SignupForm() {
  const { authenticate, errorMessage, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInputs>({ resolver: zodResolver(SignupSchema) });

  const onSubmit: SubmitHandler<SignupInputs> = (data) => {
    authenticate("signup", data);
  };

  const handleGmailLogin = () => {
    authenticate("google");
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-4 border border-slate-100 rounded-3xl p-8 bg-slate-600 shadow-lg"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
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
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <GoogleSvg />
          </motion.div>
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

      <div className="space-y-1">
        <label htmlFor="reppassword" className="text-slate-200 font-medium">
          Repeat password
        </label>
        <input
          id="reppassword"
          className="w-full px-4 py-3 rounded-lg bg-slate-800 text-slate-100 border border-slate-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
          type="password"
          {...register("confirmPassword", { required: true })}
        />
        {errors.confirmPassword && (
          <span className="text-red-300 text-sm block mt-1">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <div>
        <button
          className="w-full mt-6 px-4 py-3 rounded-lg bg-slate-800 text-slate-100 border border-slate-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all hover:bg-blue-300 cursor-pointer"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </div>
    </motion.form>
  );
}
