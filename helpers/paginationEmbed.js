import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
} from "discord.js";

export async function buttonPages(interaction, pages, time = 60000) {
  await interaction.deferReply();

  if (pages.length === 1) {
    const page = await interaction.editReply({
      embeds: pages,
      components: [],
      fetchReply: true,
    });
    return page;
  }

  const prev = new ButtonBuilder()
    .setCustomId("prev")
    .setEmoji("◀️")
    .setStyle(ButtonStyle.Primary)
    .setDisabled(true);

  const home = new ButtonBuilder()
    .setCustomId("home")
    .setEmoji("🏠")
    .setStyle(ButtonStyle.Danger)
    .setDisabled(true);

  const next = new ButtonBuilder()
    .setCustomId("next")
    .setEmoji("▶️")
    .setStyle(ButtonStyle.Primary);

  const buttonRow = new ActionRowBuilder().addComponents(prev, home, next);
  let index = 0;

  const currentPage = await interaction.editReply({
    embeds: [pages[index]],
    components: [buttonRow],
    fetchReply: true,
  });

  const collector = await currentPage.createMessageComponentCollector({
    componentType: ComponentType.Button,
    time,
  });

  collector.on("collect", async (i) => {
    if (i.user.id !== interaction.user.id) {
      return i.reply({
        content: "Vous ne pouvez pas appuyez sur les boutons",
        ephemeral: true,
      });
    }

    await i.deferUpdate();

    if (i.customId === "prev") {
      if (index > 0) {
        index--;
      }
    } else if (i.customId === "home") {
      index = 0;
    } else if (i.customId === "next") {
      if (index < pages.length - 1) {
        index++;
      }
    }

    if (index === 0) {
      prev.setDisabled(true);
      home.setDisabled(true);
    } else {
      prev.setDisabled(false);
      home.setDisabled(false);
    }

    if (index === pages.length - 1) {
      next.setDisabled(true);
    } else {
      next.setDisabled(false);
    }

    await currentPage.edit({
      embeds: [pages[index]],
      components: [buttonRow],
    });

    collector.resetTimer();
  });

  collector.on("end", async () => {
    await currentPage.edit({
      embeds: [pages[index]],
      components: [],
    });
  });

  return currentPage;
}
