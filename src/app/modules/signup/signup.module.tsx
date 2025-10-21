"use client";

import { CustomLink } from "@/app/shared";
import { SignupForm } from "@/app/widgets/forms/signup-form";
import { motion } from "framer-motion";

export default function SignupModule() {
  return (
    <div className="max-h-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-800 via-slate-100 to-green-500 px-4 overflow-hidden">
      <motion.div
        className="w-full flex items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
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
            <SignupForm />
          </div>

          <div className="text-center mt-4 p-4 rounded-2xl bg-slate-700">
            <p className="text-slate-300">
              Already have an account?{" "}
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CustomLink
                  href="/login"
                  type="secondary"
                  className="transition-colors"
                >
                  Sign in here
                </CustomLink>
              </motion.span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
