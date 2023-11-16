const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shutdown')
        .setDescription('shutsdown the PS3'),
    async execute(interaction) {
        const ftpAddress = process.env.FTP_ADDRESS; // Your FTP server address from .env

        const URL = `http://${ftpAddress}/shutdown.ps3`;

        try {
            const response = await axios.get(URL);

            if (response.status === 200) {
                await interaction.reply('The PS3 has been shutdown.');
            } else {
                await interaction.reply('Failed to shutdown the PS3.');
            }
        } catch (error) {
            console.error(error);
            await interaction.reply('An error occurred while processing the shutdown command.');
        }
    },
};
