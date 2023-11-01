export default {
  cooldown: 5,
  data: {
    name: "ping",
    description: "Renvoie le ping du bot",
  },

  async execute(interaction) {
    const botLatency = Date.now() - interaction.createdTimestamp;
    const ping = {
      color: 0x059669,
      description: `✅ Le ping est de ${botLatency}ms`,
      timestamp: new Date().toISOString(),
    };
    await interaction.reply({
      embeds: [ping],
    });
  },
};
