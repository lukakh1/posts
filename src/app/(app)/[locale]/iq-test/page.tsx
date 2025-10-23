import { fetchIqTests } from "@/app/entities/api/iq-test";
import { fetchResults } from "@/app/entities/api/results";
import {
  AbilityCard,
  PricingCard,
  ResultCard,
  StepCard,
  TestCard,
} from "@/app/features";
import { abilitiesData, PRICING_PLANS, steps } from "@/app/shared/assets";
import { FAQ, Statistics } from "@/app/widgets";
import { Community } from "@/app/widgets/community";
import { ContentDisplay } from "@/app/widgets/content-display";
import { Hero } from "@/app/widgets/hero";

export const revalidate = 30;
export const dynamic = "force-static";

export default async function IqTestPage() {
  const tests = await fetchIqTests();
  const results = await fetchResults();

  return (
    <div className="min-h-screen flex flex-col pt-20 gap-10">
      <Hero />

      <ContentDisplay
        config={{
          title: "How it Works",
          type: "default",
          gridCols: { default: 1, md: 3 },
          containerClass: "px-5 md:px-3 xl:px-0",
          headerClass: "mb-10",
        }}
        data={steps}
        renderCard={(step, index) => (
          <StepCard
            key={index}
            icon={step.icon}
            title={step.title}
            description={step.description}
          />
        )}
      />

      <ContentDisplay
        config={{
          title: "Available Tests",
          subtitle:
            "Each test reveals a new part of you. Start with intelligence, with more tests coming soon",
          type: "background",
          gridCols: { default: 1, md: 2, lg: 4 },
          contentClass: "pt-8 pb-4",
        }}
        data={tests.slice(0, 4)}
        renderCard={(test) => <TestCard key={test.id} test={test} />}
      />

      <ContentDisplay
        config={{
          title: "Boost Your Abilities",
          subtitle:
            "Unlock your potential with our comprehensive training package",
          type: "default",
          gridCols: { default: 1, md: 3 },
          containerClass: "px-4 pb-5",
          headerClass: "mb-16",
        }}
        data={abilitiesData}
        renderCard={(ability) => (
          <AbilityCard key={ability.id} ability={ability} />
        )}
      />

      <ContentDisplay
        config={{
          title: "What Will You Get",
          type: "horizontal-scroll",
          gridCols: { default: 1, md: 2, lg: 5 },
        }}
        data={results}
        renderCard={(item) => <ResultCard key={item.id} item={item} />}
      />

      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-screen bg-[#e9f1f9] h-full"></div>
        <div className="relative z-10">
          <Community />
        </div>
      </div>

      <ContentDisplay
        config={{
          title: "Explore our plans",
          subtitle:
            "Discover our flexible offers and choose the one that best suits your learning and personal development journey.",
          type: "default",
          gridCols: { default: 1, md: 2 },
          containerClass:
            "max-w-3xl mx-auto place-items-center md:place-items-stretch",
          contentClass: "gap-3",
          bottomText: "*Visit our pricing page to find out more details.",
        }}
        data={PRICING_PLANS}
        renderCard={(plan) => <PricingCard key={plan.id} plan={plan} />}
      />

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
