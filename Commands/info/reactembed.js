const Discord = require("discord.js");

  module.exports = {
  name: "poll",
  run: async (client, message, args) => {
message.delete({ timeout: 100 });
if (!args[0]) return message.reply('You need to supply the question');

let embed = new Discord.MessageEmbed()
  .setTitle(args.join(' '))
  .setDescription('Poll created by ' + message.author.tag)
  .addField('Status', 'Voting is currently open.')
  .setColor('#ffd700')
  .attachFiles(new Discord.MessageAttachment('https://i.imgur.com/QUmbq9o.png', 'thumbnail.png'))
  .setThumbnail('attachment://thumbnail.png')
  .setFooter('Bot created by James (Rock)₇₇₇');

message.channel.send(embed).then(async msg => {
  await msg.react('👍');
  await msg.react('👎');
  await msg.react('🤷');
  await msg.react('🗑️');

  const threshold = 1;

  async function stop(result) {
    collector.stop();

    const newEmbed = new Discord.MessageEmbed(msg.embeds[0]);

    newEmbed.title = newEmbed.title + ' [CLOSED]';
    newEmbed.fields[0] = { name: 'Status', value: 'Voting is now closed.\n' + result };
    newEmbed.setThumbnail('attachment://thumbnail.png');
    await msg.edit(newEmbed);

    msg.reactions.removeAll();
  }

  async function update() {
    const newEmbed = new Discord.MessageEmbed(embed);

    const userYes = (votes['👍'].size === 0)? '-' : [...votes['👍']];
    const userNo = (votes['👎'].size === 0)? '-' : [...votes['👎']];
    const userUnsure = (votes['🤷'].size === 0)? '-' : [...votes['🤷']];

    newEmbed.addFields(
      { name: `User Yes (${votes['👍'].size}/${threshold})`, value: userYes, inline: true },
      { name: `User No (${votes['👎'].size}/${threshold})`, value: userNo, inline: true },
      { name: 'User Unsure', value: userUnsure, inline: true }
    );

    await msg.edit(newEmbed);

    if (votes['👍'].size >= threshold) {
      await stop('This answer is good enough to get accepted and an upvote.');
      // do something
    } else if (votes['👎'].size >= threshold) {
      await stop('This answer is not good enough to get accepted and an upvote.');
      // do something
    }
  }

  const votes = {
    '👍': new Set(),
    '👎': new Set(),
    '🤷': new Set(),
    '🗑️': new Set()
  };

  update();

  const collector = msg.createReactionCollector((reaction, user) => !user.bot , { dispose: true });

  collector.on('collect', async (reaction, user) => {
    if (['👍', '👎', '🤷', '🗑️'].includes(reaction.emoji.name)) {
      const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));

      for (const userReaction of userReactions.values()) {
        if (userReaction.emoji.name !== reaction.emoji.name || reaction.emoji.name === '🗑️') {
          userReaction.users.remove(user.id);
          votes[userReaction.emoji.name].delete(user);
        }
      }

      votes[reaction.emoji.name].add(user);
    } else {
      reaction.remove();
    }

    update();
  });

  collector.on('remove', (reaction, user) => {
    votes[reaction.emoji.name].delete(user);

    update();
  });
});
}}
