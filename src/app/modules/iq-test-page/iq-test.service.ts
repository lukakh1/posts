import { getIqTests } from "@/app/entities/api/iq-test";
import { getResults } from "@/app/entities/api/results";
import { IqTest, Result } from "@/app/entities/models";
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
