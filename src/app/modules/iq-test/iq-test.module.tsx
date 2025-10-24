"use client";

import {
  AbilityCard,
  AccordionBlock,
  HeroSection,
  ImageHero,
  PricingCard,
  ResultCard,
  StepCard,
  TestCard,
} from "@/app/features";
import { Statistics } from "@/app/widgets";
import { ContentDisplay } from "@/app/widgets/content-display";
import { useIqTestService } from "./iq-test.service";

export function IqTestModule() {
  const { data, testsLoading, resultsLoading, testsError, resultsError } =
    useIqTestService();

  return (
    <div className="min-h-screen flex flex-col pt-20 gap-10">
      <ImageHero heroData={data.heroData} />

      <ContentDisplay
        config={{
          title: "How it Works",
          type: "default",
          gridCols: { default: 1, md: 3 },
          containerClass: "px-5 md:px-3 xl:px-0",
          headerClass: "mb-10",
        }}
        data={data.steps}
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
        data={testsLoading ? [] : data.tests.slice(0, 4)}
        renderCard={(test) => <TestCard key={test.id} test={test} />}
        loading={testsLoading}
        error={testsError}
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
        data={data.abilitiesData}
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
        data={resultsLoading ? [] : data.results}
        renderCard={(item) => <ResultCard key={item.id} item={item} />}
        loading={resultsLoading}
        error={resultsError}
      />

      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-screen bg-[#e9f1f9] h-full"></div>
        <div className="relative z-10">
          <HeroSection data={data.community} />
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
        data={data.pricingPlans}
        renderCard={(plan) => <PricingCard key={plan.id} plan={plan} />}
      />

      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-screen bg-[#e9f1f9] h-full"></div>
        <div className="relative z-10">
          <AccordionBlock
            title="Frequently Asked Questions"
            data={data.faqItems}
          />
        </div>
      </div>

      <Statistics />
    </div>
  );
}
