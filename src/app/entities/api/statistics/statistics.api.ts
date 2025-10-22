"use server";
import { ApiResponse } from "@/app/shared/types";
import { db } from "@/pkg/libraries/drizzle";
import { statistics } from "@/pkg/libraries/drizzle/schema";
import { asc } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { Statistics } from "../../models";

export const getStatistics = unstable_cache(
  async (): Promise<ApiResponse<Statistics[]>> => {
    const rows = await db.select().from(statistics).orderBy(asc(statistics.id));
    return { success: true, data: rows as Statistics[] };
  },
  ["statistics-list"],
  { revalidate: 60, tags: ["statistics-list"] }
);

// Paginated fetch without unstable_cache for timely updates
export async function getStatisticsPaginated(
  limit: number,
  offset: number
): Promise<ApiResponse<Statistics[]>> {
  const rows = await db
    .select()
    .from(statistics)
    .orderBy(asc(statistics.id))
    .limit(limit)
    .offset(offset);
  return { success: true, data: rows as Statistics[] };
}
