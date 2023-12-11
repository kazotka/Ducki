const { join } = require('path');
const { readdirSync } = require('fs');

module.exports = function commandsHandler(client) {
  const foldersCommands = join(__dirname, '../commands');
  const commandFolders = readdirSync(foldersCommands);

  for (const folder of commandFolders) {
    const commandsPath = join(foldersCommands, folder);
    const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const filePath = join(commandsPath, file);
      const command = require(filePath);

      'data' in command && 'execute' in command ? client.commands.set(command.data.name, command) : console.log(`[❗AVERTISSEMENT] Il manque à la commande ${filePath} une propriété "data" ou "execute" requise.`);

    }
  }
};