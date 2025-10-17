import "dotenv/config";

const config = {
  dialect: "postgresql",
  schema: "./src/pkg/libraries/drizzle/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
};

export default config;
