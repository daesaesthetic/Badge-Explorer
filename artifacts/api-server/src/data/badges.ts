export interface BadgeGuideStep {
  step: number;
  description: string;
  url: string | null;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  category: string;
  rarity: string;
  obtainable: boolean;
  difficulty: string;
  timeEstimate: string | null;
  color: string;
  guide: BadgeGuideStep[];
  consoleCommand: string | null;
  consoleCommandLabel: string | null;
  tips: string | null;
}

export const BADGES: Badge[] = [
  // ──────────────────────────────────────────────
  // HYPESQUAD
  // ──────────────────────────────────────────────
  {
    id: "hypesquad-bravery",
    name: "HypeSquad Bravery",
    description: "Member of HypeSquad House Bravery — confidence, creativity, and originality.",
    category: "hypesquad",
    rarity: "common",
    obtainable: true,
    difficulty: "instant",
    timeEstimate: "2 minutes",
    color: "#9c84ef",
    guide: [
      { step: 1, description: "Open Discord and go to User Settings (gear icon near your username).", url: null },
      { step: 2, description: "Click 'My Account', then scroll down to find 'HypeSquad Houses'.", url: null },
      { step: 3, description: "Click 'Join a House' and select House Bravery.", url: null },
      { step: 4, description: "Confirm your choice. The badge will appear on your profile immediately.", url: null },
    ],
    consoleCommand: `// Run in Discord's browser Developer Console (F12 > Console)\n// Gets your token and sets HypeSquad house to Bravery (house_id: 1)\n(async () => {\n  let token = null;\n  window.webpackChunkdiscord_app.push([[Symbol()], {}, req => {\n    for (const m of Object.values(req.c)) {\n      const e = m?.exports;\n      if (e?.default?.getToken) { token = e.default.getToken(); break; }\n    }\n  }]);\n  if (!token) return console.error('Could not extract token');\n  const r = await fetch('/api/v9/hypesquad/online', {\n    method: 'POST',\n    headers: { 'Authorization': token, 'Content-Type': 'application/json' },\n    body: JSON.stringify({ house_id: 1 }) // 1=Bravery, 2=Brilliance, 3=Balance\n  });\n  console.log(r.ok ? 'HypeSquad house set to Bravery!' : 'Failed: ' + r.status);\n})();`,
    consoleCommandLabel: "Set HypeSquad house to Bravery via Discord API",
    tips: "You can switch houses at any time from Settings > My Account > HypeSquad Houses. The badge updates instantly.",
  },
  {
    id: "hypesquad-brilliance",
    name: "HypeSquad Brilliance",
    description: "Member of HypeSquad House Brilliance — wit, cleverness, and curiosity.",
    category: "hypesquad",
    rarity: "common",
    obtainable: true,
    difficulty: "instant",
    timeEstimate: "2 minutes",
    color: "#f47b67",
    guide: [
      { step: 1, description: "Open Discord and go to User Settings (gear icon near your username).", url: null },
      { step: 2, description: "Click 'My Account', then scroll down to find 'HypeSquad Houses'.", url: null },
      { step: 3, description: "Click 'Join a House' and select House Brilliance.", url: null },
      { step: 4, description: "Confirm your choice. The badge will appear on your profile immediately.", url: null },
    ],
    consoleCommand: `// Run in Discord's browser Developer Console (F12 > Console)\n// Sets HypeSquad house to Brilliance (house_id: 2)\n(async () => {\n  let token = null;\n  window.webpackChunkdiscord_app.push([[Symbol()], {}, req => {\n    for (const m of Object.values(req.c)) {\n      const e = m?.exports;\n      if (e?.default?.getToken) { token = e.default.getToken(); break; }\n    }\n  }]);\n  if (!token) return console.error('Could not extract token');\n  const r = await fetch('/api/v9/hypesquad/online', {\n    method: 'POST',\n    headers: { 'Authorization': token, 'Content-Type': 'application/json' },\n    body: JSON.stringify({ house_id: 2 }) // 1=Bravery, 2=Brilliance, 3=Balance\n  });\n  console.log(r.ok ? 'HypeSquad house set to Brilliance!' : 'Failed: ' + r.status);\n})();`,
    consoleCommandLabel: "Set HypeSquad house to Brilliance via Discord API",
    tips: "House Brilliance is known for its fiery orange badge. Switching houses is free and instant — no cooldown.",
  },
  {
    id: "hypesquad-balance",
    name: "HypeSquad Balance",
    description: "Member of HypeSquad House Balance — flexibility, fairness, and adaptability.",
    category: "hypesquad",
    rarity: "common",
    obtainable: true,
    difficulty: "instant",
    timeEstimate: "2 minutes",
    color: "#45ddc0",
    guide: [
      { step: 1, description: "Open Discord and go to User Settings (gear icon near your username).", url: null },
      { step: 2, description: "Click 'My Account', then scroll down to find 'HypeSquad Houses'.", url: null },
      { step: 3, description: "Click 'Join a House' and select House Balance.", url: null },
      { step: 4, description: "Confirm your choice. The badge will appear on your profile immediately.", url: null },
    ],
    consoleCommand: `// Run in Discord's browser Developer Console (F12 > Console)\n// Sets HypeSquad house to Balance (house_id: 3)\n(async () => {\n  let token = null;\n  window.webpackChunkdiscord_app.push([[Symbol()], {}, req => {\n    for (const m of Object.values(req.c)) {\n      const e = m?.exports;\n      if (e?.default?.getToken) { token = e.default.getToken(); break; }\n    }\n  }]);\n  if (!token) return console.error('Could not extract token');\n  const r = await fetch('/api/v9/hypesquad/online', {\n    method: 'POST',\n    headers: { 'Authorization': token, 'Content-Type': 'application/json' },\n    body: JSON.stringify({ house_id: 3 }) // 1=Bravery, 2=Brilliance, 3=Balance\n  });\n  console.log(r.ok ? 'HypeSquad house set to Balance!' : 'Failed: ' + r.status);\n})();`,
    consoleCommandLabel: "Set HypeSquad house to Balance via Discord API",
    tips: "House Balance has a distinctive teal badge. You can only be in one house at a time.",
  },
  {
    id: "hypesquad-events",
    name: "HypeSquad Events",
    description: "Attended or participated in a HypeSquad event. Awarded by Discord staff.",
    category: "hypesquad",
    rarity: "rare",
    obtainable: true,
    difficulty: "hard",
    timeEstimate: "Varies by event",
    color: "#f47b67",
    guide: [
      { step: 1, description: "Monitor Discord's official Twitter/X (@discord) and blog for HypeSquad event announcements.", url: "https://discord.com/blog" },
      { step: 2, description: "Apply when applications open — Discord rarely publicizes exact dates, so following their channels is key.", url: null },
      { step: 3, description: "If selected, participate in the event (often community activities, playtesting, etc.).", url: null },
      { step: 4, description: "Badge is manually awarded by Discord staff after participation is confirmed.", url: null },
    ],
    consoleCommand: null,
    consoleCommandLabel: null,
    tips: "HypeSquad Events applications open infrequently and unpredictably. Keep an eye on Discord's social channels. This badge cannot be self-obtained.",
  },

  // ──────────────────────────────────────────────
  // DEVELOPER
  // ──────────────────────────────────────────────
  {
    id: "active-developer",
    name: "Active Developer",
    description: "Awarded to developers who have registered an application and used a slash command within the past 30 days.",
    category: "developer",
    rarity: "common",
    obtainable: true,
    difficulty: "easy",
    timeEstimate: "15–30 minutes",
    color: "#23a55a",
    guide: [
      { step: 1, description: "Go to the Discord Developer Portal and create a new Application.", url: "https://discord.com/developers/applications" },
      { step: 2, description: "Under 'Bot', click 'Add Bot' to create a bot user for your application.", url: null },
      { step: 3, description: "Under 'OAuth2 > URL Generator', select 'bot' and 'applications.commands' scopes, then invite your bot to a server you own or manage.", url: null },
      { step: 4, description: "Register a global slash command for your bot. The simplest way is to use the Discord API directly or use a quick Node.js/Python script.", url: "https://discord.com/developers/docs/interactions/application-commands" },
      { step: 5, description: "Use the slash command at least once in any server where the bot is present.", url: null },
      { step: 6, description: "After the command is used, wait up to 24 hours then visit discord.com/developers/active-developer to claim the badge.", url: "https://discord.com/developers/active-developer" },
    ],
    consoleCommand: `// Quickly register a minimal global slash command for your bot.\n// Run this in Node.js (replace BOT_TOKEN and APPLICATION_ID).\n// Not a browser console command — run this as a script.\n/*\nconst BOT_TOKEN = 'YOUR_BOT_TOKEN';\nconst APPLICATION_ID = 'YOUR_APP_ID';\nfetch(\`https://discord.com/api/v10/applications/\${APPLICATION_ID}/commands\`, {\n  method: 'POST',\n  headers: { Authorization: \`Bot \${BOT_TOKEN}\`, 'Content-Type': 'application/json' },\n  body: JSON.stringify({ name: 'ping', description: 'Replies with Pong!' })\n}).then(r => r.json()).then(console.log);\n*/`,
    consoleCommandLabel: "Register a minimal /ping slash command via REST (Node.js script)",
    tips: "You must use the slash command AFTER registering it and after your bot is in a server. The badge claim page at discord.com/developers/active-developer only appears after the activity is recorded. Re-use the command monthly to keep the badge.",
  },
  {
    id: "early-verified-bot-developer",
    name: "Early Verified Bot Developer",
    description: "Awarded to developers who had a verified bot (100+ servers) before the program closed in 2022.",
    category: "developer",
    rarity: "very_rare",
    obtainable: false,
    difficulty: "unobtainable",
    timeEstimate: null,
    color: "#5865f2",
    guide: [
      { step: 1, description: "This badge is no longer obtainable. It was awarded to bot developers whose bots reached 100+ servers before Discord closed the Verified Bot Developer program in 2022.", url: null },
      { step: 2, description: "If you were eligible and missed it, the badge cannot be retroactively claimed.", url: null },
    ],
    consoleCommand: null,
    consoleCommandLabel: null,
    tips: "The Active Developer badge is the current alternative for developers. While it is less rare, it is obtainable today.",
  },

  // ──────────────────────────────────────────────
  // BUG HUNTER
  // ──────────────────────────────────────────────
  {
    id: "bug-hunter-level-1",
    name: "Bug Hunter Level 1",
    description: "Awarded to users who have submitted a significant number of valid bug reports through Discord's bug reporting process.",
    category: "special",
    rarity: "rare",
    obtainable: true,
    difficulty: "hard",
    timeEstimate: "Weeks to months",
    color: "#23a55a",
    guide: [
      { step: 1, description: "Join the official Discord Testers server to learn the bug reporting process.", url: "https://discord.gg/discord-testers" },
      { step: 2, description: "Read the pinned rules and bug report format carefully — improperly formatted reports are rejected.", url: null },
      { step: 3, description: "Find and reproduce genuine bugs in Discord. Reports must be reproducible and not already known.", url: null },
      { step: 4, description: "Submit your report in the appropriate bug report channel using the required template.", url: null },
      { step: 5, description: "After enough valid, approved reports (the exact threshold is not public), Discord staff will award Level 1.", url: null },
    ],
    consoleCommand: null,
    consoleCommandLabel: null,
    tips: "Quality over quantity. Discord staff manually review reports. Duplicate reports or vague submissions can hurt your standing. Focus on well-documented, reproducible bugs.",
  },
  {
    id: "bug-hunter-level-2",
    name: "Bug Hunter Level 2 (Gold)",
    description: "Awarded to elite bug hunters who have found critical or high-severity bugs. The rarest earnable badge.",
    category: "special",
    rarity: "very_rare",
    obtainable: true,
    difficulty: "hard",
    timeEstimate: "Months to years",
    color: "#f0b132",
    guide: [
      { step: 1, description: "First obtain Bug Hunter Level 1 (see that badge's guide).", url: null },
      { step: 2, description: "Continue submitting high-quality reports, focusing on critical severity bugs.", url: null },
      { step: 3, description: "Level 2 is awarded at Discord staff's discretion for exceptional contributions — there is no fixed threshold.", url: null },
      { step: 4, description: "Some reports leading to Level 2 involve security-adjacent or deeply impactful client bugs.", url: null },
    ],
    consoleCommand: null,
    consoleCommandLabel: null,
    tips: "This is one of the rarest obtainable badges on Discord. Only a small number of users worldwide have it. Persistence and deep technical knowledge of Discord's client are key.",
  },

  // ──────────────────────────────────────────────
  // NITRO & BOOSTER
  // ──────────────────────────────────────────────
  {
    id: "nitro",
    name: "Discord Nitro",
    description: "Shown on profiles of active Discord Nitro subscribers. Disappears if subscription lapses.",
    category: "nitro",
    rarity: "uncommon",
    obtainable: true,
    difficulty: "easy",
    timeEstimate: "Immediate upon subscription",
    color: "#5865f2",
    guide: [
      { step: 1, description: "Go to User Settings > Nitro and choose a Nitro plan (Basic or Nitro).", url: "https://discord.com/nitro" },
      { step: 2, description: "Complete the payment. The badge appears on your profile immediately.", url: null },
      { step: 3, description: "The badge remains visible as long as your subscription is active.", url: null },
    ],
    consoleCommand: null,
    consoleCommandLabel: null,
    tips: "The Nitro badge style changes based on how long you have been subscribed consecutively. Longer streaks show a more elaborate badge. Cancelling and resubscribing resets the streak.",
  },
  {
    id: "server-booster",
    name: "Server Booster",
    description: "Shown when you are actively boosting a server. Tier reflects consecutive months of boosting.",
    category: "booster",
    rarity: "common",
    obtainable: true,
    difficulty: "easy",
    timeEstimate: "Immediate upon boosting",
    color: "#ff73fa",
    guide: [
      { step: 1, description: "You need an active Discord Nitro subscription (Nitro or Nitro Basic) to boost servers.", url: null },
      { step: 2, description: "Go to a server and click the server name at the top to open Server Settings.", url: null },
      { step: 3, description: "Select 'Server Boost' and confirm. The badge appears on your profile immediately.", url: null },
      { step: 4, description: "The badge tier increments each month you continuously boost the same server.", url: null },
    ],
    consoleCommand: null,
    consoleCommandLabel: null,
    tips: "The booster badge on your profile reflects the server with your longest active boost streak. Boosting multiple servers shows the highest tier. Stopping your boost resets the streak.",
  },

  // ──────────────────────────────────────────────
  // STAFF / SPECIAL
  // ──────────────────────────────────────────────
  {
    id: "discord-staff",
    name: "Discord Staff",
    description: "Reserved exclusively for Discord employees. Cannot be obtained by regular users.",
    category: "staff",
    rarity: "legendary",
    obtainable: false,
    difficulty: "unobtainable",
    timeEstimate: null,
    color: "#5865f2",
    guide: [
      { step: 1, description: "This badge is awarded only to Discord employees. It cannot be obtained through any user-facing action.", url: null },
      { step: 2, description: "The only path is to be hired by Discord, Inc.", url: "https://discord.com/jobs" },
    ],
    consoleCommand: null,
    consoleCommandLabel: null,
    tips: "Faking or spoofing this badge on unofficial clients is a ToS violation. No workaround exists.",
  },
  {
    id: "discord-partner",
    name: "Discord Partner",
    description: "Awarded to server owners of large, high-quality servers that have been accepted into the Discord Partner Program.",
    category: "staff",
    rarity: "legendary",
    obtainable: true,
    difficulty: "hard",
    timeEstimate: "Months (application + review)",
    color: "#5865f2",
    guide: [
      { step: 1, description: "Your server must be well-established with strong community activity and healthy moderation.", url: null },
      { step: 2, description: "Navigate to Server Settings > Partner Program (or find the application link) and submit an application.", url: "https://discord.com/partners" },
      { step: 3, description: "Discord reviews applications manually. Requirements include a minimum member count (typically 1,000+), good standing, and a quality community.", url: null },
      { step: 4, description: "If accepted, the badge is awarded to the server owner's account. It does not transfer if you lose ownership.", url: null },
    ],
    consoleCommand: null,
    consoleCommandLabel: null,
    tips: "Partner badge is tied to the server owner role. The exact threshold is not public but partner servers are typically large, active, and established. Discord has slowed new partnerships in recent years.",
  },
  {
    id: "moderator-programs-alumni",
    name: "Moderator Programs Alumni",
    description: "Awarded to alumni of Discord's Moderator Programs (Discord Moderator Academy). Program is now closed.",
    category: "legacy",
    rarity: "very_rare",
    obtainable: false,
    difficulty: "unobtainable",
    timeEstimate: null,
    color: "#5865f2",
    guide: [
      { step: 1, description: "The Discord Moderator Academy (DMA) program was discontinued. No new alumni badges are being issued.", url: null },
      { step: 2, description: "Existing alumni who completed the program retain their badge.", url: null },
    ],
    consoleCommand: null,
    consoleCommandLabel: null,
    tips: "This badge is no longer obtainable. It was given to moderators who completed Discord's official moderation training courses.",
  },

  // ──────────────────────────────────────────────
  // LEGACY
  // ──────────────────────────────────────────────
  {
    id: "early-supporter",
    name: "Early Supporter",
    description: "Awarded to users who purchased Discord Nitro before October 10, 2018. One of the rarest legacy badges.",
    category: "legacy",
    rarity: "legendary",
    obtainable: false,
    difficulty: "unobtainable",
    timeEstimate: null,
    color: "#f47b67",
    guide: [
      { step: 1, description: "This badge was awarded to users who supported Discord by buying Nitro before October 10, 2018.", url: null },
      { step: 2, description: "It is no longer possible to obtain. The window permanently closed in 2018.", url: null },
    ],
    consoleCommand: null,
    consoleCommandLabel: null,
    tips: "Early Supporter is widely considered the most prestigious non-staff badge due to its age and permanent unobtainability. Accounts with this badge predate much of Discord's current user base.",
  },
  {
    id: "legacy-username",
    name: "Legacy Username",
    description: "Awarded to users who had a discriminator (#XXXX) username before Discord migrated to the new unique username system in 2023.",
    category: "legacy",
    rarity: "uncommon",
    obtainable: false,
    difficulty: "unobtainable",
    timeEstimate: null,
    color: "#b5bac1",
    guide: [
      { step: 1, description: "This badge was automatically awarded when Discord migrated from discriminator usernames to unique handles in 2023.", url: null },
      { step: 2, description: "Any account that existed and had a discriminator before the migration received this badge automatically.", url: null },
      { step: 3, description: "New accounts created after the migration cannot obtain it.", url: null },
    ],
    consoleCommand: null,
    consoleCommandLabel: null,
    tips: "While not the rarest badge, it serves as a timestamp — any account with it has been on Discord since before mid-2023.",
  },
  {
    id: "quest-completed",
    name: "Quest Completed",
    description: "Awarded to users who complete a Discord Quest — limited-time promotional activities often tied to game releases or partnerships.",
    category: "special",
    rarity: "uncommon",
    obtainable: true,
    difficulty: "easy",
    timeEstimate: "30 minutes to a few hours (per quest)",
    color: "#f0b132",
    guide: [
      { step: 1, description: "Watch for Quest notifications in Discord — they appear as a gift icon in the top bar or in User Settings > Quests.", url: null },
      { step: 2, description: "Quests typically require streaming a specific game on Discord for a set amount of time, or watching a stream.", url: null },
      { step: 3, description: "Complete the required activity within the quest window. The badge or reward is granted automatically.", url: null },
      { step: 4, description: "New quests rotate regularly with game launches and partnerships — check frequently.", url: null },
    ],
    consoleCommand: null,
    consoleCommandLabel: null,
    tips: "Discord Quests are time-limited. Missing a quest means missing that specific reward. Follow Discord's official announcements to catch new quests early.",
  },
];

export function getBadgeById(id: string): Badge | undefined {
  return BADGES.find((b) => b.id === id);
}

export function searchBadges(params: {
  q?: string;
  category?: string;
  obtainable?: string;
  difficulty?: string;
}): Badge[] {
  let results = [...BADGES];

  if (params.q) {
    const query = params.q.toLowerCase();
    results = results.filter(
      (b) =>
        b.name.toLowerCase().includes(query) ||
        b.description.toLowerCase().includes(query) ||
        b.category.toLowerCase().includes(query),
    );
  }

  if (params.category) {
    results = results.filter((b) => b.category === params.category);
  }

  if (params.obtainable !== undefined) {
    const val = params.obtainable === "true";
    results = results.filter((b) => b.obtainable === val);
  }

  if (params.difficulty) {
    results = results.filter((b) => b.difficulty === params.difficulty);
  }

  return results;
}

export function getCategories(): { id: string; label: string; count: number }[] {
  const labelMap: Record<string, string> = {
    hypesquad: "HypeSquad",
    developer: "Developer",
    staff: "Staff & Partner",
    nitro: "Nitro",
    booster: "Server Booster",
    special: "Special",
    legacy: "Legacy",
  };

  const counts: Record<string, number> = {};
  for (const b of BADGES) {
    counts[b.category] = (counts[b.category] ?? 0) + 1;
  }

  return Object.entries(counts).map(([id, count]) => ({
    id,
    label: labelMap[id] ?? id,
    count,
  }));
}

export function getStats() {
  const total = BADGES.length;
  const obtainable = BADGES.filter((b) => b.obtainable).length;
  const legacy = BADGES.filter((b) => !b.obtainable).length;

  const byCategory: Record<string, number> = {};
  const byDifficulty: Record<string, number> = {};

  for (const b of BADGES) {
    byCategory[b.category] = (byCategory[b.category] ?? 0) + 1;
    byDifficulty[b.difficulty] = (byDifficulty[b.difficulty] ?? 0) + 1;
  }

  return { total, obtainable, legacy, byCategory, byDifficulty };
}
