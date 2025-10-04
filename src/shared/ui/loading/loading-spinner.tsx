import { Icon } from "@iconify/react";

interface LoadingIndicatorProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export const LoadingIndicator = ({
  size = "md",
  text = "Loading...",
}: LoadingIndicatorProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex items-center gap-2 text-blue-600">
      <Icon icon="line-md:loading-twotone-loop" className={sizeClasses[size]} />
      <span>{text}</span>
    </div>
  );
};
