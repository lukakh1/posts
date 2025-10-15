"use client";

import React from "react";
import { FAQ_ITEMS } from "../data/faq.data";
import { FaqItem } from "./faq.item";

export const FAQ: React.FC = () => {
  const [openIds, setOpenIds] = React.useState<Set<string>>(new Set());

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex md:gap-24 flex-col md:flex-row">
          <div>
            <h2 className="text-[28px] font-semibold leading-[33px] text-[#2B2D42] max-lg:text-center md:mb-8 md:text-[39px] md:leading-[49px] lg:max-w-[200px]">
              <span className="hinline-block">Frequently Asked Questions</span>
            </h2>
          </div>
          <div className="w-full">
            <div className="divide-y divide-gray-200 border-t border-b">
              {FAQ_ITEMS.map((item) => (
                <FaqItem
                  key={item.id}
                  id={item.id}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIds.has(item.id)}
                  onToggle={() => {
                    setOpenIds((prev) => {
                      const next = new Set(prev);
                      if (next.has(item.id)) {
                        next.delete(item.id);
                      } else {
                        next.add(item.id);
                      }
                      return next;
                    });
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
