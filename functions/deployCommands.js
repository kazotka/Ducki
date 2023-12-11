const { join } = require('path');
const { readdirSync } = require('fs');
const { REST, Routes } = require('discord.js');

module.exports = function deployCommands() {
  const commands = [];

  const foldersCommands = join(__dirname, '../commands');
  const commandFolders = readdirSync(foldersCommands);

  for (const folder of commandFolders) {
    const commandsPath = join(foldersCommands, folder);
    const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const filePath = join(commandsPath, file);
      const command = require(filePath);

      'data' in command && 'execute' in command ? commands.push(command.data.toJSON()) : console.log(`[❗AVERTISSEMENT] Il manque à la commande ${filePath} une propriété "data" ou "execute" requise.`);

    }
  }
  const { token } = require('../config.json');
  const rest = new REST().setToken(token);

  (async () => {
    try {
      console.log(`🧩 Commence à rafraîchir les ${commands.length} (/) commandes d'application.`);

      const data = await rest.put(
        Routes.applicationCommands(process.env.clientId),
        { body: commands },
      );

      console.log(`🧩 Rechargement réussi des ${data.length} (/) commandes de l'application.`);
    } catch (error) {
      console.error(error);

    }
  })();

};