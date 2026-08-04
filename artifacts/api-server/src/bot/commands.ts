import { BADGES, searchBadges, getCategories } from "../data/badges";

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

export function buildBadgeEmbed(badgeId: string) {
  const badge = BADGES.find((b) => b.id === badgeId);
  if (!badge) return null;

  const difficultyStr = `${DIFFICULTY_EMOJI[badge.difficulty] ?? "?"} ${badge.difficulty.charAt(0).toUpperCase() + badge.difficulty.slice(1)}`;
  const obtainableStr = badge.obtainable ? "✅ Obtainable" : "🚫 No longer obtainable";
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
    title: badge.name,
    description: badge.description,
    color: RARITY_COLORS[badge.rarity] ?? 0x5865f2,
    fields,
    footer: { text: `Badge ID: ${badge.id} | Discord Badge Bot` },
  };
}

export function buildBadgeListEmbed(
  badges: ReturnType<typeof searchBadges>,
  title: string,
  description?: string,
) {
  const lines = badges.map((b) => {
    const status = b.obtainable ? "✅" : "🚫";
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
    title,
    description: (description ? description + "\n\n" : "") + (chunks[0]?.join("\n") ?? "No badges found."),
    color: 0x5865f2,
    footer: {
      text: `${badges.length} badge${badges.length !== 1 ? "s" : ""} | ✅ obtainable  🚫 legacy  ⚡easy  🔶medium  🔴hard`,
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
    title: `Console Command: ${badge.name}`,
    description:
      `> **Warning:** Only run this in Discord's **official web client** browser Developer Console (F12). Never run scripts from untrusted sources. This command uses your Discord auth token.\n\n` +
      `\`\`\`javascript\n${cmdText}\n\`\`\``,
    color: 0x23a55a,
    footer: { text: "Press F12 in Discord Web > Console tab > paste and press Enter" },
  };
}

export function buildStatsEmbed() {
  const total = BADGES.length;
  const obtainable = BADGES.filter((b) => b.obtainable).length;
  const legacy = BADGES.filter((b) => !b.obtainable).length;

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
    title: "Discord Badge Stats",
    color: 0x5865f2,
    fields: [
      { name: "Total Badges", value: `**${total}**`, inline: true },
      { name: "Obtainable Now", value: `**${obtainable}**`, inline: true },
      { name: "Legacy (No Longer Obtainable)", value: `**${legacy}**`, inline: true },
      { name: "By Category", value: catLines, inline: true },
      { name: "By Difficulty", value: diffLines, inline: true },
    ],
    footer: { text: "Discord Badge Bot" },
  };
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
];
