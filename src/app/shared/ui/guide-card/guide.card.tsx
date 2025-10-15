import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-2xl border-1 border-[#D9E7FF] pt-10 px-8 pb-4 ${className}`}
      role="group"
    >
      {children}
    </div>
  );
};

export default Card;
