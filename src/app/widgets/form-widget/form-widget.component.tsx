import { FORM_CONFIGS, FormType } from "@/app/features/form";
import { ReactNode } from "react";

interface FormWidgetProps {
  type: FormType;
  children: ReactNode;
  className?: string;
  showTitle?: boolean;
}

export default function FormWidget({
  type,
  children,
  className = "",
  showTitle = true,
}: FormWidgetProps) {
  const config = FORM_CONFIGS[type];

  const getContainerClassName = () => {
    switch (type) {
      case "post":
        return "max-w-2xl mx-auto p-6 bg-slate-700 rounded-lg shadow-lg mt-10";
      case "blog":
        return "max-w-2xl mx-auto p-6 bg-slate-700 rounded-lg shadow-lg mt-10";
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
