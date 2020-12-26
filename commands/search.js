const { MessageEmbed } = require('discord.js');
const { search } = require('serp');

const numbers = { 0: '1️⃣', 1: '2️⃣', 2: '3️⃣', 3: '4️⃣', 4: '5️⃣' };

module.exports = {
  match: 'search|google',
  async execute(message, args, error) {
    if (!args[0]) return error('Please provide a search query');
    const res = await search({ num: 5, qs: { q: args.join(' ') } });
    message.channel.send(
      new MessageEmbed()
        .setAuthor(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL()
        )
        .setColor('GREEN')
        .setTitle(`"${titleCaps(args.join(' '))}"`)
        .setURL(
          `http://google.com/search?q=${encodeURIComponent(args.join(' '))}`
        )
        .setDescription(
          res.map(
            ({ title, url }, idx) => `${numbers[idx]} - [${title}](${url})`
          )
        )
    );
  },
};

/**
 * Taken from johnresig under the MIT liscense
 */
const small =
  '(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|v[.]?|via|vs[.]?)';
const punct = '([!"#$%&\'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]*)';
const upper = (word) => word[0].toUpperCase() + word.slice(1);
const lower = (word) => word.toLowerCase();

function titleCaps(title) {
  const parts = [];
  const split = /[:.;?!] |(?: |^)["Ò]/g;
  let index = 0;

  while (true) {
    const m = split.exec(title);

    parts.push(
      title
        .substring(index, m ? m.index : title.length)
        .replace(/\b([A-Za-z][a-z.'Õ]*)\b/g, (all) =>
          /[A-Za-z]\.[A-Za-z]/.test(all) ? all : upper(all)
        )
        .replace(RegExp(`\\b${small}\\b`, 'ig'), lower)
        .replace(
          RegExp(`^${punct}${small}\\b`, 'ig'),
          (all, punct, word) => punct + upper(word)
        )
        .replace(RegExp(`\\b${small}${punct}$`, 'ig'), upper)
    );

    index = split.lastIndex;

    if (m) parts.push(m[0]);
    else break;
  }

  return parts
    .join('')
    .replace(/ V(s?)\. /gi, ' v$1. ')
    .replace(/(['Õ])S\b/gi, '$1s')
    .replace(/\b(AT&T|Q&A)\b/gi, (all) => all.toUpperCase());
}
