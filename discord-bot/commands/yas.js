const Discord = require(`discord.js`);
const Math = require(`math.js`);
const jsonstore = require(`jsonstore.io`);
const { config } = require(`../index.js`);
let store = new jsonstore(config.jsonstoreToken);

module.exports = {
    name: `yas`,
    description: `YAS GO OFF QUEEN`,
    aliases: null,
    usage: null,
}

module.exports.run = async(client, message, args) => {
    message.channel.send(`YASSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS`).then(m => setTimeout(() => m.channel.send(`GO OFF QUEEN`), 1e3));
}