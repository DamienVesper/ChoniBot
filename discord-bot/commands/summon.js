const Discord = require(`discord.js`);
const Math = require(`math.js`);
const jsonstore = require(`jsonstore.io`);
const { api, bus, config } = require(`../index.js`);
let store = new jsonstore(config.jsonstoreToken);

module.exports = {
    name: `summon`,
    description: `Make the bot join your voice channel.`,
    aliases: `s`,
    usage: null,
}

module.exports.run = async(client, message, args) => {
    let channel = message.member.voiceChannel;
    
    if(!channel) return message.channel.send(`${message.author} You are not currently in a voice channel!`);
    else if(message.guild.members.get(client.user.id).voiceChannel) return message.channel.send(`${message.author} I am already in a voice channel!`);

    channel.join()
        .catch(err => { console.log(err);
            message.channel.send(`${message.author} I cannot join that voice channel!`);
        })
        .then(connection => {
            message.channel.send(`${message.author} I have succesfully joined **${channel.name}**!`);
            store.write(`guilds/${message.guild.id}/connection`, JSON.stringify(connection));
        });
}