import { ApplicationCommandOptionType } from "discord.js";
import client from "nekos.life";
import { embedErrorChannel } from "../../helpers/errorEmbed.js";

const neko = new client();
export default {
  cooldown: 5,
  data: {
    name: "slap",
    description: "Permet de mettre une claque à un utilisateur",
    options: [
      {
        name: "membre",
        description: "A qui voulez-vous donner une claque ?",
        type: ApplicationCommandOptionType.User,
      },
    ],
  },

  async execute(interaction) {
    const user = interaction.options.getUser("membre");
    const { url } = await neko.slap();
    try {
      if (!user || interaction.user === user) {
        await interaction.deferReply();
        const slap = {
          color: 0x059669,
          title: `${interaction.client.user.username} te met une claque ${interaction.user.username}`,
          image: {
            url,
          },
          timestamp: new Date().toISOString(),
        };

        await interaction.deleteReply();

        return await interaction.channel.send({
          content: `${interaction.user}`,
          embeds: [slap],
        });
      }
      await interaction.deferReply();
      const slapMember = {
        color: 0x059669,
        title: `${interaction.user.username} te met une claque ${user.username}`,
        image: {
          url,
        },
        timestamp: new Date().toISOString(),
      };
      await interaction.deleteReply();
      return await interaction.channel.send({
        content: `${user}`,
        embeds: [slapMember],
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
