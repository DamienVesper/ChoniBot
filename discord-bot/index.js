/* Network-Installed Dependencies */
const Discord = require(`discord.js`);
const Math = require(`math.js`);
const jsonstore = require(`jsonstore.io`);
const fs = require(`fs`);
const dotenv = require(`dotenv`).config();

/* Client Config */
let client = new Discord.Client({ disableEveryone: true });
var config = {
    colors: {
        success: 0x00ff00,
        primary: 0x1e90ff,
        warning: 0xffa500,
        danger: 0xff0000
    },
	developer: `DamienVesper`,
	developerTag: `4927`,
    developerID: `386940319666667521`,
    hostname: `gateway.discord.gg`,
	prefix: `r!`,
	token: process.env.DISCORD_BOT_TOKEN,
    jsonstoreToken: process.env.JSONSTORE_TOKEN,
    version: `0.0.1b`,
    footer: `© Lukron 2020 | v`
}
config.footer += config.version;

module.exports = {
    config: config,
    client: client
}
let store = new jsonstore(config.jsonstoreToken);
client.api = require(`./api.js`);
client.bus = require(`../bus.js`);

/* Client Events */
client.on(`ready`, async () => {
    console.log(`${client.user.username}#${client.user.discriminator} has started, with ${client.users.size} users in ${client.guilds.size} servers at ${config.hostname}.`);
    client.channels.get(``).send(`LE CHONI BOT HAS ARRIVED WITH LE TOKEN.`);
    refreshActivity();
});

/* Client Commands */
client.events = new Discord.Collection();
fs.readdir(`./discord-bot/events/`, (err, files) => {
    if(err) console.error(err);

    let jsFiles = files.filter(f => f.split(`.`).pop() == `js`);
    if(jsFiles.length <= 0) return console.log(`No commands to load!`);

    /* Load Commands */
    jsFiles.forEach(f => client.events.set(f.split(`.`)[0], require(`./events/${f}`)));
    console.log(`[${client.shard.id}]: Loaded ${jsFiles.length} event${jsFiles.length === 1 ? ``: `s`}!`);
});

/* Client Commands */
client.commands = new Discord.Collection();
fs.readdir(`./discord-bot/commands/`, (err, files) => {
    if(err) console.error(err);

    let jsFiles = files.filter(f => f.split(`.`).pop() == `js`);
    if(jsFiles.length <= 0) return console.log(`No commands to load!`);

    /* Load Commands */
    jsFiles.forEach(f => {
        let props = require(`./commands/${f}`);
        client.commands.set(props.name, props);
    });
    console.log(`[${client.shard.id}]: Loaded ${jsFiles.length} command${jsFiles.length === 1 ? ``: `s`}!`);
});

/* Client Checks */
const refreshActivity = async() => {
	client.user.setPresence({
        game: {
            name: `Riverdale with ${client.users.size} people!`,
            type: `Watching`
        },
        status: `dnd`
	});
}

client.on(`message`, async message => {
    /* Botception & Message Handling */
    if(message.author.bot || message.channel.type == `dm`) return;
    if(message.content.slice(0, config.prefix.length).toString().toLowerCase() != config.prefix) return;

    /* Get Commands & Arguments */
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    /* Validate Commands */
    let cmd = client.commands.get(command);

    if(!cmd) return;
    else if((cmd.usage) && args.length < (cmd.usage.split(`<`).length) - 1) return message.channel.send(`${message.author} Proper usage is \`${config.prefix + cmd.name} ${cmd.usage}\`.`);
    else {
        try {
            console.log(`${message.author.tag} ran command ${command} in ${message.guild.name} [${message.guild.id}] on shard ${client.shard.id}.`);
            cmd.run(client, message, args);
        }
        catch(err) { console.log(`There was an error executing command ${command} by ${message.author.tag}.`) }
    }
});

client.login(config.token);