const { Events } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    await client.user.setStatus(process.env.status);

    await console.log(`L'application c'est lancer avec ${client.user.username} !`);
  },
};