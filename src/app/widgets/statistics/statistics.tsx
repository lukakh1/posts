"use client";
import { useRotatingStatistics } from "@/app/entities/api/statistics";
import { LoadingIndicator } from "@/app/shared";
import { Icon } from "@iconify/react";
import React from "react";

export const Statistics: React.FC = () => {
  const { items, isLoading } = useRotatingStatistics();

  const shouldShowLoading = isLoading && items.length === 0;

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-[28px] font-semibold leading-[33px] text-[#2B2D42] md:text-[39px] md:leading-[49px] mb-8">
          Latest results
        </h3>
        {shouldShowLoading && <LoadingIndicator size="lg" text="Loading..." />}

        {items.length === 0 && !isLoading && (
          <div className="text-center">No statistics available</div>
        )}

        {items.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-6 md:hidden">
              {items.slice(0, 4).map((r, idx) => (
                <div
                  key={`${r.id}-${idx}`}
                  className={`flex items-center justify-between rounded-2xl px-5 py-4 ${
                    idx % 2 === 1 ? "bg-[#cce1fb]" : "bg-transparent"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl" aria-hidden>
                      <Icon icon={r.flag_icon} />
                    </span>
                    <span className="text-[#2B2D42] text-[20px]">{r.name}</span>
                  </div>
                  <div className="text-[#0A63FF] font-semibold text-[22px]">
                    IQ {r.iq}
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden grid-cols-1 md:grid md:grid-cols-2 gap-6">
              {items.map((r, idx) => (
                <div
                  key={`${r.id}-${idx}`}
                  className={`flex items-center justify-between rounded-2xl px-5 py-4 ${(() => {
                    const highlight = idx % 4 === 2 || idx % 4 === 3;
                    return highlight ? "bg-[#cce1fb]" : "bg-transparent";
                  })()}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl" aria-hidden>
                      <Icon icon={r.flag_icon} />
                    </span>
                    <span className="text-[#2B2D42] text-[20px]">{r.name}</span>
                  </div>
                  <div className="text-[#0A63FF] font-semibold text-[22px]">
                    IQ {r.iq}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
