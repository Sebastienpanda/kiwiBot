import { ActivityType, Client } from "discord.js";
import * as dotenv from "dotenv";
dotenv.config();
import { registerEvents } from "./helpers/registerEvent.js";

const client = new Client({
  intents: 3276799,
  allowedMentions: {
    parse: ["users", "roles"],
    repliedUser: false,
  },
  presence: {
    activities: [
      {
        name: "Vegas-Kiwi CHILL",
        type: ActivityType.Watching,
      },
    ],
  },
});

await registerEvents(client);

await client.login(process.env.TOKEN);
