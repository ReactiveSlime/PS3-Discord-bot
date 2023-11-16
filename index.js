require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],
});

client.commands = new Map();

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);

    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        try {
            const command = require(`./commands/${file}`);
            if (!command.data || !command.execute) {
                console.error(`Error loading command from file ${file}. Make sure the file exports 'data' and 'execute'.`);
                continue;
            }

            const registeredCommand = await client.guilds.cache
                .get(process.env.SERVER_ID)
                .commands.create(command.data);

            client.commands.set(command.data.name, command);
            console.log(`Command ${command.data.name}`);
        } catch (error) {
            console.error(`Error loading/commanding file ${file}: ${error}`);
        }
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
    const command = client.commands.get(commandName);

    if (!command) {
        await interaction.reply(`The command '${commandName}' is not registered.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Error executing command '${commandName}': ${error}`);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(process.env.DISCORD_TOKEN);
