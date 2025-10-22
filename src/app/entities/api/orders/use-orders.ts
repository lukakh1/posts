"use client";

import { ApiResponse } from "@/app/shared/types";
import { handleQueryError } from "@/pkg/libraries/error-handler";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Order } from "../../models";
import { getOrders } from "./order-api";

export const ordersKeys = {
  all: ["orders"] as const,
  pag: ["ordersPag"] as const,
  inf: ["ordersInf"] as const,
};

export function useInfiniteOrders(limit: number = 10) {
  return useInfiniteQuery<ApiResponse<Order[]>>({
    queryKey: ordersKeys.inf,
    queryFn: async ({ pageParam }) => {
      const result = await getOrders({
        page: (pageParam as number) + 1,
        limit: limit,
      });
      if (!result.success) {
        throw new Error(result.error ?? "Failed to fetch infinite orders");
      }
      return result;
    },
    getNextPageParam: (lastPage, allPages) => {
      // If the last page has fewer items than the limit, we've reached the end
      return lastPage.data && lastPage.data.length < limit
        ? undefined
        : allPages.length;
    },
    initialPageParam: 0,
    meta: {
      onError: (error: Error) => {
        handleQueryError(error, "infinite orders", {
          limit,
          pageCount: "infinite",
        });
      },
    },
    retry: (failureCount, error) => {
      // Don't retry on 4xx errors (client errors)
      if (error.message.includes("4")) return false;
      return failureCount < 2;
    },
  });
}

export function useOrders() {
  return useQuery<ApiResponse<Order[]>>({
    queryKey: ordersKeys.all,
    queryFn: async () => {
      const result = await getOrders();
      if (!result.success) {
        throw new Error(result.error ?? "Failed to fetch orders");
      }
      return result;
    },
    staleTime: 30_000,
    meta: {
      onError: (error: Error) => {
        handleQueryError(error, "all orders", {
          queryType: "all-orders",
        });
      },
    },
    retry: (failureCount, error) => {
      if (error.message.includes("4")) return false;
      return failureCount < 2;
    },
  });
}

export function useOrdersPag(limit: number = 10, page: number = 1) {
  return useQuery<ApiResponse<Order[]>>({
    queryKey: ["orders", "paginated", { limit, page }],
    queryFn: async () => {
      const result = await getOrders({ limit, page });
      if (!result.success) {
        throw new Error(result.error ?? "Failed to fetch orders");
      }
      return result;
    },
    staleTime: 1000 * 30,
    placeholderData: (previousData) => previousData,
    meta: {
      onError: (error: Error) => {
        handleQueryError(error, ["orders", "paginated"], {
          limit,
          page,
        });
      },
    },
    retry: (failureCount, error) => {
      if (error.message.includes("4")) return false;
      return failureCount < 2;
    },
  });
}
