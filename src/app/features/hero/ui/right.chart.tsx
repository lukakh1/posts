import Image from "next/image";
import React from "react";

const RightChart: React.FC<{ className?: string }> = () => {
  return (
    <div className={`w-full max-w-lg`}>
      <div className="relative w-full h-[320px]">
        <Image src="/chart.png" alt="chart" fill />
      </div>
    </div>
  );
};

export default RightChart;
