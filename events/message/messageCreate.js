import { Events } from "discord.js";
import { detectMessage } from "../../helpers/detectMessage.js";

export default {
  name: Events.MessageCreate,
  on: true,
  async execute(message) {
    if (message.author.bot) {
      return;
    }
    detectMessage(message);
  },
};
