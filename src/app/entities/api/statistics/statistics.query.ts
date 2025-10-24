import { queryOptions } from "@tanstack/react-query";
import { getStatistics, getStatisticsPaginated } from "./statistics.api";

export const statisticsQueryOptions = () =>
  queryOptions({
    queryKey: ["statistics"],
    queryFn: async () => {
      const res = await getStatistics();
      if (!res.success) {
        throw new Error(res.error ?? "Failed to fetch statistics");
      }
      return res.data ?? [];
    },
    staleTime: 30_000,
  });

export const statisticsPaginatedQueryOptions = (
  limit: number,
  offset: number
) =>
  queryOptions({
    queryKey: ["statistics", "paginated", limit, offset],
    queryFn: async () => {
      const res = await getStatisticsPaginated(limit, offset);
      if (!res.success) {
        throw new Error(res.error ?? "Failed to fetch paginated statistics");
      }
      return res.data ?? [];
    },
    refetchOnWindowFocus: false,
    staleTime: 30_000,
  });
