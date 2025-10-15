"use client";

import { CustomLink } from "@/app/shared";
import type { PricingPlan } from "../data/pricing.data";

type Props = {
  plan: PricingPlan;
};

export function PricingCard({ plan }: Props) {
  return (
    <div className="flex text-black flex-col relative overflow-hidden h-auto max-w-[362px] border border-gray-100 rounded-large bg-white shadow-medium p-3 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      {/* Header */}
      <div className="p-3 z-10 w-full flex flex-col items-start gap-2 pb-6">
        <h2 className="font-medium text-large">{plan.title}</h2>
      </div>

      {/* Divider */}
      <hr
        className="shrink-0 border-none w-full h-divider bg-divider"
        role="separator"
      />

      {/* Content */}
      <div className="relative flex w-full p-3 flex-auto flex-col gap-8">
        <p className="flex items-baseline gap-1 pt-2">
          <span className="inline text-4xl font-semibold leading-7 tracking-tight">
            {plan.price}₾*
          </span>
          <span className="font-medium text-default-400 text-small">
            {plan.cadence}
          </span>
        </p>

        {/* Feature list */}
        <ul className="flex flex-col gap-2">
          {plan.features.map((feature) => (
            <li key={feature.label} className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
                className="shrink-0 text-primary"
                width="24"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M13.22.21a.714.714 0 0 1 0 1.01L5.361 9.076a.714.714 0 0 1-1.01 0L.781 5.505a.714.714 0 0 1 1.01-1.01L4.857 7.56 12.21.21a.714.714 0 0 1 1.01 0"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-default-500">{feature.label}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Button */}
      <div className="p-3 h-auto flex w-full items-center">
        <CustomLink
          className="w-full px-4 py-[7px] rounded-lg items-center justify-center"
          href="/"
          type="primary"
          fullWidth={true}
        >
          {plan.cta}
        </CustomLink>
      </div>
    </div>
  );
}
