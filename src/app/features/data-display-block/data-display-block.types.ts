import { ReactNode } from "react";

export type DataDisplayType = "grid" | "list" | "infinite" | "paginated";

export interface DataDisplayBlockProps<T> {
  data: T[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;

  displayType: DataDisplayType;
  className?: string;
  testId?: string;

  loadingText?: string;
  errorMessage?: string;
  emptyMessage?: string;

  renderItem: (item: T, index: number) => ReactNode;

  pagination?: PaginationProps;
  infiniteScroll?: InfiniteScrollProps;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onFirst: () => void;
  onLast: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  disabled?: boolean;
}

export interface InfiniteScrollProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  title?: string;
  description?: string;
  showHeader?: boolean;
}

export interface LayoutProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  testId: string;
}

export interface PaginatedLayoutProps<T> extends LayoutProps<T> {
  pagination: PaginationProps;
}

export interface InfiniteScrollLayoutProps<T> extends LayoutProps<T> {
  infiniteScroll: InfiniteScrollProps;
}

export interface InfiniteScrollTriggerProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}
