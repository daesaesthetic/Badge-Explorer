import { BADGES, searchBadges, getCategories, type Badge } from "../data/badges";

// ─── Shared embed helpers ────────────────────────────────────────────────────

const RARITY_COLORS: Record<string, number> = {
  common: 0x5865f2,
  uncommon: 0x23a55a,
  rare: 0x0099ff,
  very_rare: 0xf0b132,
  legendary: 0xff4500,
  legacy: 0x80848e,
};

const DIFFICULTY_EMOJI: Record<string, string> = {
  instant: "⚡",
  easy: "✅",
  medium: "🔶",
  hard: "🔴",
  unobtainable: "🚫",
};

const RARITY_LABEL: Record<string, string> = {
  common: "Common",
  uncommon: "Uncommon",
  rare: "Rare",
  very_rare: "Very Rare",
  legendary: "Legendary",
  legacy: "Legacy",
};

const CATEGORY_LABEL: Record<string, string> = {
  hypesquad: "HypeSquad",
  developer: "Developer",
  staff: "Staff & Partner",
  nitro: "Nitro",
  booster: "Server Booster",
  special: "Special",
  legacy: "Legacy",
};

const BRAND_BLUE = 0x4f6df5;
const BRAND_GOLD = 0xf2c233;
const BRAND_NAVY = 0x1b2559;

function getAvailability(badge: Badge) {
  return badge.availability ?? (badge.obtainable ? "available" : "retired");
}

const AVAILABILITY_LABEL: Record<string, string> = {
  available: "✅ Obtainable",
  limited: "⚠️ Limited rollout",
  retired: "🚫 Retired",
  restricted: "🔒 Restricted",
};

const AVAILABILITY_ICON: Record<string, string> = {
  available: "✅",
  limited: "⚠️",
  retired: "🚫",
  restricted: "🔒",
};

export function buildBadgeEmbed(badgeId: string) {
  const badge = BADGES.find((b) => b.id === badgeId);
  if (!badge) return null;

  const difficultyStr = `${DIFFICULTY_EMOJI[badge.difficulty] ?? "?"} ${badge.difficulty.charAt(0).toUpperCase() + badge.difficulty.slice(1)}`;
  const availability = getAvailability(badge);
  const obtainableStr = AVAILABILITY_LABEL[availability] ?? availability;
  const rarityStr = RARITY_LABEL[badge.rarity] ?? badge.rarity;
  const categoryStr = CATEGORY_LABEL[badge.category] ?? badge.category;

  const guideLines = badge.guide
    .map((step) => `**${step.step}.** ${step.description}`)
    .join("\n");

  const fields: { name: string; value: string; inline: boolean }[] = [
    { name: "Category", value: categoryStr, inline: true },
    { name: "Rarity", value: rarityStr, inline: true },
    { name: "Difficulty", value: difficultyStr, inline: true },
    { name: "Status", value: obtainableStr, inline: true },
  ];

  if (badge.timeEstimate) {
    fields.push({ name: "Time Estimate", value: badge.timeEstimate, inline: true });
  }

  if (badge.guide.length > 0) {
    fields.push({ name: "Unlock Guide", value: guideLines.slice(0, 1024), inline: false });
  }

  if (badge.tips) {
    fields.push({ name: "Tips", value: badge.tips.slice(0, 1024), inline: false });
  }

  if (badge.consoleCommand) {
    const cmdPreview = badge.consoleCommandLabel ?? "Browser console command available";
    fields.push({
      name: "Console Command",
      value: `\`${cmdPreview}\`\nUse \`/badge console ${badge.id}\` to get the full command.`,
      inline: false,
    });
  }

  return {
    author: { name: "👑 Badge Bot · Royal Archive" },
    title: `◆ ${badge.name}`,
    description: badge.description,
    color: RARITY_COLORS[badge.rarity] ?? 0x5865f2,
    fields,
    footer: { text: `Badge Bot · Badge ID: ${badge.id}` },
  };
}

export function buildBadgeListEmbed(
  badges: ReturnType<typeof searchBadges>,
  title: string,
  description?: string,
) {
  const lines = badges.map((b) => {
    const status = AVAILABILITY_ICON[getAvailability(b)] ?? "•";
    const diff = DIFFICULTY_EMOJI[b.difficulty] ?? "?";
    const cat = CATEGORY_LABEL[b.category] ?? b.category;
    return `${status} ${diff} **${b.name}** — ${cat} | \`/badge info ${b.id}\``;
  });

  const chunks: string[][] = [];
  let current: string[] = [];
  let length = 0;
  for (const line of lines) {
    if (length + line.length + 1 > 4000) {
      chunks.push(current);
      current = [];
      length = 0;
    }
    current.push(line);
    length += line.length + 1;
  }
  if (current.length) chunks.push(current);

  return {
    author: { name: "👑 Badge Bot · Badge Reference" },
    title,
    description: (description ? description + "\n\n" : "") + (chunks[0]?.join("\n") ?? "No badges found."),
    color: BRAND_NAVY,
    footer: {
      text: `${badges.length} badge${badges.length !== 1 ? "s" : ""} | ✅ obtainable  ⚠️ limited  🚫 retired  🔒 restricted`,
    },
  };
}

export function buildConsoleEmbed(badgeId: string) {
  const badge = BADGES.find((b) => b.id === badgeId);
  if (!badge) return null;
  if (!badge.consoleCommand) return null;

  // Discord embeds have a 1024-char field limit and 4096-char description limit
  const cmdText = badge.consoleCommand.length > 3900
    ? badge.consoleCommand.slice(0, 3900) + "\n// ... (truncated)"
    : badge.consoleCommand;

  return {
    author: { name: "👑 Badge Bot · Verified Guidance" },
    title: `◆ Console Command: ${badge.name}`,
    description:
      `> **Warning:** Only run this in Discord's **official web client** browser Developer Console (F12). Never run scripts from untrusted sources. This command uses your Discord auth token.\n\n` +
      `\`\`\`javascript\n${cmdText}\n\`\`\``,
    color: BRAND_GOLD,
    footer: { text: "Badge Bot · Only use the official Discord web client on your own account" },
  };
}

export function buildStatsEmbed() {
  const total = BADGES.length;
  const obtainable = BADGES.filter((b) => b.obtainable).length;
  const retired = BADGES.filter((b) => getAvailability(b) === "retired").length;
  const limited = BADGES.filter((b) => getAvailability(b) === "limited").length;

  const byCategory: Record<string, number> = {};
  const byDifficulty: Record<string, number> = {};
  for (const b of BADGES) {
    byCategory[b.category] = (byCategory[b.category] ?? 0) + 1;
    byDifficulty[b.difficulty] = (byDifficulty[b.difficulty] ?? 0) + 1;
  }

  const catLines = Object.entries(byCategory)
    .map(([cat, n]) => `${CATEGORY_LABEL[cat] ?? cat}: **${n}**`)
    .join("\n");

  const diffLines = Object.entries(byDifficulty)
    .map(([diff, n]) => `${DIFFICULTY_EMOJI[diff] ?? "?"} ${diff.charAt(0).toUpperCase() + diff.slice(1).replace("_", " ")}: **${n}**`)
    .join("\n");

  return {
    author: { name: "👑 Badge Bot · Collection Atlas" },
    title: "◆ Discord Badge Stats",
    color: BRAND_NAVY,
    fields: [
      { name: "Total Badges", value: `**${total}**`, inline: true },
      { name: "Obtainable Now", value: `**${obtainable}**`, inline: true },
      { name: "Retired", value: `**${retired}**`, inline: true },
      { name: "Limited Rollout", value: `**${limited}**`, inline: true },
      { name: "By Category", value: catLines, inline: true },
      { name: "By Difficulty", value: diffLines, inline: true },
    ],
    footer: { text: "Badge Bot · Current catalog snapshot" },
  };
}

const RARITY_WEIGHT: Record<string, number> = {
  legendary: 6,
  very_rare: 5,
  rare: 4,
  uncommon: 3,
  common: 2,
  legacy: 1,
};

export function buildChecklistEmbed(ownedIds: string[], botAvatarUrl?: string) {
  const owned = new Set(ownedIds);
  const ownedBadges = BADGES.filter((badge) => owned.has(badge.id));
  const obtainable = BADGES.filter((badge) => badge.obtainable);
  const ownedObtainable = obtainable.filter((badge) => owned.has(badge.id));
  const remaining = obtainable.filter((badge) => !owned.has(badge.id));
  const percent = obtainable.length
    ? Math.round((ownedObtainable.length / obtainable.length) * 100)
    : 0;
  const retired = BADGES.filter((badge) => getAvailability(badge) === "retired").length;

  const progressBar = Array.from({ length: 10 }, (_, index) =>
    index < Math.round(percent / 10) ? "▰" : "▱",
  ).join("");

  const nextBadges = remaining
    .slice()
    .sort((a, b) => {
      const difficultyOrder = ["instant", "easy", "medium", "hard", "unobtainable"];
      return difficultyOrder.indexOf(a.difficulty) - difficultyOrder.indexOf(b.difficulty);
    })
    .slice(0, 8);

  return {
    author: {
      name: "Badge Bot · Collection Vault",
      ...(botAvatarUrl ? { icon_url: botAvatarUrl } : {}),
    },
    title: "👑 Your Badge Checklist",
    description: `${progressBar} **${percent}%** of obtainable badges tracked\n\n**${ownedObtainable.length}** obtained · **${remaining.length}** remaining · **${retired}** retired`,
    color: BRAND_GOLD,
    fields: [
      {
        name: `Unlocked badges · ${ownedBadges.length}`,
        value: ownedBadges.length
          ? ownedBadges
              .map((badge) => `${badge.obtainable ? "✅" : "◇"} **${badge.name}**`)
              .join("\n")
              .slice(0, 1024)
          : "No badges marked yet. Use `/badge own` after earning one.",
        inline: false,
      },
      {
        name: "Next easiest targets",
        value: nextBadges.length
          ? nextBadges
              .map((badge) => `${DIFFICULTY_EMOJI[badge.difficulty] ?? "•"} **${badge.name}** — \`/badge info ${badge.id}\``)
              .join("\n")
          : "You have marked every obtainable badge. Check back when Discord adds more.",
        inline: false,
      },
      {
        name: "How to update it",
        value: "Use `/badge own` after earning a badge, `/badge unown` to undo, or `/badge reset` to clear your checklist.",
        inline: false,
      },
    ],
    footer: {
      text: "Badge Bot · Your collection is securely stored by Discord user ID",
      ...(botAvatarUrl ? { icon_url: botAvatarUrl } : {}),
    },
  };
}

export function buildProfileEmbed(
  displayName: string,
  avatarUrl: string | null,
  ownedIds: string[],
  botAvatarUrl?: string,
) {
  const owned = new Set(ownedIds);
  const ownedBadges = BADGES.filter((badge) => owned.has(badge.id));
  const obtainable = BADGES.filter((badge) => badge.obtainable);
  const ownedObtainable = obtainable.filter((badge) => owned.has(badge.id));
  const badgeLines = ownedBadges.length
    ? ownedBadges
        .map((badge) => `${badge.obtainable ? "✅" : "◇"} **${badge.name}**`)
        .join("\n")
        .slice(0, 1024)
    : "No badges unlocked yet. Use `/badge own` to start tracking this profile.";

  return {
    author: {
      name: `${displayName}'s Badge Profile`,
      ...(avatarUrl ? { icon_url: avatarUrl } : {}),
    },
    title: "👑 Badge Cabinet",
    description: "A private snapshot of the badges this Discord profile has marked as unlocked.",
    color: BRAND_BLUE,
    ...(avatarUrl ? { thumbnail: { url: avatarUrl } } : {}),
    fields: [
      {
        name: `Unlocked badges · ${ownedBadges.length}`,
        value: badgeLines,
        inline: false,
      },
      {
        name: "Current collection",
        value: `**${ownedObtainable.length} / ${obtainable.length}** currently obtainable badges tracked`,
        inline: true,
      },
      {
        name: "Profile status",
        value: ownedBadges.length ? "Collection in progress" : "Ready to begin",
        inline: true,
      },
    ],
    footer: {
      text: botAvatarUrl
        ? "Badge Bot · Reference profile"
        : "Badge Bot · Profile data is read from Discord and not stored",
      ...(botAvatarUrl ? { icon_url: botAvatarUrl } : {}),
    },
    timestamp: new Date().toISOString(),
  };
}

export function buildHuntPlanEmbed() {
  const quickWins = searchBadges({ obtainable: "true" }).filter(
    (badge) => badge.difficulty === "instant" || badge.difficulty === "easy",
  );
  const needsWork = searchBadges({ obtainable: "true" }).filter(
    (badge) => badge.difficulty === "medium" || badge.difficulty === "hard",
  );

  return {
    title: "Badge Hunting Plan",
    description: "Start with the badges that take minutes, then work toward the ones that need consistency or staff review.",
    color: 0x57f287,
    fields: [
      {
        name: "Phase 1 · Quick wins",
        value: quickWins
          .map((badge) => `**${badge.name}** · ${badge.timeEstimate ?? "short"} · \`/badge info ${badge.id}\``)
          .join("\n")
          .slice(0, 1024),
        inline: false,
      },
      {
        name: "Phase 2 · Long game",
        value: needsWork
          .map((badge) => `**${badge.name}** · ${badge.timeEstimate ?? "varies"} · \`/badge info ${badge.id}\``)
          .join("\n")
          .slice(0, 1024),
        inline: false,
      },
      {
        name: "Safety rule",
        value: "Only use commands for actions Discord officially supports on your own account. No script can legitimately grant staff, legacy, or discontinued badges.",
        inline: false,
      },
    ],
    footer: { text: "Plan made from the current BadgeBot catalog" },
  };
}

export function buildRandomBadgeEmbed(badge: Badge) {
  const difficulty = badge.difficulty.charAt(0).toUpperCase() + badge.difficulty.slice(1);
  return {
    title: "Your next badge target",
    description: `**${badge.name}**\n${badge.description}`,
    color: RARITY_COLORS[badge.rarity] ?? 0x5865f2,
    fields: [
      { name: "Difficulty", value: difficulty, inline: true },
      { name: "Time estimate", value: badge.timeEstimate ?? "Varies", inline: true },
      { name: "Start here", value: `Use \`/badge info ${badge.id}\` for the full guide.`, inline: false },
    ],
    footer: { text: badge.obtainable ? "This badge is currently obtainable" : "This badge is legacy — use it as a collection target only" },
  };
}

export function getRarestBadges() {
  return BADGES.slice()
    .sort((a, b) => (RARITY_WEIGHT[b.rarity] ?? 0) - (RARITY_WEIGHT[a.rarity] ?? 0))
    .slice(0, 8);
}

export const SLASH_COMMANDS = [
  {
    name: "badge",
    description: "Discord badge commands",
    options: [
      {
        name: "search",
        description: "Search for Discord badges by name or keyword",
        type: 1, // SUB_COMMAND
        options: [
          {
            name: "query",
            description: "Search term (e.g. 'hypesquad', 'developer', 'nitro')",
            type: 3, // STRING
            required: false,
          },
          {
            name: "category",
            description: "Filter by category",
            type: 3, // STRING
            required: false,
            choices: getCategories().map((c) => ({ name: c.label, value: c.id })),
          },
          {
            name: "obtainable",
            description: "Filter by obtainable status",
            type: 5, // BOOLEAN
            required: false,
          },
        ],
      },
      {
        name: "info",
        description: "Get detailed info and unlock guide for a specific badge",
        type: 1,
        options: [
          {
            name: "id",
            description: "Badge ID (use /badge search to find IDs)",
            type: 3,
            required: true,
            choices: BADGES.map((b) => ({ name: b.name, value: b.id })),
          },
        ],
      },
      {
        name: "console",
        description: "Get the browser console command for a badge (if available)",
        type: 1,
        options: [
          {
            name: "id",
            description: "Badge ID",
            type: 3,
            required: true,
            choices: BADGES.filter((b) => b.consoleCommand !== null).map((b) => ({
              name: b.name,
              value: b.id,
            })),
          },
        ],
      },
      {
        name: "list",
        description: "List all badges in a category",
        type: 1,
        options: [
          {
            name: "category",
            description: "Category to list",
            type: 3,
            required: false,
            choices: getCategories().map((c) => ({ name: c.label, value: c.id })),
          },
        ],
      },
      {
        name: "stats",
        description: "Show statistics about all Discord badges",
        type: 1,
      },
      {
        name: "obtainable",
        description: "Show every badge you can still earn today",
        type: 1,
      },
      {
        name: "quickwins",
        description: "Show the fastest badges to add to your collection",
        type: 1,
      },
      {
        name: "rarest",
        description: "Show the rarest badges in the catalog",
        type: 1,
      },
      {
        name: "legacy",
        description: "Show badges that are no longer obtainable",
        type: 1,
      },
      {
        name: "random",
        description: "Get a random badge target",
        type: 1,
      },
      {
        name: "hunt",
        description: "Get a practical badge hunting plan",
        type: 1,
      },
      {
        name: "checklist",
        description: "View your private badge collection checklist",
        type: 1,
      },
      {
        name: "own",
        description: "Mark a badge as obtained in your private checklist",
        type: 1,
        options: [
          {
            name: "id",
            description: "Badge to mark as obtained",
            type: 3,
            required: true,
            choices: BADGES.map((b) => ({ name: b.name, value: b.id })),
          },
        ],
      },
      {
        name: "unown",
        description: "Remove a badge from your private checklist",
        type: 1,
        options: [
          {
            name: "id",
            description: "Badge to remove",
            type: 3,
            required: true,
            choices: BADGES.map((b) => ({ name: b.name, value: b.id })),
          },
        ],
      },
      {
        name: "reset",
        description: "Clear every badge from your private checklist",
        type: 1,
      },
      {
        name: "guide",
        description: "Get the full unlock guide for a badge",
        type: 1,
        options: [
          {
            name: "id",
            description: "Badge ID",
            type: 3,
            required: true,
            choices: BADGES.map((b) => ({ name: b.name, value: b.id })),
          },
        ],
      },
    ],
  },
  {
    name: "profile",
    description: "Display a private badge profile and unlocked badges",
    options: [
      {
        name: "user",
        description: "Discord user to view (defaults to you)",
        type: 6, // USER
        required: false,
      },
    ],
  },
];
