
# Discord PS3 Bot

This Discord bot provides functionalities to interact with a PS3 system, including mounting and unmounting game .iso files, and initiating restart/shutdown actions.

## Features

- **Mounting Games**: Mount .iso files from an FTP server to the PS3.
- **Unmounting Games**: Unmount any currently mounted .iso file from the PS3.
- **PS3 Control**: Initiate restart or shutdown actions on the PS3 system.

## Configuration

Before running the bot, make sure to set the following configuration settings:

- `DISCORD_TOKEN`: Discord bot token obtained from the Discord Developer Portal.
- `FTP_ADDRESS`: Address of the FTP server.
- `FILE_SIZE_LIMIT_BYTES`: Maximum file size allowed for mounting in bytes (e.g., 1048576 for 1MB).

Example `.env` file:

```dotenv
DISCORD_TOKEN=your_discord_bot_token_here
FTP_ADDRESS=your_ftp_server_address_here
FILE_SIZE_LIMIT_BYTES=1048576
```
## Installation
To install the required npm packages, run: npm install axios basic-ftp

## Usage
1.  **Start the Bot**: Run the bot using `node .`   .
2.  **Use Bot Commands**:
    -   `/mount <filename>`: Mount an .iso file from the FTP server to the PS3.
    -   `/unmount`: Unmount any currently mounted .iso file from the PS3.
    -   `/restart`: Will restart the PS3
    - `/shutdown`: Will shutdown the PS3
