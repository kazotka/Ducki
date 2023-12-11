require('dotenv').config();

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const eventsHandler = require('./functions/eventsHandler');
const commandsHandler = require('./functions/commandsHandler');
const deployCommands = require('./functions/deployCommands');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
client.events = new Collection();
client.commands = new Collection();
client.cooldowns = new Collection();

deployCommands();
eventsHandler(client);
commandsHandler(client);

const { token } = require('./config.json');
client.login(token);
