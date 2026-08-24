import { createInsertSchema } from "drizzle-zod";
import { timestamp, text, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const userBadges = pgTable(
  "user_badges",
  {
    discordUserId: text("discord_user_id").notNull(),
    badgeId: text("badge_id").notNull(),
    obtainedAt: timestamp("obtained_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.discordUserId, table.badgeId] }),
  }),
);

export const insertUserBadgeSchema = createInsertSchema(userBadges);
export type InsertUserBadge = z.infer<typeof insertUserBadgeSchema>;
export type UserBadge = typeof userBadges.$inferSelect;