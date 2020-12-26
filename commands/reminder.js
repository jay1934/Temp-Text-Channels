const ms = require('ms');
const fs = require('fs');

module.exports = {
  match: 'remind(er|me)?',
  execute(message, [time, ...reminder], error) {
    if (!time)
      return error(
        'Please specify an amount of time to wait before reminding you'
      );
    if (Number.isNaN(ms(time)))
      return error('That is nt a valid duration. Examples: `2h`, `3m`, `7d`');

    const data = {
      id: message.author.id,
      date: Date.now() + ms(time),
      reminder: reminder.join(' '),
    };

    const reminders = JSON.parse(fs.readFileSync('./data/reminders.json'));

    require('../handlers/reminders.js').startTimer(
      data,
      reminders.push(data) - 1,
      reminders,
      message.client
    );

    fs.writeFileSync('./data/reminders.json', JSON.stringify(reminders, '', 2));

    message.channel.send(`Your reminder has been set :timer:`);
  },
};
