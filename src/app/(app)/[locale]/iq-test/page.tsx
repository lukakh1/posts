import { FAQ, Statistics } from "@/app/widgets";
import { TestsDisplay } from "@/app/widgets/available-tests";
import { BoostAbilities } from "@/app/widgets/boost-abilities";
import { Community } from "@/app/widgets/community";
import { Hero } from "@/app/widgets/hero";
import { HowItWorks } from "@/app/widgets/hoow-it-works";
import { Pricing } from "@/app/widgets/pricing";
import { ResultDisplay } from "@/app/widgets/result";

export default function IqTestPage() {
  return (
    <div className="min-h-screen flex flex-col pt-20 gap-10">
      <Hero />
      <HowItWorks />
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-screen bg-[#e9f1f9] h-full"></div>
        <div className="relative z-10">
          <TestsDisplay />
        </div>
      </div>
      <BoostAbilities />
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-screen bg-[#e9f1f9] h-full"></div>
        <div className="relative z-10">
          <ResultDisplay />
        </div>
      </div>
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-screen bg-[#e9f1f9] h-full"></div>
        <div className="relative z-10">
          <Community />
        </div>
      </div>
      <Pricing />
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-screen bg-[#e9f1f9] h-full"></div>
        <div className="relative z-10">
          <FAQ />
        </div>
      </div>
      <Statistics />
    </div>
  );
}
