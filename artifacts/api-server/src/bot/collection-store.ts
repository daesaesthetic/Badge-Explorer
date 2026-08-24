import { and, eq } from "drizzle-orm";
import { db, userBadges } from "@workspace/db";

export async function getOwnedBadges(discordUserId: string): Promise<string[]> {
  const rows = await db
    .select({ badgeId: userBadges.badgeId })
    .from(userBadges)
    .where(eq(userBadges.discordUserId, discordUserId));

  return rows.map((row) => row.badgeId);
}

export async function markBadgeOwned(discordUserId: string, badgeId: string): Promise<void> {
  await db
    .insert(userBadges)
    .values({ discordUserId, badgeId })
    .onConflictDoNothing({
      target: [userBadges.discordUserId, userBadges.badgeId],
    });
}

export async function unmarkBadgeOwned(discordUserId: string, badgeId: string): Promise<void> {
  await db
    .delete(userBadges)
    .where(and(eq(userBadges.discordUserId, discordUserId), eq(userBadges.badgeId, badgeId)));
}

export async function resetOwnedBadges(discordUserId: string): Promise<void> {
  await db.delete(userBadges).where(eq(userBadges.discordUserId, discordUserId));
}