import { Icon } from "@iconify/react";
import Link from "next/link";
import { SocialLink as SocialLinkType } from "./hero-section.types";

interface SocialLinkProps extends SocialLinkType {
  className?: string;
}

export function SocialLink({
  href,
  icon,
  iconClassName = "w-8 h-8",
  ariaLabel,
  className = "w-full flex items-center justify-center px-8 py-2 rounded-xl bg-white border border-blue-400 shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-300",
}: SocialLinkProps) {
  return (
    <Link className={className} href={href} aria-label={ariaLabel}>
      <Icon icon={icon} className={iconClassName} />
    </Link>
  );
}
