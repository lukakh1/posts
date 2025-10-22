import { GuideCard } from "@/app/shared";
import { Icon } from "@iconify/react";
import React from "react";

type StepCardProps = {
  icon: string;
  title: string;
  description: string;
};

const StepCard: React.FC<StepCardProps> = ({ icon, title, description }) => {
  return (
    <GuideCard className="flex items-start">
      <div className="flex-1">
        <Icon icon={icon} className="text-4xl text-[#0D766E] mb-3" />
        <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
        <p className="mt-2 text-slate-600">{description}</p>
      </div>
    </GuideCard>
  );
};

export default StepCard;
