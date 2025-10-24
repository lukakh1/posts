import { BACKGROUND_COLORS, GRID_COLUMN_CLASSES } from "@/app/shared";
import { LoadingIndicator } from "@/app/shared/ui";
import React from "react";

export type ContentDisplayType = "default" | "horizontal-scroll" | "background";

export interface ContentDisplayConfig {
  title: string;
  subtitle?: string;
  type?: ContentDisplayType;
  gridCols?: {
    default: number;
    md: number;
    lg?: number;
  };
  background?: "white" | "gray";
  containerClass?: string;
  headerClass?: string;
  contentClass?: string;
  bottomText?: string;
}

export interface ContentDisplayProps<T> {
  config: ContentDisplayConfig;
  data: T[];
  renderCard: (item: T, index: number) => React.ReactNode;
  className?: string;
  loading?: boolean;
  error?: Error | null;
}

export function ContentDisplay<T>({
  config,
  data,
  renderCard,
  className = "",
  loading = false,
  error = null,
}: ContentDisplayProps<T>) {
  const {
    title,
    subtitle,
    type = "default",
    gridCols,
    background = "white",
    containerClass = "",
    headerClass = "",
    contentClass = "",
    bottomText,
  } = config;

  const getGridClass = (cols: { default: number; md: number; lg?: number }) => {
    const baseClasses = "grid gap-6";

    const defaultClass =
      GRID_COLUMN_CLASSES.default[
        cols.default as keyof typeof GRID_COLUMN_CLASSES.default
      ] || "grid-cols-1";
    const mdClass =
      GRID_COLUMN_CLASSES.md[cols.md as keyof typeof GRID_COLUMN_CLASSES.md] ||
      "md:grid-cols-1";
    const lgClass = cols.lg
      ? GRID_COLUMN_CLASSES.lg[
          cols.lg as keyof typeof GRID_COLUMN_CLASSES.lg
        ] || ""
      : "";

    return `${baseClasses} ${defaultClass} ${mdClass} ${lgClass}`.trim();
  };

  const getContentLayout = () => {
    switch (type) {
      case "horizontal-scroll":
        return `flex gap-x-4 overflow-x-auto xl:overflow-visible -mx-4 px-4 xl:gap-x-6`;
      default:
        return gridCols ? getGridClass(gridCols) : "grid grid-cols-1 gap-6";
    }
  };

  const getBackgroundClass = () => {
    if (type === "background") {
      return BACKGROUND_COLORS.background;
    }
    return BACKGROUND_COLORS[background];
  };

  const renderContent = () => {
    const isBackgroundType = type === "background";

    const contentWrapper = (
      <div className={`container mx-auto px-4 ${containerClass}`}>
        <div className={`text-center mb-8 md:mb-12 ${headerClass}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className={`${getContentLayout()} ${contentClass}`}>
          {loading ? (
            <div className="flex justify-center items-center py-12 col-span-full">
              <LoadingIndicator />
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-12 col-span-full">
              <div className="text-red-500 text-center">
                <p className="text-lg font-medium">Error loading content</p>
                <p className="text-sm mt-1">{error.message}</p>
              </div>
            </div>
          ) : (
            data.map((item, index) => (
              <div key={index} className="w-full">
                {renderCard(item, index)}
              </div>
            ))
          )}
        </div>

        {bottomText && (
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 italic">{bottomText}</p>
          </div>
        )}
      </div>
    );

    if (isBackgroundType) {
      return (
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-screen bg-[#e9f1f9] h-full"></div>
          <div className="relative z-10">{contentWrapper}</div>
        </div>
      );
    }

    return contentWrapper;
  };

  return (
    <section className={`${getBackgroundClass()} ${className}`}>
      {renderContent()}
    </section>
  );
}
