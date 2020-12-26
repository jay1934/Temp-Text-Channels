const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const { mutedRoleID, logChannelID } = require('../config.json');

module.exports = {
  init(client) {
    const guild = client.guilds.cache.first();
    const mutes = JSON.parse(fs.readFileSync(`./data/mutes.json`));
    mutes.forEach((entry, idx) => this.startTimer(entry, idx, guild, mutes));
  },

  startTimer({ id, date, duration, exec }, idx, guild, mutes) {
    setTimeout(() => {
      guild.members.fetch(id).then((member) => {
        if (!member.roles.cache.has(mutedRoleID)) return;
        member.roles.remove(mutedRoleID);
        guild.channels.cache
          .get(logChannelID)
          .send(
            new MessageEmbed()
              .setAuthor(member.user.username, member.user.displayAvatarURL())
              .setColor('GREEN')
              .setTitle(`${member.user.tag} was unmuted`)
              .setFooter(`Originally muted by ${exec} for ${duration}`)
          );
      });
      fs.writeFileSync(
        './data/mutes.json',
        JSON.stringify(
          mutes.filter((_, index) => index !== idx),
          '',
          2
        )
      );
    }, date - Date.now());
  },
};
