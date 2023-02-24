const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	} else if (commandName === 'p') {
		await interaction.reply('Perkele!');
	} else if (commandName ==='curse') {
		const curses = [
			'Fuck!',
			'You son of a bitch',
			'Bastard!',
			'Perkele!',
			'My arse!',
			'Asshole!',
			'Motherfucker!',
			'Schieße!',
			'Fuck this shit!',
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
	   }
});

client.login(token);
