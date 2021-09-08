const { RichEmbed } = require("discord.js");
module.exports = {
    name: "suggest",
    description: "",
    usage: "<suggestion>",
    accessableby: "Owner",
    category: "fun",
  run: async (bot, message, args) => {
    message.delete()
    // reasoning definition
    let suggestion = args.join(" ");
    if (!suggestion)
      return message.channel
        .send(`Please provide a suggestion!`)
        .then(m => m.delete(15000));

    // grab reports channel
    let suggestrole = message.guild.roles.find(r => r.name === "𝐒𝐮𝐠𝐠𝐞𝐬𝐭𝐞𝐫");
    let sChannel = message.guild.channels.find(x => x.name === "💡丨suggestions");
    if(!suggestrole){
        message.reply("I cant find a **𝐒𝐮𝐠𝐠𝐞𝐬𝐭𝐞𝐫** role!")      
    }
    // send to reports channel and add tick or cross
    message.member.addRole(suggestrole);
    message.channel
      .send(`${message.author.username}, Your suggestion has been sent!`)
      .then(m => m.delete(15000));
    let suggestembed = new RichEmbed()
      .setAuthor(`${message.author.username}`,`${message.author.avatarURL}`)
      .setTitle(`Suggestion :`)
      .setDescription(`${suggestion}`)
      .setTimestamp()
      .setThumbnail(`https://i.imgur.com/P2jfvRb.png`)
      .setColor("#39A0D5");
      sChannel.send(suggestembed).then(async msg => {
      const Yes = bot.emojis.find(emoji => emoji.name === "Yes");
          await msg.react(Yes);
      const No = bot.emojis.find(emoji => emoji.name === "No");
          await msg.react(No);
    });
  }
};