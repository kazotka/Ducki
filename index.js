require('dotenv').config();

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { join } = require('path');
const { readdirSync } = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.events = new Collection();

const foldersPath = join(__dirname, 'events');
const eventFolders = readdirSync(foldersPath);

for (const folder of eventFolders) {
  const eventsPath = join(foldersPath, folder);
  const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));

  for (const file of eventFiles) {
    const filePath = join(eventsPath, file);
    const event = require(filePath);

    event.once ? client.once(event.name, (...args) => event.execute(...args)) : client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(process.env.token);