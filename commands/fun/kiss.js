import { ApplicationCommandOptionType } from "discord.js";
import client from "nekos.life";
import { embedErrorChannel } from "../../helpers/errorEmbed.js";

const neko = new client();
export default {
  cooldown: 5,
  data: {
    name: "kiss",
    description: "Permet d'embrasser un utilisateur",
    options: [
      {
        name: "membre",
        description: "A qui voulez-vous faire un bisous ?",
        type: ApplicationCommandOptionType.User,
      },
    ],
  },

  async execute(interaction) {
    const user = interaction.options.getUser("membre");
    const { url } = await neko.kiss();
    try {
      if (!user || interaction.user === user) {
        await interaction.deferReply();
        const kiss = {
          color: 0x059669,
          title: `${interaction.client.user.username} embrasse ${interaction.user.username}`,
          image: {
            url,
          },
          timestamp: new Date().toISOString(),
        };

        await interaction.deleteReply();

        return await interaction.channel.send({
          content: `${interaction.user}`,
          embeds: [kiss],
        });
      }
      await interaction.deferReply();
      const kissMember = {
        color: 0x059669,
        title: `${interaction.user.username} embrasse ${user.username}`,
        image: {
          url,
        },
        timestamp: new Date().toISOString(),
      };
      await interaction.deleteReply();
      return await interaction.channel.send({
        content: `${user}`,
        embeds: [kissMember],
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
