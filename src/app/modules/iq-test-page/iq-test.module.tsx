import { FAQ, Pricing, Statistics } from "@/app/features";
import { TestsDisplay } from "@/app/features/available-tests";
import { BoostAbilities } from "@/app/features/boost-abilities";
import { Community } from "@/app/features/community";
import { Hero } from "@/app/features/hero";
import { HowItWorks } from "@/app/features/hoow-it-works";
import { ResultDisplay } from "@/app/features/result";
import { fetchIqTests, fetchResults } from "./iq-test.service";

export async function IqTestsModule() {
  const tests = await fetchIqTests();
  const results = await fetchResults();
  return (
    <div className="min-h-screen flex flex-col pt-20 gap-10">
      <Hero />
      <HowItWorks />
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-screen bg-[#e9f1f9] h-full"></div>
        <div className="relative z-10">
          <TestsDisplay testsData={tests} />
        </div>
      </div>
      <BoostAbilities />
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-screen bg-[#e9f1f9] h-full"></div>
        <div className="relative z-10">
          <ResultDisplay resultsData={results} />
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
