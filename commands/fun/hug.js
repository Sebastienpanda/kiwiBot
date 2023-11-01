import client from "nekos.life";
import { ApplicationCommandOptionType } from "discord.js";
import { embedErrorChannel } from "../../helpers/errorEmbed.js";

const neko = new client();
export default {
  cooldown: 5,
  data: {
    name: "hug",
    description: "Permet de faire un câlin à un utilisateur",
    options: [
      {
        name: "membre",
        description: "A qui voulez-vous donner un câlin ?",
        type: ApplicationCommandOptionType.User,
      },
    ],
  },

  async execute(interaction) {
    const user = interaction.options.getUser("membre");
    const { url } = await neko.hug();
    try {
      if (!user || interaction.user === user) {
        await interaction.deferReply();
        const hug = {
          color: 0x059669,
          title: `${interaction.client.user.username} te fait un câlin ${interaction.user.username}`,
          image: {
            url,
          },
          timestamp: new Date().toISOString(),
        };

        await interaction.deleteReply();

        return await interaction.channel.send({
          content: `${interaction.user}`,
          embeds: [hug],
        });
      }
      await interaction.deferReply();
      const hugMember = {
        color: 0x059669,
        title: `${interaction.user.username} fait un hug à ${user.username}`,
        image: {
          url,
        },
        timestamp: new Date().toISOString(),
      };
      await interaction.deleteReply();
      return await interaction.channel.send({
        content: `${user}`,
        embeds: [hugMember],
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
