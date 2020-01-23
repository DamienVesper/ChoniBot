const Discord = require(`discord.js`);
const Math = require(`math.js`);
const jsonstore = require(`jsonstore.io`);
const { config } = require(`../index.js`);
let store = new jsonstore(config.jsonstoreToken);

module.exports = {
    name: `.`,
    description: `PERIODT`,
    aliases: [`periodt`],
    usage: null,
}

module.exports.run = async(client, message, args) => {
    return message.channel.send(`PERIODT`);
}