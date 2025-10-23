import { ApiResponse } from "@/app/shared/types";
import { getQueryClient } from "@/pkg/libraries/rest-api";
import { Result } from "../../models";
import { getResults } from "./results.api";

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

