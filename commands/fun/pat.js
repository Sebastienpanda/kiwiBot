import { ApplicationCommandOptionType } from "discord.js";
import client from "nekos.life";
import { embedErrorChannel } from "../../helpers/errorEmbed.js";

const neko = new client();
export default {
  cooldown: 5,
  data: {
    name: "pat",
    description: "Permet de faire un pat pat à un utilisateur",
    options: [
      {
        name: "membre",
        description: "A qui voulez-vous faire un pat pat ?",
        type: ApplicationCommandOptionType.User,
      },
    ],
  },

  async execute(interaction) {
    const user = interaction.options.getUser("membre");
    const { url } = await neko.pat();
    try {
      if (!user || interaction.user === user) {
        await interaction.deferReply();
        const patPat = {
          color: 0x059669,
          title: `${interaction.client.user.username} fait un pat pat ${interaction.user.username}`,
          image: {
            url,
          },
          timestamp: new Date().toISOString(),
        };

        await interaction.deleteReply();

        return await interaction.channel.send({
          content: `${interaction.user}`,
          embeds: [patPat],
        });
      }
      await interaction.deferReply();
      const patMember = {
        color: 0x059669,
        title: `${interaction.user.username} fait un pat pat à ${user.username}`,
        image: {
          url,
        },
        timestamp: new Date().toISOString(),
      };
      await interaction.deleteReply();
      return await interaction.channel.send({
        content: `${user}`,
        embeds: [patMember],
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
