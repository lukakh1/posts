"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { ReactNode } from "react";

type LinkCardProps = {
  href: string;
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
};

export function LinkCard({
  href,
  title,
  description,
  icon,
  className = "",
}: LinkCardProps) {
  return (
    <Link
      href={href}
      className={`group rounded-xl border border-blue-200 bg-white p-6 text-left shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#2B2D42]">{title}</h2>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
        <span
          aria-hidden
          className="ml-4 h-9 w-9 shrink-0 rounded-full bg-blue-100 text-blue-600 grid place-items-center transition group-hover:bg-blue-200"
        >
          {icon ?? <Icon fontSize={16} icon={"typcn:arrow-right-outline"} />}
        </span>
      </div>
    </Link>
  );
}
