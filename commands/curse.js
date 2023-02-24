const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = { 
    data: new SlashCommandBuilder()
	    .setName('curse')
	    .setDescription('Replies with a random curse word or phrase'),
    async execute(interaction) {
        const curses = [
            'Fuck!',
            'You son of a bitch',
            'Bastard!',
            'Perkele!',
            'My arse!',
            'Asshole!',
            'Motherfucker!',
            'Schieße!',
            'Fuck this shit!',-
            'God damn it',
            'Fuck you',
           ];
        const response = curses[Math.floor(Math.random() * curses.length)];
        await interaction.reply(response);
	}};