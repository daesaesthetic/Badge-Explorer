import {
  Client,
  GatewayIntentBits,
  InteractionType,
  REST,
  Routes,
} from "discord.js";
import { logger } from "../lib/logger";
import {
  buildBadgeEmbed,
  buildBadgeListEmbed,
  buildConsoleEmbed,
  buildStatsEmbed,
  buildChecklistEmbed,
  buildProfileEmbed,
  buildHuntPlanEmbed,
  buildRandomBadgeEmbed,
  getRarestBadges,
  SLASH_COMMANDS,
} from "./commands";
import { BADGES, searchBadges, getBadgeById } from "../data/badges";
import {
  getOwnedBadges,
  markBadgeOwned,
  unmarkBadgeOwned,
  resetOwnedBadges,
} from "./collection-store";

export async function registerCommands(): Promise<void> {
  const token = process.env.DISCORD_BOT_TOKEN;
  const clientId = process.env.DISCORD_CLIENT_ID;

  if (!token || !clientId) {
    logger.warn("DISCORD_BOT_TOKEN or DISCORD_CLIENT_ID not set — skipping command registration");
    return;
  }

  const rest = new REST({ version: "10" }).setToken(token);
  try {
    logger.info("Registering slash commands...");
    await rest.put(Routes.applicationCommands(clientId), {
      body: SLASH_COMMANDS,
    });
    logger.info("Slash commands registered successfully");
  } catch (err) {
    logger.error({ err }, "Failed to register slash commands");
  }
}

export function startBot(): void {
  const token = process.env.DISCORD_BOT_TOKEN;

  if (!token) {
    logger.warn("DISCORD_BOT_TOKEN not set — Discord bot will not start");
    return;
  }

  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
  });

  client.once("clientReady", () => {
    logger.info({ tag: client.user?.tag }, "Discord bot logged in");
  });

  client.on("interactionCreate", async (interaction) => {
    if (interaction.type !== InteractionType.ApplicationCommand) return;
    if (!interaction.isChatInputCommand()) return;

    let sub = "profile";

    try {
      const { commandName } = interaction;
      if (commandName === "profile") {
        const target = interaction.options.getUser("user") ?? interaction.user;
        const owned = await getOwnedBadges(target.id);
        await interaction.reply({
          embeds: [
            buildProfileEmbed(
              target.globalName ?? target.username,
              target.displayAvatarURL({ extension: "png", size: 128 }),
              owned,
              client.user?.displayAvatarURL({ extension: "png", size: 128 }),
            ),
          ],
          ephemeral: true,
        });
        return;
      }

      if (commandName !== "badge") return;

      sub = interaction.options.getSubcommand();

      if (sub === "stats") {
        const embed = buildStatsEmbed();
        await interaction.reply({ embeds: [embed] });
        return;
      }

      if (sub === "obtainable") {
        const results = searchBadges({ obtainable: "true" });
        const embed = buildBadgeListEmbed(
          results,
          "Obtainable Badges",
          "Every badge in the current catalog that Discord still allows users to earn.",
        );
        await interaction.reply({ embeds: [embed] });
        return;
      }

      if (sub === "quickwins") {
        const results = searchBadges({ obtainable: "true" }).filter(
          (badge) => badge.difficulty === "instant" || badge.difficulty === "easy",
        );
        const embed = buildBadgeListEmbed(
          results,
          "Quick Wins",
          "Start here if you want the most progress with the least time.",
        );
        await interaction.reply({ embeds: [embed] });
        return;
      }

      if (sub === "rarest") {
        const embed = buildBadgeListEmbed(
          getRarestBadges(),
          "Rarest Badges",
          "The hardest-to-find badges in the catalog, including legacy badges.",
        );
        await interaction.reply({ embeds: [embed] });
        return;
      }

      if (sub === "legacy") {
        const embed = buildBadgeListEmbed(
          searchBadges({ obtainable: "false" }),
          "Legacy Badges",
          "These badges are kept for collection tracking, but Discord no longer awards them.",
        );
        await interaction.reply({ embeds: [embed] });
        return;
      }

      if (sub === "random") {
        const obtainable = searchBadges({ obtainable: "true" });
        const badge = obtainable[Math.floor(Math.random() * obtainable.length)];
        if (!badge) {
          await interaction.reply({ content: "No obtainable badge targets are available right now.", ephemeral: true });
          return;
        }
        await interaction.reply({ embeds: [buildRandomBadgeEmbed(badge)] });
        return;
      }

      if (sub === "hunt") {
        await interaction.reply({ embeds: [buildHuntPlanEmbed()], ephemeral: true });
        return;
      }

      if (sub === "checklist") {
        const owned = await getOwnedBadges(interaction.user.id);
        await interaction.reply({
          embeds: [buildChecklistEmbed(owned, client.user?.displayAvatarURL({ extension: "png", size: 128 }))],
          ephemeral: true,
        });
        return;
      }

      if (sub === "own" || sub === "unown") {
        const id = interaction.options.getString("id", true);
        const badge = getBadgeById(id);
        if (!badge) {
          await interaction.reply({ content: `Badge \`${id}\` not found.`, ephemeral: true });
          return;
        }

        if (sub === "own") {
          await markBadgeOwned(interaction.user.id, id);
          await interaction.reply({
            content: `Marked **${badge.name}** as obtained. Use \`/badge checklist\` to see your progress.`,
            ephemeral: true,
          });
        } else {
          await unmarkBadgeOwned(interaction.user.id, id);
          await interaction.reply({
            content: `Removed **${badge.name}** from your checklist.`,
            ephemeral: true,
          });
        }
        return;
      }

      if (sub === "reset") {
        await resetOwnedBadges(interaction.user.id);
        await interaction.reply({
          content: "Your private badge checklist has been cleared.",
          ephemeral: true,
        });
        return;
      }

      if (sub === "search") {
        const query = interaction.options.getString("query") ?? undefined;
        const category = interaction.options.getString("category") ?? undefined;
        const obtainable = interaction.options.getBoolean("obtainable");
        const results = searchBadges({
          q: query,
          category,
          obtainable: obtainable === null ? undefined : String(obtainable),
        });

        if (results.length === 0) {
          await interaction.reply({
            content: "No badges found matching your search. Try different filters.",
            ephemeral: true,
          });
          return;
        }

        const title = query
          ? `Badge search: "${query}"`
          : category
          ? `Badges in category: ${category}`
          : "All Discord Badges";

        const embed = buildBadgeListEmbed(results, title);
        await interaction.reply({ embeds: [embed] });
        return;
      }

      if (sub === "list") {
        const category = interaction.options.getString("category") ?? undefined;
        const results = searchBadges({ category });
        const title = category
          ? `Badges: ${category.charAt(0).toUpperCase() + category.slice(1)}`
          : "All Discord Badges";
        const embed = buildBadgeListEmbed(results, title);
        await interaction.reply({ embeds: [embed] });
        return;
      }

      if (sub === "info" || sub === "guide") {
        const id = interaction.options.getString("id", true);
        const embed = buildBadgeEmbed(id);
        if (!embed) {
          await interaction.reply({ content: `Badge \`${id}\` not found.`, ephemeral: true });
          return;
        }
        await interaction.reply({ embeds: [embed] });
        return;
      }

      if (sub === "console") {
        const id = interaction.options.getString("id", true);
        const embed = buildConsoleEmbed(id);
        if (!embed) {
          await interaction.reply({
            content: `No console command available for badge \`${id}\`. Try \`/badge info ${id}\` for a step-by-step guide instead.`,
            ephemeral: true,
          });
          return;
        }
        // Send as ephemeral so the token-extracting snippet isn't shown publicly
        await interaction.reply({ embeds: [embed], ephemeral: true });
        return;
      }

      await interaction.reply({ content: "Unknown subcommand.", ephemeral: true });
    } catch (err) {
      logger.error({ err, sub }, "Error handling badge command");
      if (!interaction.replied) {
        await interaction.reply({
          content: "An error occurred processing your command.",
          ephemeral: true,
        });
      }
    }
  });

  client.login(token).catch((err) => {
    logger.error({ err }, "Failed to log in to Discord");
  });
}
