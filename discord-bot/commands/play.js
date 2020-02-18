const Discord = require(`discord.js`);
const Math = require(`math.js`);
const { config } = require(`../index.js`);
let store = client.api.store;

module.exports = {
    name: `play`,
    description: `Play music via URL.`,
    aliases: [`p`],
    usage: `<url>`,
}

module.exports.run = async(client, message, args) => {
    store.read(`guilds/${message.guild.id}`).then(data => {
        if(!data.connection) return message.channel.send(`${message.author} I am not currently connected to a voice channel!`);

        store.write(`guilds/${message.guild.id}/dispatcher`, connection.playStream(ytdl(args[0])));
    });
}