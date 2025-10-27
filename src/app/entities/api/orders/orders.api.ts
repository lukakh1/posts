"use server";
import { ApiResponse } from "@/app/shared/types";
import { db } from "@/pkg/libraries/drizzle";
import { orders } from "@/pkg/libraries/drizzle/schema";
import { handleServerActionError } from "@/pkg/utils/error-handler";
import { desc, eq, ilike } from "drizzle-orm";
import { revalidatePath, unstable_cache } from "next/cache";
import { CreateOrderData, Order } from "../../models";

interface GetOrdersOptions {
  limit?: number;
  page?: number;
  search?: string;
}

export const getOrders = unstable_cache(
  async (options: GetOrdersOptions = {}): Promise<ApiResponse<Order[]>> => {
    const { limit, page, search } = options;

    try {
      let rows;

      if (search && limit && page) {
        rows = await db
          .select()
          .from(orders)
          .where(ilike(orders.name, `%${search}%`))
          .orderBy(desc(orders.created_at))
          .limit(limit)
          .offset((page - 1) * limit);
      } else if (search && limit) {
        rows = await db
          .select()
          .from(orders)
          .where(ilike(orders.name, `%${search}%`))
          .orderBy(desc(orders.created_at))
          .limit(limit);
      } else if (search) {
        rows = await db
          .select()
          .from(orders)
          .where(ilike(orders.name, `%${search}%`))
          .orderBy(desc(orders.created_at));
      } else if (limit && page) {
        rows = await db
          .select()
          .from(orders)
          .orderBy(desc(orders.created_at))
          .limit(limit)
          .offset((page - 1) * limit);
      } else if (limit) {
        rows = await db
          .select()
          .from(orders)
          .orderBy(desc(orders.created_at))
          .limit(limit);
      } else {
        rows = await db.select().from(orders).orderBy(desc(orders.created_at));
      }

      return {
        success: true,
        data: rows as Order[],
        total: rows.length,
      };
    } catch (error: unknown) {
      const errorMessage = handleServerActionError(error, "getOrders", {
        table: "orders",
        limit: limit ?? null,
        page: page ?? null,
        search: search ?? null,
      });
      throw new Error(errorMessage);
    }
  },
  ["orders-list"],
  {
    revalidate: 30,
    tags: ["orders-list"],
  }
);

export async function getOrder(id: string): Promise<ApiResponse<Order>> {
  try {
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.id, parseInt(id)))
      .limit(1);

    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }

    return { success: true, data: order as Order };
  } catch (error: unknown) {
    const errorMessage = handleServerActionError(error, "getOrder", {
      orderId: id,
      table: "orders",
    });
    throw new Error(errorMessage);
  }
}

export async function addOrder(
  orderData: CreateOrderData
): Promise<ApiResponse<Order>> {
  try {
    const [inserted] = await db
      .insert(orders)
      .values({
        name: orderData.name,
        total: orderData.total,
      })
      .returning();

    revalidatePath("/dashboard");

    return { success: true, data: inserted as Order };
  } catch (error: unknown) {
    const errorMessage = handleServerActionError(error, "addOrder", {
      orderData: {
        name: orderData.name,
        total: orderData.total,
      },
      table: "orders",
    });
    throw new Error(errorMessage);
  }
}
