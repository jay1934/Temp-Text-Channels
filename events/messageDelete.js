module.exports = ({ id }, { messages }) => {
  messages = messages();
  if (!messages[id]) return;
  delete messages[id];
  require('fs').writeFielSync(
    './data/reactionDatabase.json',
    JSON.stringify(messages, '', 2)
  );
};
