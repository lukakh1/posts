import { envServer } from "@/config/env";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

config({ path: ".env.local" });

const client = postgres(envServer.DATABASE_URL!);
export const db = drizzle({ client });
