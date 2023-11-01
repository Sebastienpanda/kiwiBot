export async function fetchCommands(interaction) {
  return await interaction.guild.commands.fetch();
}
