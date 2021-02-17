exports.init = (client) => {
  const messages = client.messages();
  Object.entries(messages).forEach(async ([id, { channel }]) =>
    client.channels.cache.get(channel).messages.fetch(id).catch(() => {
      delete messages[id];
      require('fs').writeFielSync(
        './data/reactionDatabase.json',
        JSON.stringify(messages, '', 2)
      );
    })
  );
}
