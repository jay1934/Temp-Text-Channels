const ms = require('ms');
const fs = require('fs');
const { MessageEmbed } = require('discord.js');

module.exports = {
  match: '(temp|t)?mute',
  async execute(message, [id, duration, ...reason], error) {
    if (!/^(<@!?\d{17,18}>|\d{17,18})$/.test(id))
      return error(
        'Please provide a valid mention or user ID for the first argument'
      );

    let member;
    try {
      member =
        message.mentions.members.first() ||
        (await message.guild.members.fetch({ user: id }));
    } catch (e) {
      return error(
        'You did not provide a valid user ID/mention, or it referenced a user who is not in this guild!'
      );
    }

    if (member.user.bot) return error(":x: You can't mute a bot!");

    if (!duration || Number.isNaN(ms(duration)) || +duration <= 0)
      return error(`Please provide a valid duration for the mute`);

    const timers = JSON.parse(fs.readFileSync('./data/mutes.json'));

    if (
      timers.some((entry) => entry.id === member.id && entry.action === 'muted')
    )
      return error(`This member is already muted`);

    if (
      member.roles.highest.position >= message.guild.me.roles.highest.positions
    )
      return error(
        `My highest role is below or equal to ${member.user.username}'s!`
      );

    const time = ms(ms(duration), { long: true });

    const data = {
      id: member.id,
      date: Date.now() + ms(duration),
      duration: time,
      exec: message.author.tag,
    };

    require('../handlers/mutes.js').startTimer(
      data,
      timers.push(data) - 1,
      message.guild,
      timers
    );

    fs.writeFileSync('./data/mutes.json', JSON.stringify(timers, '', 2));
    member.roles.add(require('../config.json').mutedRoleID);

    const embed = (dm) =>
      new MessageEmbed()
        .setColor('RED')
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setTitle(
          `${dm ? 'You were' : `${member.user.tag} was`} muted for ${time}!`
        )
        .addField('Reason:', reason.join(' ') || 'No reason provided')
        .setFooter(
          `Muted by ${message.author.tag}`,
          message.member.displayAvatarURL
        );

    member.send(embed(true)).catch(() => {});
    message.channel.send(embed());
    message.guild.channels.cache
      .get(require('../config.json').logChannelID)
      .send(embed());
  },
};
