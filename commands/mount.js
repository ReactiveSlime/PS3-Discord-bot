const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mount')
        .setDescription('Mounts an .iso file from the FTP server')
        .addStringOption(option =>
            option.setName('filename')
                .setDescription('Specify the .iso file to mount')
                .setRequired(true)
        ),
    async execute(interaction) {
        const fileName = interaction.options.getString('filename');

        console.log(`Command executed: /mount ${fileName}`);

        const ftpAddress = process.env.FTP_ADDRESS; // Your FTP server address from .env

        if (!fileName.toLowerCase().endsWith('.iso')) {
            await interaction.reply('The specified file must end with .iso.');
            return;
        }

        // Encode the fileName to handle spaces and special characters in the URL
        const encodedFileName = encodeURIComponent(fileName);
        const mountURL = `http://${ftpAddress}/mount.ps3/${encodedFileName}`;

        console.log('Mount URL:', mountURL);

        try {
            const response = await axios.get(mountURL);

            if (response.status === 200) {
                await interaction.reply(`The file ${fileName} has been mounted.`);
            } else {
                await interaction.reply('Failed to mount the specified file.');
            }
        } catch (error) {
            console.error(error);
            await interaction.reply('An error occurred while processing the mount command.');
        }
    },
};
