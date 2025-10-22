import { Icon } from "@iconify/react";
import Link from "next/link";

type SocialLinkProps = {
  href: string;
  icon: string;
  iconClassName?: string;
  ariaLabel?: string;
};

export function SocialLink({
  href,
  icon,
  iconClassName = "w-8 h-8",
  ariaLabel,
}: SocialLinkProps) {
  const socialLinkButtonClassName =
    "w-full flex items-center justify-center px-8 py-2 rounded-xl bg-white border border-blue-400 shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-300";
  return (
    <Link
      className={socialLinkButtonClassName}
      href={href}
      aria-label={ariaLabel}
    >
      <Icon icon={icon} className={iconClassName} />
    </Link>
  );
}
