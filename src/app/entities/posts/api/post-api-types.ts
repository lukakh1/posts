import { Post } from "../model";

export interface GetPostsOptions {
  limit?: number;
  page?: number;
  pageParam?: number;
}

export interface PaginatedResponse {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: Post[];
}
