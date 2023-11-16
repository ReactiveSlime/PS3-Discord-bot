const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmount')
        .setDescription('Unmounts any mounted .iso file from the FTP server'),
    async execute(interaction) {
        const ftpAddress = process.env.FTP_ADDRESS; // Your FTP server address from .env

        const URL = `http://${ftpAddress}/mount.ps3/unmount`;

        try {
            const response = await axios.get(URL);

            if (response.status === 200) {
                await interaction.reply('The mounted file has been unmounted.');
            } else {
                await interaction.reply('Failed to unmount any mounted file.');
            }
        } catch (error) {
            console.error(error);
            await interaction.reply('An error occurred while processing the unmount command.');
        }
    },
};
