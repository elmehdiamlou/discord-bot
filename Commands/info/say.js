const { RichEmbed } = require("discord.js");

module.exports = {
  name: "say",
  category: "fun",
  aliases: ["bc", "broadcast"],
  description: "Says your input via the bot",
  usage: "<input>",
  run: (client, message, args) => {
    message.delete();
    /////////
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(
        `<@${message.author.id}>, You do not have enough permission to use the command say`
      );
    } else {
      let suggestion = args.join(" ");
      if (!suggestion)
        return message.channel
          .send(`Message not found!`)
          .then(m => m.delete(15000));

      if (args.length < 0)
        return message.reply("Nothing to say?").then(m => m.delete(5000));

      if (args[0].toLowerCase() === "embed") {
        const embed = new RichEmbed()
          .setDescription(args.slice(1).join(" "))
          .setColor("#4FA4D2");

        message.channel.send(embed);
      } else {
        const embed = new RichEmbed()
          // .setTitle("**Announcement : **")
          .setDescription(`${suggestion}`)
          //.setImage('https://i.imgur.com/rVC4iXe.jpg')
          //.setColor("#00AAFF")
          .setColor("#4FA4D2");
        message.channel.send(embed);
          //.then(async msg => {
          //const GEM = client.emojis.find(emoji => emoji.name === "verifie");
          //await msg.react(GEM);
          //});
      }
    }
  }
};
