const Discord = require(`discord.js`);
const Math = require(`math.js`);
const { config } = require(`../index.js`);
let store = client.api.store;

module.exports = {
    name: `disconnect`,
    description: `Make the bot leave the voice channel.`,
    aliases: [`dc`, `leave`],
    usage: null,
}

module.exports.run = async(client, message, args) => {
    let botChannel = message.guild.members.get(client.user.id).voiceChannel;
    let memChannel = message.member.voiceChannel;

    if(!botChannel) return message.channel.send(`${message.author} I am not currently in a voice channel!`);
    else if(!memChannel || botChannel.id != memChannel.id) return message.channel.send(`${message.author} The bot is not currently in the voice channel that you are in!`);
    
    botChannel.leave();
    store.write(`guilds/${message.guild.id}/connection`, null);
    return message.channel.send(`${message.author} Succesfully left the voice channel.`);
}