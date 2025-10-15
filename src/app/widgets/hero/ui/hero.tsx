import React from "react";
import LeftContent from "./left.content";
import RightChart from "./right.chart";

const Hero: React.FC = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 px-5 md:px-3 xl:px-0">
        <div className="lg:w-1/2 w-full">
          <LeftContent />
        </div>

        <div className="lg:w-1/2 w-full flex justify-center">
          <RightChart />
        </div>
      </div>
    </section>
  );
};

export default Hero;
