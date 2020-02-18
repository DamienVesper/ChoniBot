const Discord = require(`discord.js`);
const Math = require(`math.js`);
const { config } = require(`../index.js`);
let store = client.api.store;


module.exports = {
    name: `nani`,
    description: `NANI?!`,
    aliases: null,
    usage: null,
}

module.exports.run = async(client, message, args) => {
    return message.channel.send(`\\*whoosh sound\\*`);
}