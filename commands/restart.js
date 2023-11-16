const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('restart')
        .setDescription('Restarts the PS3'),
    async execute(interaction) {
        const ftpAddress = process.env.FTP_ADDRESS; // Your FTP server address from .env

        const URL = `http://${ftpAddress}/restart.ps3`;

        try {
            const response = await axios.get(URL);

            if (response.status === 200) {
                await interaction.reply('PS3 resarted.');
            } else {
                await interaction.reply('Failed to restart PS3.');
            }
        } catch (error) {
            console.error(error);
            await interaction.reply('An error occurred while processing the restart command.');
        }
    },
};
