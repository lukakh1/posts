export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  total?: number;
  error?: string;
};
