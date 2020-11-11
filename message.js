const { MessageEmbed } = require('discord.js');
const { channelID, millisecondsBeforeUnlock: ms } = require('./config.json');

module.exports = (message) => {
  if (message.channel.id !== channelID || message.author.bot) return;
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
