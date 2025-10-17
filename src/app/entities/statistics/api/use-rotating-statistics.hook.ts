"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { getStatisticsPaginated } from "./statistics.api";

const PAGE_SIZE = 8;

export function useRotatingStatistics(limit: number = PAGE_SIZE) {
  const [currentOffset, setCurrentOffset] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const totalCountRef = useRef<number | null>(null);

  const query = useQuery({
    queryKey: ["statistics", "rotating", limit, currentOffset],
    queryFn: async () => {
      const res = await getStatisticsPaginated(limit, currentOffset);
      if (!res.success)
        throw new Error(res.error ?? "Failed to fetch statistics");

      const items = res.data ?? [];

      if (items.length < limit && items.length > 0) {
        totalCountRef.current = currentOffset + items.length;
      } else if (items.length === 0 && currentOffset > 0) {
        totalCountRef.current = currentOffset;
      }

      return items;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setCurrentOffset((prev) => {
        const nextOffset = prev + limit;
        if (
          totalCountRef.current !== null &&
          nextOffset >= totalCountRef.current
        ) {
          return 0;
        }
        return nextOffset;
      });
    }, 5_000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [limit]);

  useEffect(() => {
    if (query.data && query.data.length === 0 && currentOffset > 0) {
      setCurrentOffset(0);
    }
  }, [query.data, currentOffset]);

  return { ...query, items: query.data ?? [] };
}
