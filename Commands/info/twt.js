const { RichEmbed } = require("discord.js");
module.exports = {
  name: "twt",
  description: "",
  usage: "<suggestion>",
  accessableby: "Owner",
  category: "fun",
  run: async (bot, message, args) => {
    message.delete();
    // reasoning definition
    let suggestion = args.join(" ");
    if (!suggestion)
      return message.channel
        .send(`Twitter message not found!`)
        .then(m => m.delete(15000));

    // grab reports channel
    let suggestrole = message.guild.roles.find(r => r.name === "𝐓𝐰𝐢𝐭𝐭𝐞𝐫 𝐔𝐬𝐞𝐫");
    let whitlistedrole = message.member.roles.find(r => r.name === "whitelisted");
    let sChannel = message.guild.channels.find(x => x.name === "🌐丨twitter");
    if (!suggestrole) {
      message.channel.send(`${message.author.username}, I cant find a **𝐓𝐰𝐢𝐭𝐭𝐞𝐫 𝐔𝐬𝐞𝐫** role!`);
    }
    
    if (!whitlistedrole) {
      message.channel.send(`${message.author.username}, You are not whitelisted to use that!`);
    }
    else
    {
   
    // send to reports channel and add tick or cross
    message.member.addRole(suggestrole);
    message.channel
      .send(`${message.author.username}, Your twitte has been sent!`)
      .then(m => m.delete(15000));
    /////////////////////////////////////////////////////////////////////////////////////////////

    const { Canvas } = require("canvas-constructor");
    const { resolve, join } = require("path");
    const { get } = require("snekfetch");
    const superagent = require("superagent");

    let namam = message.author.username;
    let batasnama = namam.length > 12 ? namam.substring(0.1) + "..." : namam;

    async function createCanvas() {
      let imageUrlPhoto = /\?size=2048$/g;

      //bleu
      let image = "https://i.imgur.com/1TIACHo.png";

      let { body: background } = await superagent.get(image);
      let { body: avatar } = await superagent.get(
        message.author.displayAvatarURL.replace(imageUrlPhoto, "?size=128")
      );

      return (
        new Canvas(856, 376)
          //.addImage(avatar, 100, 50, 256, 256, 128)
          .setColor("#000000")
          .setTextFont("bold 25px Arial")
          .addImage(background, 0, 0, 856, 376)
          .addText(`${batasnama} ✔️`, 115, 62)
          .setColor("#7C7C7C")
          .setTextFont("normal 17px Arial")
          .addText(`@${batasnama}`, 113, 83)
          .setColor("#000000")
          .setTextFont("normal 35px Arial")
          .addText(`${suggestion}`, 50, 134)
          .addRoundImage(avatar, 30, 28, 70, 70, 35)
          .setColor("#7C7C7C")
          .setTextFont("normal 16px Arial")
          .addText(`${message.createdAt}`, 40, 240)
          .toBufferAsync()
      );
    }

    /*
      let suggestembed = new RichEmbed()
      .setAuthor(`@${message.author.username}`,`${message.author.avatarURL}`)
      .setTitle(`${suggestion}`)
      .setTimestamp()
      //.setThumbnail(`${bot.user.displayAvatarURL}`)
      .setColor("#00AAFF")
      .setFooter('Twitter','https://i.imgur.com/Tu8XZXZ.png');
      */
    ////////////sChannel.send(suggestembed///////////////
    sChannel
      .send(
        {
          files: [
            {
              attachment: await createCanvas(),
              name: "TwitterImageByElmehdi.png"
            }
          ]
        }
        ////////////////////////////////////////////////////////////////////////////////////////////
      )
      .then(async msg => {
        await msg.react("💙");
      });
  }
  }
};
