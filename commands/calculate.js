const { MessageEmbed } = require('discord.js');
const math = require('mathjs');

module.exports = {
  match: 'calc(ulate)?|math',
  execute(message, args, error) {
    if (!args[0]) return error('You need to provide a math equation.');

    message.channel
      .send(
        new MessageEmbed()
          .setColor('GREEN')
          .setAuthor(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL()
          )
          .addFields([
            { name: 'Input:', value: args.join(' ') },
            {
              name: 'Output:',
              value: math.evaluate(args.slice(0).join(' ')).toString(),
            },
          ])
      )
      .catch(() => message.channel.send('Invalid expression.'));
  },
};
