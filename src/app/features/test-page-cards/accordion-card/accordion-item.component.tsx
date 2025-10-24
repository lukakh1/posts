"use client";

import React from "react";

interface AccordionItemProps {
  id: string;
  question: string;
  answer: string | React.ReactNode;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-5 w-5 transition-transform duration-200 ${
        open ? "rotate-0" : "rotate-90"
      }`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.085l3.71-3.854a.75.75 0 111.08 1.04l-4.24 4.4a.75.75 0 01-1.08 0l-4.24-4.4a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  question,
  answer,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="border-b border-gray-200" key={id}>
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={handleToggle}
        className="w-full flex items-center justify-between gap-4 py-[18px] text-left cursor-pointer"
      >
        <span className="text-medium font-medium text-[#2B2D42] md:text-lg">
          {question}
        </span>
        <span className="text-gray-500">
          <ChevronIcon open={isOpen} />
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-200 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-5 text-[15px] leading-6 text-gray-700">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};
