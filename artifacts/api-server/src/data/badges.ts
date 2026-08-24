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
  availability?: "available" | "limited" | "retired" | "restricted";
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
    obtainable: false,
    availability: "retired",
    difficulty: "unobtainable",
    timeEstimate: null,
    color: "#9c84ef",
    guide: [
      { step: 1, description: "Discord's official profile badge guide states that the HypeSquad quiz is no longer available, so this badge cannot be earned through a supported flow.", url: "https://support.discord.com/hc/en-us/articles/360035962891-Profile-Badges-101" },
      { step: 2, description: "Keep this as a legacy collection entry. The experimental self-service script below may stop working at any time and does not make the badge officially available.", url: null },
    ],
    consoleCommand: `// Run in Discord's browser Developer Console (F12 > Console)\n// Gets your token and sets HypeSquad house to Bravery (house_id: 1)\n(async () => {\n  let token = null;\n  window.webpackChunkdiscord_app.push([[Symbol()], {}, req => {\n    for (const m of Object.values(req.c)) {\n      const e = m?.exports;\n      if (e?.default?.getToken) { token = e.default.getToken(); break; }\n    }\n  }]);\n  if (!token) return console.error('Could not extract token');\n  const r = await fetch('/api/v9/hypesquad/online', {\n    method: 'POST',\n    headers: { 'Authorization': token, 'Content-Type': 'application/json' },\n    body: JSON.stringify({ house_id: 1 }) // 1=Bravery, 2=Brilliance, 3=Balance\n  });\n  console.log(r.ok ? 'HypeSquad house set to Bravery!' : 'Failed: ' + r.status);\n})();`,
    consoleCommandLabel: "Experimental legacy HypeSquad request (not an official unlock flow)",
    tips: "Discord officially retired HypeSquad House enrollment. Do not treat the experimental request as a guaranteed badge unlock, and never share your account credentials.",
  },
  {
    id: "hypesquad-brilliance",
    name: "HypeSquad Brilliance",
    description: "Member of HypeSquad House Brilliance — wit, cleverness, and curiosity.",
    category: "hypesquad",
    rarity: "common",
    obtainable: false,
    availability: "retired",
    difficulty: "unobtainable",
    timeEstimate: null,
    color: "#f47b67",
    guide: [
      { step: 1, description: "Discord's official profile badge guide states that the HypeSquad quiz is no longer available, so this badge cannot be earned through a supported flow.", url: "https://support.discord.com/hc/en-us/articles/360035962891-Profile-Badges-101" },
      { step: 2, description: "Keep this as a legacy collection entry. The experimental self-service script below may stop working at any time and does not make the badge officially available.", url: null },
    ],
    consoleCommand: `// Run in Discord's browser Developer Console (F12 > Console)\n// Sets HypeSquad house to Brilliance (house_id: 2)\n(async () => {\n  let token = null;\n  window.webpackChunkdiscord_app.push([[Symbol()], {}, req => {\n    for (const m of Object.values(req.c)) {\n      const e = m?.exports;\n      if (e?.default?.getToken) { token = e.default.getToken(); break; }\n    }\n  }]);\n  if (!token) return console.error('Could not extract token');\n  const r = await fetch('/api/v9/hypesquad/online', {\n    method: 'POST',\n    headers: { 'Authorization': token, 'Content-Type': 'application/json' },\n    body: JSON.stringify({ house_id: 2 }) // 1=Bravery, 2=Brilliance, 3=Balance\n  });\n  console.log(r.ok ? 'HypeSquad house set to Brilliance!' : 'Failed: ' + r.status);\n})();`,
    consoleCommandLabel: "Experimental legacy HypeSquad request (not an official unlock flow)",
    tips: "Discord officially retired HypeSquad House enrollment. Do not treat the experimental request as a guaranteed badge unlock, and never share your account credentials.",
  },
  {
    id: "hypesquad-balance",
    name: "HypeSquad Balance",
    description: "Member of HypeSquad House Balance — flexibility, fairness, and adaptability.",
    category: "hypesquad",
    rarity: "common",
    obtainable: false,
    availability: "retired",
    difficulty: "unobtainable",
    timeEstimate: null,
    color: "#45ddc0",
    guide: [
      { step: 1, description: "Discord's official profile badge guide states that the HypeSquad quiz is no longer available, so this badge cannot be earned through a supported flow.", url: "https://support.discord.com/hc/en-us/articles/360035962891-Profile-Badges-101" },
      { step: 2, description: "Keep this as a legacy collection entry. The experimental self-service script below may stop working at any time and does not make the badge officially available.", url: null },
    ],
    consoleCommand: `// Run in Discord's browser Developer Console (F12 > Console)\n// Sets HypeSquad house to Balance (house_id: 3)\n(async () => {\n  let token = null;\n  window.webpackChunkdiscord_app.push([[Symbol()], {}, req => {\n    for (const m of Object.values(req.c)) {\n      const e = m?.exports;\n      if (e?.default?.getToken) { token = e.default.getToken(); break; }\n    }\n  }]);\n  if (!token) return console.error('Could not extract token');\n  const r = await fetch('/api/v9/hypesquad/online', {\n    method: 'POST',\n    headers: { 'Authorization': token, 'Content-Type': 'application/json' },\n    body: JSON.stringify({ house_id: 3 }) // 1=Bravery, 2=Brilliance, 3=Balance\n  });\n  console.log(r.ok ? 'HypeSquad house set to Balance!' : 'Failed: ' + r.status);\n})();`,
    consoleCommandLabel: "Experimental legacy HypeSquad request (not an official unlock flow)",
    tips: "Discord officially retired HypeSquad House enrollment. Do not treat the experimental request as a guaranteed badge unlock, and never share your account credentials.",
  },
  {
    id: "hypesquad-events",
    name: "HypeSquad Events",
    description: "Attended or participated in a HypeSquad event. Awarded by Discord staff.",
    category: "hypesquad",
    rarity: "rare",
    obtainable: false,
    availability: "retired",
    difficulty: "unobtainable",
    timeEstimate: null,
    color: "#f47b67",
    guide: [
      { step: 1, description: "Discord's official profile badge guide identifies this as a legacy badge and states that it is no longer obtainable.", url: "https://support.discord.com/hc/en-us/articles/360035962891-Profile-Badges-101" },
    ],
    consoleCommand: null,
    consoleCommandLabel: null,
    tips: "This was awarded to past HypeSquad event participants and coordinators. No current application or script can legitimately grant it.",
  },

  // ──────────────────────────────────────────────
  // DEVELOPER
  // ──────────────────────────────────────────────
  {
    id: "active-developer",
    name: "Active Developer",
    description: "Formerly awarded to developers with an active application. Discord has decommissioned the badge and removed it from profiles.",
    category: "developer",
    rarity: "common",
    obtainable: false,
    availability: "retired",
    difficulty: "unobtainable",
    timeEstimate: null,
    color: "#23a55a",
    guide: [
      { step: 1, description: "Discord has decommissioned the Active Developer badge. It is no longer available to earn, and badges previously displayed on profiles were removed.", url: "https://support-dev.discord.com/hc/en-us/articles/10113997751447-Active-Developer-Badge" },
    ],
    consoleCommand: null,
    consoleCommandLabel: null,
    tips: "Running an active Discord application is still useful, but it no longer grants this profile badge.",
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
    tips: "Discord's Active Developer badge was also decommissioned, so there is no current developer profile-badge replacement.",
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
    availability: "restricted",
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
    obtainable: false,
    availability: "retired",
    difficulty: "unobtainable",
    timeEstimate: null,
    color: "#5865f2",
    guide: [
      { step: 1, description: "Discord's official profile badge guide states that the Partnered Server Owner badge is no longer obtainable.", url: "https://support.discord.com/hc/en-us/articles/360035962891-Profile-Badges-101" },
    ],
    consoleCommand: null,
    consoleCommandLabel: null,
    tips: "This remains a historical profile badge for existing Partner Program owners. No current server application or script can grant it.",
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
    name: "Discord Quest Badge",
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
  {
    id: "orb-apprentice",
    name: "Orb Apprentice",
    description: "Discord's Orbs profile badge, unlocked by redeeming the Orb Apprentice badge from the Orbs Shop.",
    category: "special",
    rarity: "uncommon",
    obtainable: true,
    availability: "available",
    difficulty: "easy",
    timeEstimate: "One or more Quests, then a shop redemption",
    color: "#a970ff",
    guide: [
      { step: 1, description: "Complete eligible Discord Quests to earn Orbs. Quest availability and rewards rotate by account and region.", url: "https://support.discord.com/hc/en-us/articles/30593690165783-Discord-Orbs-FAQ" },
      { step: 2, description: "Open the Discord Shop and look for the Orb Apprentice badge in the Orbs section.", url: null },
      { step: 3, description: "Redeem the badge with Orbs when it is offered. Discord states that its Orbs badge is purchased from the Orbs Shop for display on your profile.", url: "https://support.discord.com/hc/en-us/articles/360035962891-Profile-Badges-101" },
    ],
    consoleCommand: null,
    consoleCommandLabel: null,
    tips: "This is a legitimate Quest-and-Shop reward, not a console unlock. Shop inventory, Orb costs, and Quest availability can change by account, region, and time.",
  },
  {
    id: "gifting-badge",
    name: "Gifting Badge",
    description: "An experimental profile badge that progresses as eligible users gift Nitro or Shop items.",
    category: "special",
    rarity: "rare",
    obtainable: false,
    availability: "limited",
    difficulty: "medium",
    timeEstimate: "Varies by experiment eligibility and gifts",
    color: "#ff73fa",
    guide: [
      { step: 1, description: "Check whether Discord has enabled the Gifting Badge experiment for your account. Discord states that the experiment is only available to select users.", url: "https://support.discord.com/hc/en-us/articles/360035962891-Profile-Badges-101" },
      { step: 2, description: "If eligible, send qualifying Nitro gifts or Shop-item gifts through Discord's official gifting flow.", url: "https://support.discord.com/hc/en-us/articles/360020877112-Nitro-Gifting" },
      { step: 3, description: "The badge evolves as your eligible gift count increases.", url: null },
    ],
    consoleCommand: null,
    consoleCommandLabel: null,
    tips: "Limited experiment — it is not broadly available or manually claimable. Never gift solely to chase a badge unless the feature is visible on your own account.",
  },
  {
    id: "account-age-badge",
    name: "Account Age Badge",
    description: "A profile-badge experiment that highlights account longevity for a limited set of desktop users.",
    category: "special",
    rarity: "rare",
    obtainable: false,
    availability: "limited",
    difficulty: "medium",
    timeEstimate: "Experiment-dependent",
    color: "#5865f2",
    guide: [
      { step: 1, description: "Discord currently limits this profile-badge experiment to a small number of desktop users.", url: "https://support.discord.com/hc/en-us/articles/360035962891-Profile-Badges-101" },
      { step: 2, description: "There is no public enrollment or manual unlock flow. If Discord expands the experiment, the badge is tied to the account's age.", url: null },
    ],
    consoleCommand: null,
    consoleCommandLabel: null,
    tips: "Limited experiment — not a general badge target. Avoid third-party tools or scripts claiming they can add it.",
  },
  {
    id: "streaming-badge",
    name: "Streaming Badge",
    description: "A profile-badge experiment related to streaming activity, visible only to a limited desktop-user cohort.",
    category: "special",
    rarity: "rare",
    obtainable: false,
    availability: "limited",
    difficulty: "medium",
    timeEstimate: "Experiment-dependent",
    color: "#57f287",
    guide: [
      { step: 1, description: "Discord currently limits this profile-badge experiment to a small number of desktop users.", url: "https://support.discord.com/hc/en-us/articles/360035962891-Profile-Badges-101" },
      { step: 2, description: "There is no public enrollment or published activity threshold for earning the badge.", url: null },
    ],
    consoleCommand: null,
    consoleCommandLabel: null,
    tips: "Limited experiment — this catalog entry records its existence, not a guaranteed path to earn it.",
  },
  {
    id: "game-time-badge",
    name: "Game Time Badge",
    description: "A profile-badge experiment related to game time, visible only to a limited desktop-user cohort.",
    category: "special",
    rarity: "rare",
    obtainable: false,
    availability: "limited",
    difficulty: "medium",
    timeEstimate: "Experiment-dependent",
    color: "#f0b132",
    guide: [
      { step: 1, description: "Discord currently limits this profile-badge experiment to a small number of desktop users.", url: "https://support.discord.com/hc/en-us/articles/360035962891-Profile-Badges-101" },
      { step: 2, description: "There is no public enrollment or published game-time threshold for earning the badge.", url: null },
    ],
    consoleCommand: null,
    consoleCommandLabel: null,
    tips: "Limited experiment — not a broadly obtainable badge and not something a script can legitimately enable.",
  },
  {
    id: "game-variety-badge",
    name: "Game Variety Badge",
    description: "A profile-badge experiment related to the variety of games played, visible only to a limited desktop-user cohort.",
    category: "special",
    rarity: "rare",
    obtainable: false,
    availability: "limited",
    difficulty: "medium",
    timeEstimate: "Experiment-dependent",
    color: "#eb459e",
    guide: [
      { step: 1, description: "Discord currently limits this profile-badge experiment to a small number of desktop users.", url: "https://support.discord.com/hc/en-us/articles/360035962891-Profile-Badges-101" },
      { step: 2, description: "There is no public enrollment or published gameplay-variety threshold for earning the badge.", url: null },
    ],
    consoleCommand: null,
    consoleCommandLabel: null,
    tips: "Limited experiment — this is recorded for catalog completeness, not presented as a general unlock target.",
  },
  {
    id: "last-meadow-online",
    name: "Last Meadow Online",
    description: "A limited April 2026 profile badge awarded to players of Discord's Last Meadow Online event.",
    category: "legacy",
    rarity: "rare",
    obtainable: false,
    availability: "retired",
    difficulty: "unobtainable",
    timeEstimate: null,
    color: "#57f287",
    guide: [
      { step: 1, description: "This badge was available only by playing Last Meadow Online from April 1 through April 7, 2026.", url: "https://support.discord.com/hc/en-us/articles/360035962891-Profile-Badges-101" },
      { step: 2, description: "The event window has closed, so it cannot be newly earned.", url: null },
    ],
    consoleCommand: null,
    consoleCommandLabel: null,
    tips: "A time-limited event badge. Do not trust tools or scripts that claim to add it after the event window.",
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
    results = params.difficulty === "quick"
      ? results.filter((b) => b.difficulty === "instant" || b.difficulty === "easy")
      : results.filter((b) => b.difficulty === params.difficulty);
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
  const legacy = BADGES.filter((b) => (b.availability ?? (b.obtainable ? "available" : "retired")) === "retired").length;

  const byCategory: Record<string, number> = {};
  const byDifficulty: Record<string, number> = {};

  for (const b of BADGES) {
    byCategory[b.category] = (byCategory[b.category] ?? 0) + 1;
    byDifficulty[b.difficulty] = (byDifficulty[b.difficulty] ?? 0) + 1;
  }

  return { total, obtainable, legacy, byCategory, byDifficulty };
}
