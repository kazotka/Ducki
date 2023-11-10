const { Client, Events, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

Events.ClientReady ? console.log('L\'application c\'est lancer !') : console.log('Il y a eu un souci lors du démarrage de l\'application!?');

require('dotenv').config();
client.login(process.env.token);