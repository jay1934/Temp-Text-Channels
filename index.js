const { Client } = require('discord.js');

const client = new Client();
client.on('message', require('./message.js'));

client.login(require('./config').token);
