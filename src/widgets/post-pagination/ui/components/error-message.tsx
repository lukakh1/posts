import { Icon } from "@iconify/react";

interface ErrorMessageProps {
  title?: string;
  message: string;
}

export const ErrorMessage = ({
  title = "Error Loading Posts",
  message,
}: ErrorMessageProps) => {
  return (
    <div className="text-center py-16">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
        <Icon
          icon="mdi:alert-circle-outline"
          className="w-12 h-12 mx-auto mb-4 text-red-500"
        />
        <div className="text-lg font-medium text-red-800 mb-2">{title}</div>
        <div className="text-sm text-red-600">{message}</div>
      </div>
    </div>
  );
};
