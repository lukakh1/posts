"use client";

import { Link as NextLink } from "@/pkg/libraries/locale";
import { Link } from "@heroui/react";
import { ReactNode } from "react";

interface CustomLinkProps {
  href: string;
  type: "primary" | "secondary";
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const CustomLink = ({
  href,
  type,
  children,
  className = "px-4 py-[7px] rounded-lg",
  disabled = false,
  fullWidth = false,
}: CustomLinkProps) => {
  const baseClasses = `border-2 font-bold transition-all duration-300 ease-in-out`;

  const getTypeClasses = () => {
    if (disabled) {
      return "text-gray-500 bg-[#58b6ae] cursor-not-allowed border-[#58b6ae]";
    }

    return type === "primary"
      ? "text-white bg-[#0D766E] border-[#0D766E] hover:bg-[#10897f] hover:border-[#10897f]"
      : "text-[#0D766E] border-[#0D766E] hover:text-white hover:bg-[#10897f] hover:border-[#10897f]";
  };

  if (disabled) {
    return (
      <button
        disabled
        className={`${baseClasses} ${getTypeClasses()} ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <NextLink className={`${fullWidth ? "w-full" : ""}`} href={href}>
      <Link
        className={`${baseClasses} ${getTypeClasses()} ${className} cursor-pointer`}
        as="button"
      >
        {children}
      </Link>
    </NextLink>
  );
};
