const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('launches the current mounted game'),
    async execute(interaction) {
        console.log(`Command executed: /play`);
        const ftpAddress = process.env.FTP_ADDRESS; // Your FTP server address from .env

        const URL = `http://${ftpAddress}/play.ps3`;

        try {
            const response = await axios.get(URL);
            // For an unknown reason Discord will reply back with "Interaction Failed" the command was executed successfully
            if (response.status === 200) {
                console.log('The mounted game has been launched.');
            } else {
                // For other non-200 status codes, reply with a failure message
                await interaction.reply('Failed to launch the mounted game.');
            }
        } catch (error) {
            console.error(error);
            await interaction.reply('An error occurred while processing the launch command.');
        }
        
    },
};
