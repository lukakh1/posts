"use client";

import { iqTestsQueryOptions } from "@/app/entities/api/iq-test";
import { resultsQueryOptions } from "@/app/entities/api/results";
import { IqTest, Result } from "@/app/entities/models";
import {
  abilitiesData,
  COMMUNITY,
  FAQ_ITEMS,
  HERO_DATA,
  PRICING_PLANS,
  steps,
} from "@/app/shared/assets";
import { useQuery } from "@tanstack/react-query";

export interface IqTestModuleData {
  tests: IqTest[];
  results: Result[];
  abilitiesData: typeof abilitiesData;
  pricingPlans: typeof PRICING_PLANS;
  steps: typeof steps;
  faqItems: typeof FAQ_ITEMS;
  community: typeof COMMUNITY;
  heroData: typeof HERO_DATA;
}

export const useIqTestService = () => {
  const {
    data: testsResponse,
    isLoading: testsLoading,
    error: testsError,
  } = useQuery(iqTestsQueryOptions());
  const {
    data: resultsResponse,
    isLoading: resultsLoading,
    error: resultsError,
  } = useQuery(resultsQueryOptions());

  const tests = testsResponse || [];
  const results = resultsResponse || [];

  const data: IqTestModuleData = {
    tests,
    results,
    abilitiesData,
    pricingPlans: PRICING_PLANS,
    steps,
    faqItems: FAQ_ITEMS,
    community: COMMUNITY,
    heroData: HERO_DATA,
  };

  return {
    data,
    testsLoading,
    resultsLoading,
    testsError,
    resultsError,
  };
};
