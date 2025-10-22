import React from "react";
import { steps } from "../data/steps.data";
import StepCard from "./step.card";

const HowItWorks: React.FC = () => {
  return (
    <section>
      <div className="container mx-auto px-5 md:px-3 xl:px-0">
        <h2 className="text-4xl font-bold text-center text-slate-800 mb-10">
          How it Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <StepCard
              key={s.title}
              icon={s.icon}
              title={s.title}
              description={s.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
