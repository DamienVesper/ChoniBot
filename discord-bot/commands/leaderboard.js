const Discord = require(`discord.js`);
const Math = require(`math.js`);
const { config } = require(`../index.js`);
let store = client.api.store;

module.exports = {
    name: `leaderboard`,
    description: `View leaderboards!`,
    aliases: [],
    usage: `<required> [not]`,
}

module.exports.run = async(client, message, args) => {}