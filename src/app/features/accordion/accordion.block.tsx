import React from "react";
import { AccordionItem } from "../test-page-cards";

export interface AccordionItemType {
  id: string;
  question: string;
  answer: string | React.ReactNode;
}

export interface AccordionBlockProps {
  title: string;
  data: AccordionItemType[];
  className?: string;
}

export const AccordionBlock: React.FC<AccordionBlockProps> = ({
  title,
  data,
  className = "",
}) => {
  return (
    <section className={`py-8 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex md:gap-24 flex-col md:flex-row">
          <div>
            <h2 className="text-[28px] font-semibold leading-[33px] text-[#2B2D42] max-lg:text-center md:mb-8 md:text-[39px] md:leading-[49px] lg:max-w-[200px]">
              <span className="inline-block">{title}</span>
            </h2>
          </div>
          <div className="w-full">
            <div className="divide-y divide-gray-200 border-t border-b">
              {data.map((item) => (
                <AccordionItem
                  key={item.id}
                  id={item.id}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
