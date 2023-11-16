const { SlashCommandBuilder } = require('@discordjs/builders');
const ftp = require('basic-ftp');
const fs = require('fs').promises;
const pathModule = require('path');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ftp')
        .setDescription('Connects to FTP server and lists directory contents or displays a file if specified')
        .addStringOption(option =>
            option.setName('path')
                .setDescription('Specify a path (optional)')
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('file')
                .setDescription('Specify a file (optional)')
                .setRequired(false)
        ),
    async execute(interaction) {
        const client = new ftp.Client();
        const ftpAddress = process.env.FTP_ADDRESS; // Your FTP server address from .env
        const fileSizeLimit = parseInt(process.env.FILE_SIZE_LIMIT_BYTES); // Retrieve file size limit from .env
        const tempDir = './temp'; // Temporary directory path

        try {
            // Create the temporary directory if it doesn't exist
            await fs.mkdir(tempDir, { recursive: true });

            await client.access({
                host: ftpAddress,
                secure: false, // Assuming it's not a secure connection (change if needed)
            });

            let path = interaction.options.getString('path');
            path = path ? path : '/'; // If no path is specified, default to root ('/')
            const fileOption = interaction.options.getString('file');
            if (fileOption) {
                    console.log(`Accessed file: ${path}/${fileOption}`); // Log accessed file
                

                const size = await client.size(`${path}/${fileOption}`);
                if (size < fileSizeLimit) {
                    // Download and display file content if file size is under the specified limit
                    const localPath = pathModule.join(tempDir, pathModule.basename(fileOption));
                    await client.downloadTo(localPath, `${path}/${fileOption}`);
                    const fileContent = await fs.readFile(localPath, 'utf-8');
                    await interaction.reply(`Content of ${path}/${fileOption}:\n\`\`\`${fileContent}\`\`\``);
                    await fs.unlink(localPath);
                } else {
                    // Provide a link to download the file if it exceeds the limit
                    const fileURL = `ftp://${ftpAddress}${path}/${fileOption}`;
                    await interaction.reply(`The file ${fileOption} is larger than ${fileSizeLimit} bytes. You can download it from:\n${fileURL}`);
                }
            } else {
                    console.log(`Accessed folder: ${path}`); // Log accessed folder
                const list = await client.list(path);

                let fileList = '';
                list.forEach(item => {
                    fileList += `${item.name}\n`;
                });

                await interaction.reply(`Files in ${path}:\n\`\`\`${fileList}\`\`\``);
            }
        } catch (error) {
            console.error(error);
            // Display error message in Discord
            await interaction.reply(`An error occurred while processing the FTP command: ${error.message}`);
        } finally {
            client.close();
        }
    },
};