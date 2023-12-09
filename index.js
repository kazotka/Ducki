require('dotenv').config();

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const eventsHandler = require('./functions/eventsHandler');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
client.events = new Collection();
client.commands = new Collection();

eventsHandler(client);

const { token } = require('./config.json');
client.login(token);