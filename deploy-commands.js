const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('p').setDescription('Replies...'),
	new SlashCommandBuilder().setName('curse').setDescription('Replies with a random curse word or phrase'),
	new SlashCommandBuilder().setName('echo').setDescription('Replies with your input'),
	new SlashCommandBuilder().setName('react').setDescription('Reacts with an emoji'),
	new SlashCommandBuilder().setName('react-saima').setDescription('Reacts with a Saimaannorppa emoji'),
	new SlashCommandBuilder().setName('fruits').setDescription('Reacts with fruit emoji'),
	new SlashCommandBuilder().setName('vote').setDescription('Choose thumbs up or down'),
	new SlashCommandBuilder().setName('button').setDescription('Button'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

	rest.put(Routes.applicationCommands(clientId),{ body: commands },)
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

	//rest.delete(Routes.applicationGuildCommand(clientId, guildId, 'commandId'))
	//.then(() => console.log('Successfully deleted guild command'))
	//.catch(console.error);

// for global commands
	//rest.delete(Routes.applicationCommand(clientId, 'commandId'))
	//.then(() => console.log('Successfully deleted application command'))
	//.catch(console.error);