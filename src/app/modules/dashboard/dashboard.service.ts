"use server";

import { getOrders } from "@/app/entities/api/orders";
import { Order } from "@/app/entities/models";
import { ApiResponse } from "@/app/shared/types";
import { handleServerActionError } from "@/pkg/libraries/error-handler";

export interface DashboardData {
  orders: Order[];
  totalOrders: number;
}

export async function getDashboardData(): Promise<ApiResponse<DashboardData>> {
  try {
    const ordersResult = await getOrders();

    if (!ordersResult.success) {
      throw new Error(ordersResult.error ?? "Failed to fetch orders");
    }

    const dashboardData: DashboardData = {
      orders: ordersResult.data || [],
      totalOrders: ordersResult.data?.length || 0,
    };

    return {
      success: true,
      data: dashboardData,
    };
  } catch (error: unknown) {
    const errorMessage = handleServerActionError(error, "getDashboardData", {
      context: "dashboard",
    });
    throw new Error(errorMessage);
  }
}
