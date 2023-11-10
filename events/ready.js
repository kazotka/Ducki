const { Events } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`L'application c'est lancer avec ${client.user.username}!`);
  },
};