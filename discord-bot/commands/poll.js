const Discord = require(`discord.js`);
const Math = require(`math.js`);
const { config } = require(`../index.js`);
let store = client.api.store;

module.exports = {
    name: `poll`,
    description: `Poll`,
    aliases: [],
    usage: `<required> [not]`,
}

module.exports.run = async(client, message, args) => {
    message.delete();
    let pollMsg = args.join(` `);
    let newPM = await message.channel.send(`Poll: **${pollMsg}**`);
    newPM.react(`✅`).then(() => newPM.react(`❌`));
}