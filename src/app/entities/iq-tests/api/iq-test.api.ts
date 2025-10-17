"use server";
import { ApiResponse } from "@/app/shared/types";
import { db } from "@/pkg/libraries/drizzle";
import { iqTests } from "@/pkg/libraries/drizzle/schema";
import { asc } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { IqTest } from "../model/iq-test.model";

export const getIqTests = unstable_cache(
  async (): Promise<ApiResponse<IqTest[]>> => {
    const rows = await db.select().from(iqTests).orderBy(asc(iqTests.id));
    return { success: true, data: rows as IqTest[] };
  },
  ["iq-tests-list"],
  { revalidate: 60, tags: ["iq-tests-list"] }
);
