import { getIqTests, type IqTest } from "@/app/entities/iq-tests";
import { getResults, type Result } from "@/app/entities/results";
import { ApiResponse } from "@/app/shared/types";
import { getQueryClient } from "@/pkg/libraries/rest-api";

export async function fetchIqTests(): Promise<IqTest[]> {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery<ApiResponse<IqTest[]>>({
    queryKey: ["iq-tests"],
    queryFn: () => getIqTests(),
    staleTime: 60_000,
  });
  const cached = queryClient.getQueryData<ApiResponse<IqTest[]>>(["iq-tests"]);
  return cached?.data ?? [];
}

export async function fetchResults(): Promise<Result[]> {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery<ApiResponse<Result[]>>({
    queryKey: ["results"],
    queryFn: () => getResults(),
    staleTime: 60_000,
  });
  const cached = queryClient.getQueryData<ApiResponse<Result[]>>(["results"]);
  return cached?.data ?? [];
}

// Removed fetchStatistics; rotating statistics uses its own hook
