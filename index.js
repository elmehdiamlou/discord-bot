const { Client, Collection, Util } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");
const Discord = require("discord.js");
const { promptMessage } = require("./function.js");
const { PREFIX, TOKEN, STATUS } = require("./config.js");
const bot = new Discord.Client();

////////////

const discord = require("discord.js");
const client = new discord.Client();

/////////////////// WELCOME IMG /////////////////////////

const { Canvas } = require("canvas-constructor");
const { resolve, join } = require("path");
const { get } = require("snekfetch");
const superagent = require("superagent");

client.on("guildMemberAdd", async member => {
  let namam = member.user.username;
  let batasnama = namam.length > 12 ? namam.substring(0.1) + "..." : namam;

  async function createCanvas() {
    let imageUrlPhoto = /\?size=2048$/g;

    //bleu
    let image = "https://i.imgur.com/E2vIoU1.png";
    //green
    // let image = 'https://cdn.discordapp.com/attachments/664273671623540736/681188804408770588/20200223_181718.png';
    let { body: background } = await superagent.get(image);
    let { body: avatar } = await superagent.get(
      member.user.displayAvatarURL.replace(imageUrlPhoto, "?size=128")
    );

    return (
      new Canvas(856, 376)
        //.addImage(avatar, 100, 50, 256, 256, 128)
        .setColor("#000000")
        .setTextFont("bold 55px Arial")
        .addImage(background, 0, 0, 856, 376)
        .addText(`${batasnama}`, 380, 250)
        .addRoundImage(avatar, 4.1, 6.7, 360.2, 360.2, 180.1)
        .toBufferAsync()
    );
  }

  let channel = member.guild.channels.find(x => x.id === 802548867535077427);
  channel.send(
    `<@${member.user.id}>, Welcome to the server`,

    {
      files: [
        {
          attachment: await createCanvas(),
          name: "WelcomeImageByElmehdi.png"
        }
      ]
    }
  );
});
////////////////////// whitelisted Count ///////////////////////

client.on("message", message => {
    if (message.content === "+wl") 
    {
        let roleID = "660558360646516756";
        let membersWithRole = message.guild.roles.get(roleID).members;
        message.channel.send(`**[${membersWithRole.size}] members whitelisted**`);
    }
});

//////////////////////     ANTI LINK     /////////////////////////////////

/*client.on("message", message => {
  if (message.member.hasPermission("EMBED_LINKS")) {
    return undefined;
  } else {
    if (message.content.includes("https://")) {
      console.log("deleted " + message.content + " from " + message.author);
      message.delete(1);
      let tomute = message.guild.member(message.author);
      let muterole = message.guild.roles.find(`name`, "𝐌𝐮𝐭𝐞𝐝");
      tomute.addRole(muterole.id);
      message.channel.sendMessage(
        "No links here " +
          message.author +
          ",you have been muted "
      )
      let alchannel = message.guild.channels.find(x => x.name === "📋丨𝐀𝐮𝐝𝐢𝐭-𝐋𝐨𝐠");
      alchannel.send(`**[Mute]** <@${message.author.id}> Has been muted: Posting Link !!!`);
    }
    else if (message.content.includes("http://")) {
      console.log("deleted " + message.content + " from " + message.author);
      message.delete(1);
      let tomute = message.guild.member(message.author);
      let muterole = message.guild.roles.find(`name`, "𝐌𝐮𝐭𝐞𝐝");
      tomute.addRole(muterole.id);
      message.channel.sendMessage(
        "No links here " +
          message.author +
          ",you have been muted "
      )
      let alchannel = message.guild.channels.find(x => x.name === "📋丨𝐀𝐮𝐝𝐢𝐭-𝐋𝐨𝐠");
      alchannel.send(`**[Mute]** <@${message.author.id}> Has been muted: Posting Link !!!`);
    }
    else if (message.content.includes("discord.gg/")) {
      console.log("deleted " + message.content + " from " + message.author);
      message.delete(1);
      let tomute = message.guild.member(message.author);
      let muterole = message.guild.roles.find(`name`, "𝐌𝐮𝐭𝐞𝐝");
      tomute.addRole(muterole.id);
      message.channel.sendMessage(
        "No links here " +
          message.author +
          ",you have been muted "
      )
      let alchannel = message.guild.channels.find(x => x.name === "📋丨𝐀𝐮𝐝𝐢𝐭-𝐋𝐨𝐠");
      alchannel.send(`**[Mute]** <@${message.author.id}> Has been muted: Posting Link !!!`);
    }
    else if (message.content.includes("www.")) {
      console.log("deleted " + message.content + " from " + message.author);
      message.delete(1);
      let tomute = message.guild.member(message.author);
      let muterole = message.guild.roles.find(`name`, "𝐌𝐮𝐭𝐞𝐝");
      tomute.addRole(muterole.id);
      message.channel.sendMessage(
        "No links here " +
          message.author +
          ",you have been muted "
      )
      let alchannel = message.guild.channels.find(x => x.name === "📋丨𝐀𝐮𝐝𝐢𝐭-𝐋𝐨𝐠");
      alchannel.send(`**[Mute]** <@${message.author.id}> Has been muted: Posting Link !!!`);
    }
  }
});*/

/////////////////////////////      AUTO ROLE      ////////////////////////////////

client.on("guildMemberAdd", async member => {
  var role = member.guild.roles.find("name", "➤ 𝐌𝐞𝐦𝐛𝐫𝐞𝐬");
  member.addRole(role)
});

///////////////////////////     Clear    MSG      ///////////////////////////////

client.on("message", function(message) {
  if (message.content == "+clear") {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      message.channel.fetchMessages().then(
        function(list) {
          message.channel.bulkDelete(list)
          let alchannel = message.guild.channels.find(x => x.name === "📋丨audit-log");
          alchannel.send(`**[Clear]** ${message.author.username}: Has been cleared the chat.`);
        },
        function(err) {
          message.channel.sendMessage(
            "You do not have enough permission to use the command clear"
          );
        }
      );
    }
  }
});

////////////////////////////////////////////////////////////////////////////////

// bot startup
client.on("ready", message => {
  client.user.setActivity("+help");
  console.log("I am ready");
});

client.on("message", message => {
  if (message.content === "+ip") {
    let embed = new discord.RichEmbed()
      .setTitle("Server IP")
      .setColor("#4FA4D2")
      .setDescription("**IP :** mtasa://137.74.231.171:22003")
      .setThumbnail(`${client.user.displayAvatarURL}`)
      .setFooter(
        `Requested by ${message.author.tag}`,
        `${message.author.avatarURL}`
      );
    message.channel.send(embed);
  }
});

// bot info
client.on("message", message => {
  if (message.content === "+botinfo") {
    let embed = new discord.RichEmbed()
      .setTitle("Bot Informations")
      .setColor("#4FA4D2")
      .setDescription(
        `This bot is made by <@386311112762589185> \nCoding with JavaScript`
      )
      .setFooter("Ⓒ All rights reserved to Elmehdi Amlou")
      .setThumbnail(`https://i.imgur.com/bTH6jnX.png`);

    message.channel.send(embed);
  }
});

// Server info
client.on("message", message => {
  if (message.content === "+serverinfo") {
    let embed = new discord.RichEmbed()
      .setTitle("Server Informations")
      .setColor("#4FA4D2")
      .setThumbnail(`${client.user.displayAvatarURL}`)
      //.addField("👑 Name ", `${message.guild.owner}`, true)
      .addField("👑 Founder ", `<@296317920806567951>`, true)
      .addField("🎓 Manager ", `<@386311112762589185>`, true)
      .addField("🅰️ Administrators ", `<@281401978519552000> \n<@475076473057968138>`, true)
      .addField("Ⓜ️ Moderators ", `<@330022240156647426> \n<@369884486512541699> \n<@490664952114184202>`, true)
      .addBlankField()
      .addField(
        "👥  Members ",
        `**${message.guild.memberCount}** Members`,
        true
      )
      .addField(
        "💬  Channels ",
        `**${message.guild.channels.size}** Channels`,
        true
      )
      .addField("👔 Roles ", `**${message.guild.roles.size}** Roles`, true)
      //.addBlankField()
      //.addField("⌛ Created At :", `${message.author.createdAt}`)
      .setFooter(
        `Requested by ${message.author.tag}`,
        `${message.author.avatarURL}`
      );
    message.channel.send(embed);
  }
});

// bot help
client.on("message", message => {
  if (message.content === "+help") {
    let embed = new discord.RichEmbed()
      .setTitle("Help")
      .setColor("#4FA4D2")
      .setThumbnail(`${client.user.displayAvatarURL}`)
      .setDescription(
        "**➤ Info Commands :** \n `+botinfo` Shows bot informations \n `+serverinfo` Shows server informations \n `+help` Shows the help (this command) \n `+avatar` Show your avatar or the avatar of members (+avatar <member>) \n\n **➤ Moderation Commands :** \n `+mute` Mute member (+mute <member> <time(s/m/h/d)>) \n `+kick` Kick members (+kick <member> <raison>) \n `+ban` Ban members (+ban <member> <raison>) \n `+say` Send message by bot (+say <message>) \n `+clear` Clear message in chat channel \n `+anno` Send a announcement (+anno <message>)\n\n **➤ RolePlay Commands :** \n `+twt` Send tweets in twitter (+twt <message>) \n `+newspaper` Show the last news paper in the city \n `+ip` Ip server mta \n `+mapicons` Shows the map icones signification \n `+suggest` make a suggestion (+suggest <suggestion>)"
      )
      .setFooter(
        `Requested by ${message.author.tag}`,
        `${message.author.avatarURL}`
      );
    message.channel.send(embed);
  }
});

// command images

client.on("message", message => {
  if (message.content === "+mapicons") {
    let embed = new discord.RichEmbed()
      .setTitle("Map Icons")
      .setColor("#4FA4D2")
      .setImage("https://i.imgur.com/S1hhfuM.png")
      .setFooter(
        `Requested by ${message.author.tag}`,
        `${message.author.avatarURL}`
      );
    message.channel.send(embed);
  }
});

// command images

client.on("message", message => {
  if (message.content === "+newspaper") {
    let embed = new discord.RichEmbed()
      .setTitle("News Paper")
      .setColor("#4FA4D2")
      .setImage(
        "https://cdn.discordapp.com/attachments/635558703797633050/650392302094778369/20191130_184117.png"
      )
      .setFooter(
        `Requested by ${message.author.tag}`,
        `${message.author.avatarURL}`
      );
    message.channel.send(embed);
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("message", message => {
  if (message.content === "+testtest") { 
    message.channel.send("",{files: ["https://i.imgur.com/SPkqWHS.png"]});
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// kick cmd
client.on("message", async message => {
  var prefix = "";
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === "+kick") {
    message.delete();
    if (!args[0]) {
      return message.channel.send("Please provide a person to kick!");
    }
    // no user permission
    if (!message.member.hasPermission("KICK_MEMBERS")) {
      return message.channel.send(
        "You do not have enough permission to use the command kick"
      );
    }
    // no bot permission
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
      return message.channel.send(
        "Looks like i dont have enough permission to use this command :("
      );
    }
    // let the oerson to kick
    const tokick =
      message.mentions.members.first() || message.guild.members.get(args[0]);

    // if no member found
    if (!tokick) {
      return message.channel
        .send("Cannot found the member, try again")
        .then(m => m.delete(15000));
    }
    // cant kick yourself
    if (tokick.id === message.author.id) {
      return message.channel
        .send("You cant kick yourself")
        .then(m => m.delete(15000));
    }
    // check the mentioned user is kickable
    if (!tokick.kickable) {
      return message.channel
        .send("i cant kick that person due to role issue, they have a higher role!")
        .then(m => m.delete(15000));
    }
    ///////////////////////////////////////   NEW   /////////////////////////////////////////
    let bReason = args.join(" ").slice(22);
    if (!bReason) bReason = "No Reason Provided";
    ////////////////////////////////////////////////////////////////////////////////////////
    const embed = new discord.RichEmbed()
      .setTitle("KICK MEMBER")
      .setColor("#4FA4D2")
      .setDescription(`${tokick} was kicked \n **Reason : **${bReason}`)
      .setFooter(
        `By ${message.author.username}`,
        `${client.user.displayAvatarURL}`
      );
    tokick.kick(args.slice(1).join(" ")).catch(err => {
      if (err)
        return message.channel.send(
          `Well ban doesnt worked. here is the eroor - ${err}`
        );
    });
    message.channel.send(embed)
    let alchannel = message.guild.channels.find(x => x.name === "📋丨audit-log");
    alchannel.send(`**[Kick]** ${message.author.username}: kicked ${tokick} !!!`);
  }
});

///////////////////////         BAN    MEMBER        /////////////////////////

client.on("message", async message => {
  var prefix = "";
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === "+ban") {
    message.delete();
    let bUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.get(args[0])
    );
    if (!bUser)
      //return
      message.channel
        .send("Cannot found the member, try again")
        .then(m => m.delete(15000));

    if (bUser.id === message.author.id) {
      return message.channel
        .send("You cant ban yourself")
        .then(m => m.delete(15000));
    }

    if (!bUser.bannable) {
      return message.channel
        .send("i cant ban that person due to role issue, they have a higher role!")
        .then(m => m.delete(15000));
    }

    let bReason = args.join(" ").slice(22);
    if (!bReason) bReason = "No Reason Provided";
    if (!message.member.hasPermission("BAN_MEMBERS")) return undefined;
    if (bUser.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send("That person can't be banned!");
    message.guild.member(bUser).ban(bReason);
    {
      const embed = new discord.RichEmbed()
        .setTitle("BAN MEMBER")
        .setColor("#4FA4D2")
        .setDescription(` ${bUser} was Banned \n **Reason : **${bReason}`)
        .setFooter(
          `By ${message.author.username}`,
          `${client.user.displayAvatarURL}`
        );
      message.guild.member(bUser).ban(bReason);
      message.channel.send(embed)
      let alchannel = message.guild.channels.find(x => x.name === "📋丨audit-log");
      alchannel.send(`**[Ban]** ${message.author.username}: Baned ${bUser} !!!`);
    }
  }
});

///////////////////////////////////////////////////////////////

/*const v_ = client.emojis.get("682246968826920972");
const v_ = client.emojis.find(emoji => emoji.name === "v_");
client.on('message', message => {
if(message.content === "v") {
   const v_ = client.emojis.find(emoji => emoji.name === "v_");
   message.reply(`${v_} LMAO`);
}
});*/

///////////////////////////////////////////////////////////////

client.login("");

// End of bot.on('message')

//const Canvas = require("canvas");https://cdn.glitch.com/12138b0c-79bf-40c7-acd7-0795e2d75c7d%2Fwallpaper.jpg?v=1578247518470

const queue = new Map();

///////////////////////////////////////////////////////////////////////////////////////////////////////

//assest ke ander img h wo daalni h canvas h. w   image kahan dalni hai???
client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

config({
  path: __dirname + "/.env"
});

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
  console.log(`Hi, ${client.user.username} is now online!`);

  setInterval(() => {
    client.user.setActivity(`${STATUS}`, { type: "Playing" });
  }, 5000);
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(PREFIX)) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(PREFIX.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);
});

client.login("");

// End of bot.on('message')

// Since there is no actual preview for the bot (unless you add your own website code)
// It will be an error or continious refresh loop, consider this part of the code that keeps the bot alive
// Though you will still need an uptime robot in order to truely keep the bot alive
// This is NOT my code, the code is directly from this page: https://anidiotsguide_old.gitbooks.io/discord-js-bot-guide/content/other-guides/hosting-on-glitchcom.html
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

// Bot token
// Located in .env file
client.login("");
