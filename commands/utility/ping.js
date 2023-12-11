const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Permet d\'afficher la latence de l\'application.'),
  async execute(interaction) {
    const sent = await interaction.reply({ content: '🏓 Ping!', fetchReply: true });
    interaction.editReply(`🏓 Pong : ${sent.createdTimestamp - interaction.createdTimestamp}ms !`);
  },
};