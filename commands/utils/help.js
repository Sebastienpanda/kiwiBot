import { embedError } from "../../helpers/errorEmbed.js";
import { fetchCommands } from "../../helpers/fetchCommands.js";
import { buttonPages } from "../../helpers/paginationEmbed.js";

export default {
  cooldown: 10,
  data: {
    name: "help",
    description: "Permet de voir toutes les commandes",
  },

  async execute(interaction) {
    try {
      const pageSize = 5;

      const pages = [];
      let currentPage = [];
      const commands = await fetchCommands(interaction);

      commands.forEach((command) => {
        const userField = {
          name: `</${command.name}:${command.id}>`,
          value: `${command.description}`,
        };

        currentPage.push(userField);

        if (currentPage.length === pageSize) {
          pages.push(currentPage);
          currentPage = [];
        }
      });

      if (currentPage.length > 0) {
        pages.push(currentPage);
      }

      const embedCommands = pages.map((page, index) => ({
        color: 0x0ea5e9,
        fields: page,
        timestamp: new Date().toISOString(),
        footer: {
          text: `Page ${index + 1}/${pages.length}`,
        },
      }));

      buttonPages(interaction, embedCommands);
    } catch (error) {
      embedError(interaction, "Une erreur est survenue", error.message);
    }
  },
};
