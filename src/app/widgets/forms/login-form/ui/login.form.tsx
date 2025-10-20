"use client";
import { useAuth } from "@/app/entities/auth";
import { GoogleSvg, SubmitButton } from "@/app/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import { type LoginInputs, LoginSchema } from "../model/validation";

export default function LoginForm() {
  const { authenticate, errorMessage, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({ resolver: zodResolver(LoginSchema) });

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    authenticate("signin", data);
  };

  const handleGmailLogin = () => {
    authenticate("google");
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-4 border border-slate-100 rounded-3xl p-8 bg-slate-600 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {errorMessage && (
        <motion.div
          className="text-red-300 text-center mb-2 p-3 bg-red-900/20 rounded-lg border border-red-800"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {errorMessage}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <SubmitButton
          type="button"
          className="w-full mb-2 flex items-center justify-center gap-2 hover:bg-slate-400 transition-colors"
          onClick={handleGmailLogin}
          disabled={isLoading}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <GoogleSvg />
          </motion.div>
          Continue with Google
        </SubmitButton>
      </motion.div>

      <motion.div
        className="flex items-center gap-4 my-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex-1 h-px bg-slate-400"></div>
        <span className="text-slate-300 text-sm">or</span>
        <div className="flex-1 h-px bg-slate-400"></div>
      </motion.div>

      <motion.div
        className="space-y-1"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <label htmlFor="email" className="text-slate-200 font-medium">
          Email
        </label>
        <motion.input
          id="email"
          className="w-full px-4 py-3 rounded-lg bg-slate-800 text-slate-100 border border-slate-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
          placeholder="jonjones@gmail.com"
          type="email"
          {...register("email", { required: true })}
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        />
        {errors.email && (
          <motion.span
            className="text-red-300 text-sm block mt-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            This field is required
          </motion.span>
        )}
      </motion.div>

      <motion.div
        className="space-y-1"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <label htmlFor="password" className="text-slate-200 font-medium">
          Password
        </label>
        <motion.input
          id="password"
          className="w-full px-4 py-3 rounded-lg bg-slate-800 text-slate-100 border border-slate-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
          type="password"
          {...register("password", { required: true })}
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        />
        {errors.password && (
          <motion.span
            className="text-red-300 text-sm block mt-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {errors.password.message}
          </motion.span>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <button
          className="w-full mt-6 px-4 py-3 rounded-lg bg-slate-800 text-slate-100 border border-slate-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all hover:bg-blue-300 cursor-pointer"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              Signing In...
            </motion.span>
          ) : (
            "Sign In"
          )}
        </button>
      </motion.div>
    </motion.form>
  );
}
