import { NewOrderRow, OrderRow } from "@/pkg/libraries/drizzle/schema";

export type Order = OrderRow;

export type CreateOrderData = NewOrderRow;

export interface OrderFilters {
  limit?: number;
  offset?: number;
  search?: string;
}
