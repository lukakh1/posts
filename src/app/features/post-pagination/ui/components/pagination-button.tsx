import React from "react";

interface PaginationButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  className?: string;
}

export const PaginationButton = ({
  children,
  onClick,
  disabled = false,
  active = false,
  className = "",
}: PaginationButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        disabled:cursor-not-allowed cursor-pointer relative inline-flex items-center justify-center h-11 px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200 hover:ring-2 hover:ring-blue-900 hover:bg-blue-300 disabled:hover:bg-gray-400
        ${active && "bg-blue-600 border-blue-600 text-white shadow-md"}
        ${className}
      `}
    >
      {children}
    </button>
  );
};
