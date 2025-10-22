"use server";
import { ApiResponse } from "@/app/shared/types";
import { db } from "@/pkg/libraries/drizzle";
import { results } from "@/pkg/libraries/drizzle/schema";
import { desc } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { Result } from "../../models";

export const getResults = unstable_cache(
  async (): Promise<ApiResponse<Result[]>> => {
    const rows = await db.select().from(results).orderBy(desc(results.id));
    return { success: true, data: rows as Result[] };
  },
  ["results-list"],
  { revalidate: 60, tags: ["results-list"] }
);
