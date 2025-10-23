import { AUTH_CONFIGS, AuthType } from "@/app/features/auth";
import { ReactNode } from "react";

interface AuthWidgetProps {
  type: AuthType;
  children: ReactNode;
  className?: string;
  showTitle?: boolean;
}

export default function AuthWidget({
  type,
  children,
  className = "",
  showTitle = true,
}: AuthWidgetProps) {
  const config = AUTH_CONFIGS[type];

  const getContainerClassName = () => {
    switch (type) {
      case "login":
      case "signup":
        return "max-w-md mx-auto mt-10";
      default:
        return "";
    }
  };

  return (
    <div className={`${getContainerClassName()} ${className}`}>
      {showTitle && (
        <h2 className="text-2xl font-bold text-slate-200 mb-6">
          {config.title}
        </h2>
      )}
      {children}
    </div>
  );
}
