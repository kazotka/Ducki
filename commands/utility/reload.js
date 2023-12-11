const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName('reload')
    .setDescription('Rechargée une commande.')
    .addStringOption(option =>
      option.setName('commande')
        .setDescription('La commande à rechargée.')
        .setRequired(true)),
  async execute(interaction) {
    if (interaction.user.id === process.env.ownersId) {
      const commandName = interaction.options.getString('commande', true).toLowerCase();
      const command = interaction.client.commands.get(commandName);

      if (!command) {
        return interaction.reply(`❗Il n'y a pas de commande portant le nom \`${commandName}\` !`);
      }

      delete require.cache[require.resolve(`./${command.data.name}.js`)];

      try {

        interaction.client.commands.delete(command.data.name);

        const newCommand = require(`./${command.data.name}.js`);
        interaction.client.commands.set(newCommand.data.name, newCommand);

        await interaction.reply({ content: `🧩 La commande \`/${newCommand.data.name}\` a été rechargée !`, ephemeral: true });
      } catch (error) {

        console.error(error);

        await interaction.reply(`❗Une erreur s'est produite lors du rechargement de la commande \`${command.data.name}\`:\n\`${error.message}\``);

      }
    } else {
      await interaction.reply({ content: '❗Vous ne pouvez pas utiliser cette commande.', ephemeral: true });
    }
  },
};