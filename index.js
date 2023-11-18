require('dotenv').config();

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const eventsHandler = require('./functions/eventsHandler');
// const commandsHandler = require('./functions/commandsHandler');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
client.events = new Collection();
// client.commands = new Collection();

eventsHandler(client);
// commandsHandler(client);

client.login(process.env.token);