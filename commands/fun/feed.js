import { ApplicationCommandOptionType } from "discord.js";
import client from "nekos.life";
import { embedErrorChannel } from "../../helpers/errorEmbed.js";

const neko = new client();
export default {
  cooldown: 5,
  data: {
    name: "feed",
    description: "Permet de donner à manger à un utilisateur",
    options: [
      {
        name: "membre",
        description: "A qui voulez-vous donner à manger ?",
        type: ApplicationCommandOptionType.User,
      },
    ],
  },

  async execute(interaction) {
    const user = interaction.options.getUser("membre");
    const { url } = await neko.feed();
    try {
      if (!user || interaction.user === user) {
        await interaction.deferReply();
        const feed = {
          color: 0x059669,
          title: `${interaction.client.user.username} te donne à manger ${interaction.user.username}`,
          image: {
            url,
          },
          timestamp: new Date().toISOString(),
        };

        await interaction.deleteReply();

        return await interaction.channel.send({
          content: `${interaction.user}`,
          embeds: [feed],
        });
      }
      await interaction.deferReply();
      const feedMember = {
        color: 0xa96075,
        title: `${interaction.user.username} donne à manger à ${user.username}`,
        image: {
          url,
        },
        timestamp: new Date().toISOString(),
      };
      await interaction.deleteReply();
      return await interaction.channel.send({
        content: `${user}`,
        embeds: [feedMember],
      });
    } catch (error) {
      embedErrorChannel({
        interaction: interaction,
        title: "Une erreur est survenue",
        description: error.message,
      });
    }
  },
};
