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
}

export function ContentDisplay<T>({
  config,
  data,
  renderCard,
  className = "",
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

  // Predefined grid classes to ensure Tailwind includes them
  const getGridClass = (cols: { default: number; md: number; lg?: number }) => {
    const baseClasses = "grid gap-6";

    const defaultCols = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
    };

    const mdCols = {
      1: "md:grid-cols-1",
      2: "md:grid-cols-2",
      3: "md:grid-cols-3",
      4: "md:grid-cols-4",
      5: "md:grid-cols-5",
      6: "md:grid-cols-6",
    };

    const lgCols = {
      1: "lg:grid-cols-1",
      2: "lg:grid-cols-2",
      3: "lg:grid-cols-3",
      4: "lg:grid-cols-4",
      5: "lg:grid-cols-5",
      6: "lg:grid-cols-6",
    };

    let classes = `${baseClasses} ${
      defaultCols[cols.default as keyof typeof defaultCols] || "grid-cols-1"
    }`;
    classes += ` ${mdCols[cols.md as keyof typeof mdCols] || "md:grid-cols-1"}`;

    if (cols.lg) {
      classes += ` ${lgCols[cols.lg as keyof typeof lgCols] || ""}`;
    }

    return classes;
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
      return "bg-[#e9f1f9]";
    }
    return background === "gray" ? "bg-[#e9f1f9]" : "";
  };

  const renderContent = () => {
    if (type === "background") {
      return (
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-screen bg-[#e9f1f9] h-full"></div>
          <div className="relative z-10">
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
                {data.map((item, index) => {
                  return (
                    <div key={index} className="w-full">
                      {renderCard(item, index)}
                    </div>
                  );
                })}
              </div>

              {bottomText && (
                <div className="text-center mt-8">
                  <p className="text-sm text-gray-600 italic">{bottomText}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
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
          {data.map((item, index) => {
            return (
              <div key={index} className="w-full">
                {renderCard(item, index)}
              </div>
            );
          })}
        </div>

        {bottomText && (
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 italic">{bottomText}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className={`${getBackgroundClass()} ${className}`}>
      {renderContent()}
    </section>
  );
}
