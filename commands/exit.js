const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('exit')
        .setDescription('Closes the current game'),
    async execute(interaction) {
        console.log(`Command executed: /exit`);
        const ftpAddress = process.env.FTP_ADDRESS; // Your FTP server address from .env

        const URL = `http://${ftpAddress}/xmb.ps3$exit`;

        try {
            const response = await axios.get(URL);

            if (response.status === 200) {
                await interaction.reply('The current game has closed.');
            } else {
                await interaction.reply('Failed to close the current game.');
            }
        } catch (error) {
            console.error(error);
            await interaction.reply('An error occurred while processing the exit command.');
        }
    },
};
