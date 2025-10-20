"use client";

import { CustomLink } from "@/app/shared";
import { SignupForm } from "@/app/widgets/forms/signup-form";
import { motion } from "framer-motion";

export default function SignupPage() {
  return (
    <div className="max-h-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-800 via-slate-100 to-green-500 px-4 overflow-hidden">
      <motion.div
        className="w-full flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center w-1/2 justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h1 className="text-6xl font-bold my-3 text-center tracking-tight font-serif text-slate-800">
              Create Account
            </h1>
          </motion.div>
          <motion.p
            className="text-slate-800 text-center mb-8 text-lg font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Join us today and get started!
          </motion.p>
        </motion.div>

        <motion.div
          className="flex w-1/2 flex-col items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <SignupForm />
          </motion.div>

          <motion.div
            className="text-center mt-4 p-4 rounded-2xl bg-slate-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
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
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
