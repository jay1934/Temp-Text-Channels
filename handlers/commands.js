exports.init = (client) =>
  require('fs')
    .readdirSync('./commands')
    .forEach((file) => {
      const command = require(`../commands/${file}`);
      client.commands.set(command.match, command);
    });
