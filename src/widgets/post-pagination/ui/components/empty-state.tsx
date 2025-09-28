import { Icon } from "@iconify/react";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: string;
}

export const EmptyState = ({
  title = "No posts found",
  description = "Try adjusting your search or browse other pages",
  icon = "mdi:inbox-outline",
}: EmptyStateProps) => {
  return (
    <div className="text-center py-16">
      <Icon icon={icon} className="w-16 h-16 mx-auto mb-4 text-slate-400" />
      <div className="text-lg text-slate-500 mb-2">{title}</div>
      <div className="text-sm text-slate-400">{description}</div>
    </div>
  );
};
