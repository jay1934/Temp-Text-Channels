const { MessageEmbed } = require('discord.js');
const {
  channelID,
  prefix,
  millisecondsBeforeUnlock: ms,
} = require('../config.json');

module.exports = (message) => {
  if (
    message.author.bot ||
    !message.guild ||
    !message.content ||
  )
    return;

  if (message.content.startsWith(prefix)) {
    const error = (content) =>
      message.channel
        .send(`:x: ${content}`)
        .then((msg) => msg.delete({ timeout: 4000 }));

    const [name, ...args] = message.content.slice(prefix.length).split(/ +/);
    const command = message.client.commands.find((_, match) =>
      new RegExp(`^(${match})$`).test(name)
    );
    if (command) {
      try {
        command.execute(message, args, error);
      } catch (e) {
        console.log(e);
        error('Something went wrong');
      }
    }
  }
  if (message.channel.id !== channelID) return;
  if (!message.client.locked) {
    message.channel.createOverwrite(message.author, {
      SEND_MESSAGES: true,
    });
    message.channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: false,
    });
    message.client.locked = true;
  }
  setTimeout(async () => {
    if (
      message.channel.messages.cache.first().createdAt.getTime() >
      message.createdAt.getTime()
    )
      return;
    message.channel.permissionOverwrites.get(message.author.id).delete();
    message.channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: true,
    });
    await message.channel.send(
      new MessageEmbed()
        .setColor('GREEN')
        .setTitle('This channel has been unlocked 🔓')
    );
    message.client.locked = false;
  }, ms);
};
