require('dotenv').config();
const { REST, Routes, version, Options } = require('discord.js');
const commands = [
    {
        name: 'welcome',
        description: 'welcomes the user',
        options: [
            {
                name: 'user',
                description: 'user to welcome',
                type: 6,
                require: false,
            },
        ],
    },
];
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
(async () => {
    try {
        console.log('Registering Command.');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )
        console.log('Command Registered.');
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})();