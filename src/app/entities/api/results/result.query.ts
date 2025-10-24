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
    staleTime: 5 * 60 * 1000, // 5 minutes - align with server cache
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
