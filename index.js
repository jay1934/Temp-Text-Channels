const { Client, Collection } = require('discord.js');

const client = new Client();
client.commands = new Collection();
client.messages = () =>
  JSON.parse(require('fs').readFileSync('./data/reactionDatabase.json'));

client.on('ready', () => {
  require('./handlers/reactions.js').init(client);
  require('./handlers/events.js').init(client);
  require('./handlers/mutes.js').init(client);
  require('./handlers/commands.js').init(client);
  require('./handlers/reminders.js').init(client);
});

client.login(require('./config').token);
