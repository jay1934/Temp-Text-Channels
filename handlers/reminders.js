const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
  init(client) {
    const reminders = JSON.parse(fs.readFileSync(`./data/reminders.json`));
    reminders.forEach((entry, idx) =>
      this.startTimer(entry, idx, reminders, client)
    );
  },

  startTimer({ id, date, reminder }, idx, reminders, client) {
    setTimeout(() => {
      client.users.fetch(id).then((user) => {
        user.send(
          new MessageEmbed()
            .setAuthor(user.username, user.displayAvatarURL())
            .setColor('GREEN')
            .setTitle("Here's your reminder! :timer:")
            .setDescription(reminder || 'No description provided')
        );
      });
      fs.writeFileSync(
        './data/reminders.json',
        JSON.stringify(
          reminders.filter((_, index) => index !== idx),
          '',
          2
        )
      );
    }, date - Date.now());
  },
};
