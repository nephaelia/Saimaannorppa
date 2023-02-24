const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('curse').setDescription('Replies with a random curse word or phrase'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('p').setDescription('Replies...'),
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

	rest.put(Routes.applicationCommands(clientId),{ body: commands },)
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);