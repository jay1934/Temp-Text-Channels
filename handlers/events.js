exports.init = (client) =>
  require('fs')
    .readdirSync('./events')
    .forEach((file) =>
      client.on(file.split('.')[0], (...args) =>
        require(`../events/${file}`)(...args, client)
      )
    );
