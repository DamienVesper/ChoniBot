const Discord = require(`discord.js`);
const Math = require(`math.js`);
const { config } = require(`../index.js`);
let store = client.api.store;

const fs = require(`fs`);

module.exports = {
    name: `dev`,
    description: `Commands for developer.`,
    aliases: null,
    usage: null
}

module.exports.run = async(client, message, args) => { 
    if(message.author.id != config.developerID) return;

    switch(args.shift()) {
        case `reboot`:
            message.channel.send(`${message.author} Succesfully rebooted all shards!`);
            return client.bus.emit(`shard-reboot`);
        case `kill`:
            message.channel.send(`${message.author} Succesfully killed all shards!`);
            return client.bus.emit(`shard-kill`);
        case `reload`:
            if(!client.commands.get(args[0])) return message.channel.send(`${message.author} That command doesn't exist!`);

            let props = require(`./${args[0]}`);
            client.commands.set(props.name, props);
            return message.channel.send(`${message.author} Succesfully reloaded command \`${args[0]}\`.`);
        case `remake`:
            message.channel.send(`${message.author} Remaking commands...`).then(() => {
                fs.readdir(`./discord-bot/commands/`, (err, files) => {
                    if(err) console.error(err);
                
                    let jsFiles = files.filter(f => f.split(`.`).pop() == `js`);
                    if(jsFiles.length <= 0) return console.log(`No commands to load!`);
                
                    /* Load Commands */
                    jsFiles.forEach(f => {
                        let props = require(`./${f}`);
                        client.commands.set(props.name, props);
                    });
                    console.log(`[${client.shard.id}]: Loaded ${jsFiles.length} command${jsFiles.length === 1 ? ``: `s`}!`);
                });
            });
            break;
        case `shutdown`:
            message.channel.send(`${message.author} Shutting down bot...`);
            return client.destroy();
    }
}