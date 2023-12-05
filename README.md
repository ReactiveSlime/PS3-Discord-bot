
  
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
The following npm packages are required 
 - axios
 - basic-ftp
 - discord.js

## Usage
1.  **Start the Bot**: Run the bot using `node .`   .
2.  **Use Bot Commands**:
    - `/mount </path/to/game/file>`: Mount an .iso file to the PS3.
	    - `/mount console:PS1/2/3 filename:<file.iso>`: Will mount the iso file with the file name in the respective PS ISO directory. e.g. /dev_hdd0/PSXISO for PS1, /dev_hdd0/PS2ISO for PS2 and /dev_hdd0/PS3ISO for PS3. Mounting a game this way does not require the full folder path
    - `/unmount`: Unmount any currently mounted .iso file from the PS3.
    - `/restart`: Will restart the PS3
    - `/shutdown`: Will shutdown the PS3
    - `/exit`: Will exit the current PS3 game
    - `/play`: Will launch the current mounted game

## Known Bugs
A command will take around 20 seconds to load. when I disabled the command another random one will take 20 seconds
`/play` discord will reply back with `Interaction Failed` but the command does execute with no issues 
