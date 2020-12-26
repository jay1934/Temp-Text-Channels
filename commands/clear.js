module.exports = {
  match: 'clear|purge',
  execute(message, [amount], error) {
    if (!amount)
      return error(
        "You haven't given an amount of messages which should be deleted!"
      );

    const num = +amount;
    if (Number.isNaN(num)) return error(`${amount} isn't a valid number!`);
    if (num < 2 || num > 100)
      return error(`The amount must be at least 2 and at most 100`);

    message.channel
      .bulkDelete(num + 1, true)
      .then((messages) =>
        message.channel.send(
          `Cleared ${messages.size} messages!${
            messages.size < num
              ? ' Some messags could not be deleted as they were over 2 weeks old.'
              : ''
          }`
        )
      )
      .catch((e) => {
        console.log(e);
        return error('Something went wrong.');
      });
  },
};
