const { join } = require('path');
const { readdirSync } = require('fs');

module.exports = function eventsHandler(client) {
  const foldersEvents = join(__dirname, '../events');
  const eventFolders = readdirSync(foldersEvents);

  for (const folder of eventFolders) {
    const eventsPath = join(foldersEvents, folder);
    const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
      const filePath = join(eventsPath, file);
      const event = require(filePath);

      event.once ? client.once(event.name, (...args) => event.execute(...args)) : client.on(event.name, (...args) => event.execute(...args));

    }
  }
};