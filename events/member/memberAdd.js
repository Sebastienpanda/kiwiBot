import { Events } from "discord.js";

import { welcome } from "../../helpers/welcome.js";
import { detectMessage } from "../../helpers/detectMessage.js";

export default {
  name: Events.GuildMemberAdd,
  on: true,
  async execute(member) {
    try {
      const roleArrayId = ["1145780536737009694"];

      await member.roles.add(roleArrayId);

      await welcome(member);
    } catch (error) {
      const embedError = {
        color: 0xed4245,
        title: "Une erreur s'est produite",
        description: error.message,
        timestamp: new Date().toISOString(),
        footer: {
          text: `${member.client.user.username} à rencontré une erreur`,
          icon_url: `${member.client.user.displayAvatarURL()}`,
        },
      };
      return await member.send({
        embeds: [embedError],
      });
    }
  },
};
