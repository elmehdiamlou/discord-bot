const { RichEmbed } = require("discord.js");

module.exports = {
  name: "tuto",
  category: "fun",
  aliases: ["bc", "broadcast"],
  description: "Says your input via the bot",
  usage: "<input>",
  run: (client, message, args) => {
    message.delete();
    /////////
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(
        `<@${message.author.id}>, You do not have enough permission to use the command tuto`
      );
    } else {
      let suggestion = args.join(" ");
      if (!suggestion)
        return message.channel
          .send(`Tuto link not found!`)
          .then(m => m.delete(15000));

      let sChannel = message.guild.channels.find(
        x => x.name === "🎬丨tutorials"
      );

      if (args.length < 0)
        return message.reply("Nothing to say?").then(m => m.delete(5000));

      if (args[0].toLowerCase() === "embed") {
        const embed = new RichEmbed()
          .setDescription(args.slice(1).join(" "))
          .setColor("#132031");

        message.channel.send(embed);
      } else {
        const embed = new RichEmbed()
          .setTitle("**JOB 6 : LUMBERJACK**")
          .setDescription(`${suggestion}`)
          .setImage('https://i.imgur.com/aybgIMt.png')
          .setColor("#132031");        
        sChannel.send(embed).then(async msg => {
          const verifie = client.emojis.find(emoji => emoji.name === "verifie");
          await msg.react(verifie);
        });
      }
    }
  }
};
