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
            'Fuck off!',
			'Stupid Dummy McDumb-Face!',
			'Oh poop!',
			'Holy shit!',
			'Buttface',
			'Cunt!',
			'Hey fuckface!',
			'O shit waddup',
			'Damn you all to Hell!',
           ];
        const response = curses[Math.floor(Math.random() * curses.length)];
        await interaction.reply(response);
	}};