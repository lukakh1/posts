import { queryOptions } from "@tanstack/react-query";
import { Result } from "../../models";
import { getResults } from "./results.api";

export const resultsQueryOptions = () =>
  queryOptions({
    queryKey: ["results"],
    queryFn: async (): Promise<Result[]> => {
      const response = await getResults();
      if (!response.success) {
        throw new Error(response.error ?? "Failed to fetch results");
      }
      return response.data ?? [];
    },
    staleTime: 30_000,
    gcTime: 60_000,
  });
