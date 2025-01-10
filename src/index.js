const allowedChannelId = '1296384763484962836';
require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent,
    ],
});
client.on('ready', (c) => {
    console.log(`${c.user.tag} is online.`);
});
client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) {
        return;
    }
    if (interaction.channel.id !== allowedChannelId) {
        interaction.reply({ content: 'This bot can only be used in a specific channel.', ephemeral: true });
        return;
    }
    console.log(interaction.commandName);
    if (interaction.commandName === 'welcome') {
        const targetUser = interaction.options.getUser('user') || interaction.user;
        const embed = new EmbedBuilder()
            .setTitle('🎉 Welcome to **TedxMRU**! 🎉')
            .setDescription(`Hi ${targetUser},\n\nWe're thrilled to have you join our community of innovators, thinkers, and changemakers. 🌍\n\nFeel free to explore the channels, share your ideas, and get inspired by like-minded individuals. Let's create impactful conversations and drive positive change together. 🚀\n\nIf you need any help, don't hesitate to reach out. Enjoy your time here!`)
            .setColor('#E62B1E')
            .setFooter({ text: 'TedxMRU | Where ideas ignite action!' })
            .setImage('https://i.imgur.com/AlWzTdW.jpeg');
        interaction.reply({ content: `${targetUser}`, embeds: [embed] });
    }
});
client.on('guildMemberAdd', (member) => {
    console.log(`${member.user.tag} has joined the server.`);
    if (member.user.bot) {
        return;
    }
    const channel = member.guild.channels.cache.get(allowedChannelId);
    if (!channel) {
        console.error('Welcome channel not found.');
        return;
    }
    const embed = new EmbedBuilder()
        .setTitle('🎉 Welcome to **TedxMRU**! 🎉')
        .setDescription(`Hi <@${member.id}>,\n\nWe're thrilled to have you join our community of innovators, thinkers, and changemakers. 🌍\n\nFeel free to explore the channels, share your ideas, and get inspired by like-minded individuals. Let's create impactful conversations and drive positive change together. 🚀\n\nIf you need any help, don't hesitate to reach out. Enjoy your time here!`)
        .setColor('#E62B1E')
        .setFooter({ text: 'TedxMRU | Where ideas ignite action!' })
        .setImage('https://i.imgur.com/AlWzTdW.jpeg');
    channel.send({ content: `<@${member.id}>`, embeds: [embed] })
        .then(() => console.log('Welcome message sent successfully.'))
        .catch((error) => console.error(`Failed to send message: ${error}`));
});
client.login(process.env.TOKEN);