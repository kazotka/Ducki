const { Events, EmbedBuilder, Collection } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const { cooldowns } = interaction.client;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!cooldowns.has(command.data.name)) {
      cooldowns.set(command.data.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.data.name);
    const defaultCooldownDuration = 5;
    const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

    if (timestamps.has(interaction.user.id)) {
      const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

      if (now < expirationTime) {

        const expiredTimestamp = Math.round(expirationTime / 1000);
        return interaction.reply({ content: `❗Veuillez patienter, vous êtes en période de cooldowns pour la commande \`/${command.data.name}\`. Vous pouvez l'utiliser à nouveau <t:${expiredTimestamp}:R>.`, ephemeral: true });
      }
    }

    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);


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