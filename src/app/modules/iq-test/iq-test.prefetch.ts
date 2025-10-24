"use server";

import { iqTestsQueryOptions } from "@/app/entities/api/iq-test";
import { resultsQueryOptions } from "@/app/entities/api/results";
import { statisticsPaginatedQueryOptions } from "@/app/entities/api/statistics";
import { QueryClient } from "@tanstack/react-query";

const PAGE_SIZE = 8;

export async function prefetchIqTestData(queryClient: QueryClient) {
  try {
    await Promise.allSettled([
      queryClient.prefetchQuery(iqTestsQueryOptions()),
      queryClient.prefetchQuery(resultsQueryOptions()),
      // Prefetch the first page of statistics that the rotating hook will use
      queryClient.prefetchQuery(statisticsPaginatedQueryOptions(PAGE_SIZE, 0)),
    ]);
  } catch (error) {
    console.error("Error prefetching IQ test data:", error);
  }
}
