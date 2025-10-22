import {
  bigint,
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subTitle: text("sub_title"),
  body: text("body").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  tags: text("tags").array(),
});

export type BlogRow = typeof blogs.$inferSelect;
export type NewBlogRow = typeof blogs.$inferInsert;

export const iqTests = pgTable("iq_tests", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  name: text("name").notNull(),
  duration_min: integer("duration_min").notNull(),
  questions_num: integer("questions_num").notNull(),
  icon_name: text("icon_name").notNull(),
  is_available: boolean("is_available").notNull().default(true),
  sub_name: text("sub_name").notNull(),
});

export type IqTestRow = typeof iqTests.$inferSelect;
export type NewIqTestRow = typeof iqTests.$inferInsert;

export const results = pgTable("results", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  body: text("body").notNull(),
});

export type resultsRow = typeof results.$inferSelect;
export type NewResultsRow = typeof results.$inferInsert;

export const statistics = pgTable("statistics", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  name: text("name").notNull(),
  flag_icon: text("flag_icon").notNull(),
  iq: integer("iq").notNull(),
});

export type statisticsRow = typeof statistics.$inferSelect;
export type NewStatisticsRow = typeof statistics.$inferInsert;

export const orders = pgTable("orders", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  name: text("name").notNull(),
  total: integer("total").notNull(),
});

export type OrderRow = typeof orders.$inferSelect;
export type NewOrderRow = typeof orders.$inferInsert;
