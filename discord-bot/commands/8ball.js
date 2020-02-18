const Discord = require(`discord.js`);
const Math = require(`math.js`);
const { config } = require(`../index.js`);
let store = client.api.store;

module.exports = {
    name: `8ball`,
    description: `Reveal your fortune with the 8ball.`,
    aliases: null,
    usage: `<question>`,
}

module.exports.run = async(client, message, args) => {
    let _ans = [
        null,
        null
    ];
    
    let sEmbed = new Discord.RichEmbed()
        .setAuthor(`8ball`, message.author.avatarURL)
        .setDescription(`${client.api.cleanse(args.join(` `))}\n**${client.api.cleanse(ans[Math.floor(Math.random() * _ans.length)])}**`)
        .setTimestamp(new Date())
        .setFooter(config.footer);
    return message.channel.send(sEmbed);
}