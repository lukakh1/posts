"use client";
import { useRouter } from "@/pkg/libraries/locale";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export interface PaginationConfig {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasPrev: boolean;
  hasNext: boolean;
  disabled?: boolean;
}

export interface PaginationActions {
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onFirst: () => void;
  onLast: () => void;
}

export interface UsePaginationProps {
  totalPages: number;
  totalItems: number;
  disabled?: boolean;
}

export function usePagination({
  totalPages,
  totalItems,
  disabled = false,
}: UsePaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Math.max(
    1,
    parseInt(searchParams.get("page") || "1", 10)
  );
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const updateURL = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", newPage.toString());
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const onPageChange = useCallback(
    (targetPage: number) => {
      if (
        targetPage >= 1 &&
        targetPage <= totalPages &&
        targetPage !== currentPage
      ) {
        updateURL(targetPage);
      }
    },
    [totalPages, currentPage, updateURL]
  );

  const onPrevious = useCallback(() => {
    if (hasPrev) {
      updateURL(currentPage - 1);
    }
  }, [hasPrev, currentPage, updateURL]);

  const onNext = useCallback(() => {
    if (hasNext) {
      updateURL(currentPage + 1);
    }
  }, [hasNext, currentPage, updateURL]);

  const onFirst = useCallback(() => {
    updateURL(1);
  }, [updateURL]);

  const onLast = useCallback(() => {
    updateURL(totalPages);
  }, [updateURL, totalPages]);

  const config: PaginationConfig = {
    currentPage,
    totalPages,
    totalItems,
    hasPrev,
    hasNext,
    disabled,
  };

  const actions: PaginationActions = {
    onPageChange,
    onPrevious,
    onNext,
    onFirst,
    onLast,
  };

  return { config, actions };
}
