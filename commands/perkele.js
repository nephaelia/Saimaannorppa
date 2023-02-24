const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('p')
		.setDescription('Replies...'),
	async execute(interaction) {
		await interaction.reply('Perkele!');
	},
};
