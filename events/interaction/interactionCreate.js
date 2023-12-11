const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`[❗ATTENTION] Aucune commande correspondant à ${interaction.commandName} n'a été trouvée.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      const errorEmbed = new EmbedBuilder()
        .setDescription('❗Une erreur s\'est produite lors de l\'exécution de cette commande !')
        .setColor(0xeb7676);

      console.error(error);
      if (interaction.replied || interaction.deferred) {

        await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
      } else {
        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
      }
    }
  },
};