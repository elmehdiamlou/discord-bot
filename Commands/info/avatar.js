/*const Discord = require("discord.js");
module.exports = {
  name: "avatar",
  run: async (bot, message, args) => {
    let msg = await message.channel.send("Generating avatar...");

    let mentionedUser = message.mentions.users.first() || message.author;

    let embed = new Discord.RichEmbed()

      .setImage(mentionedUser.displayAvatarURL)
      .setColor("4FA4D2")
      .setTitle("Avatar")
      .setFooter("Searched by " + message.author.tag)
      .setDescription(
        "[Avatar URL link](" + mentionedUser.displayAvatarURL + ")"
      );

    message.channel.send(embed);

    msg.delete();
  }
};*/
