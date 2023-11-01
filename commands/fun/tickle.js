import { ApplicationCommandOptionType } from "discord.js";
import client from "nekos.life";
import { embedErrorChannel } from "../../helpers/errorEmbed.js";

const neko = new client();
export default {
  cooldown: 5,
  data: {
    name: "tickle",
    description: "Permet de faire des chatouilles à un utilisateur",
    options: [
      {
        name: "membre",
        description:
          "De quel utilisateur souhaitez vous lui faire des chatouilles ?",
        type: ApplicationCommandOptionType.User,
      },
    ],
  },

  async execute(interaction) {
    const user = interaction.options.getUser("membre");
    const { url } = await neko.tickle();
    try {
      if (!user || interaction.user === user) {
        await interaction.deferReply();
        const tickle = {
          color: 0x059669,
          title: `${interaction.client.user.username} fait des chatouilles à ${interaction.user.username}`,
          image: {
            url,
          },
          timestamp: new Date().toISOString(),
        };

        await interaction.deleteReply();

        return await interaction.channel.send({
          content: `${interaction.user}`,
          embeds: [tickle],
        });
      }
      await interaction.deferReply();
      const tickleMember = {
        color: 0x059669,
        title: `${interaction.user.username} fait des chatouilles à ${user.username}`,
        image: {
          url,
        },
        timestamp: new Date().toISOString(),
      };
      await interaction.deleteReply();
      return await interaction.channel.send({
        content: `${user}`,
        embeds: [tickleMember],
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
