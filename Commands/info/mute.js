//const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "mute",
  run: async (bot, message, args) => {
    let tomute = message.guild.member(
      message.mentions.users.first() || message.guild.members.get(args[0])
    );
    if (!tomute) return message.reply("Couldn't find user");
    if (tomute.hasPermission("MANAGE_MESSAGES"))
      return message.reply("Can't mute them!");
    let muterole = message.guild.roles.find(`name`, "𝐌𝐮𝐭𝐞𝐝");

    //start of create role
    /*if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#ff0000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }*/
    //end of create role

    let mutetime = args[1];
    if (!mutetime) return message.reply("You didn't specify a time!");

    await tomute.addRole(muterole.id);
    message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

    setTimeout(function() {
      tomute.removeRole(muterole.id);
      message.channel.send(`<@${tomute.id}> has been unmuted!`);
    }, ms(mutetime))
    let alchannel = message.guild.channels.find(x => x.name === "📋丨audit-log");
    alchannel.send(`**[Mute]** ${message.author.username}: Muted <@${tomute.id}> for ${ms(ms(mutetime))}.`);
  }
};
