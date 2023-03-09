const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, Partials, GuildMember, Role, ActionRowBuilder, ButtonBuilder, ButtonStyle, Collector } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ 
// Need to check which intents I really need/only add the ones I really need
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildEmojisAndStickers, 
		GatewayIntentBits.GuildMembers, 
		GatewayIntentBits.GuildMessageReactions, 
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildModeration
	],
	partials: [
		Partials.Message,
		Partials.Channel,
		Partials.Reaction,
		Partials.GuildMember,
		Partials.User
	]
	 });
	 
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}



client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	}
	else if (commandName === 'server') {
		await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
	}
	else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	}
	else if (commandName === 'p') {
		await interaction.reply('Perkele!');
	}
	else if (commandName === 'curse') {
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
			'Dickhead!',
			'Fuckwit!',
			'Bollocks',
			'Fuck this fucking fuck',
			'Fucking shit balls',
			'Poophead!',
			'Madrachode!',
			'Mother toad!',
			'Damn',
			'Oh heck',
			'Frak',
		];
		const response = curses[Math.floor(Math.random() * curses.length)];
		await interaction.reply(response);
	}
	else if (commandName === 'react') {
		const message = await interaction.reply({ content: 'I can react with Unicode emojis!', fetchReply: true });
		message.react('😄');
	}
	else if (commandName === 'react-saima') {
		const message = await interaction.reply({ content: 'I can react with an emoji of myself!', fetchReply: true });
		message.react('1078002115353526303');
	} 
	else if (commandName === 'fruits') {
		const message = await interaction.reply({ content: 'Reacting with fruits!', fetchReply: true });
		message.react('🍎')
			.then(() => message.react('🍊'))
			.then(() => message.react('🍇'))
			.catch(() => console.error('One of the emojis failed to react.'));
	}
	else if (interaction.commandName === 'vote') {
		const message = await interaction.reply({ content: 'Awaiting emojis...', fetchReply: true });
		message.react('👍').then(() => message.react('👎'));

		const filter = (reaction, user) => {
			return ['👍', '👎'].includes(reaction.emoji.name) && user.id === interaction.user.id;
		};

		message.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
			.then(collected => {
				const reaction = collected.first();

				if (reaction.emoji.name === '👍') {
					interaction.followUp('You reacted with a thumbs up.');
				} else {
					interaction.followUp('You reacted with a thumbs down.');
				}
			})
			.catch(collected => {
				console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
				interaction.followUp(`After a minute, only ${collected.size} out of 4 reacted.`);
			});
	}

	if (interaction.commandName === 'button') {
		const wait = require('node:timers/promises').setTimeout;
		const filter = i => i.customId === 'primary' && i.user.id === '122157285790187530';
		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 }); 
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('Click me!')
					.setStyle(ButtonStyle.Primary),
			);

		await interaction.Reply({ content: 'I think you should', components: [row] })
		collector.on('collect', async i => {
			if (i.customId === 'primary') {
				await i.deferUpdate();
				await wait(1000);
				await i.editReply({ content: 'A button was clicked!', components: [] });
			}

		});
		collector.on('end', async collected => {
			console.log(`Collected ${collected.size} items`);
			await interaction.followUp(`Collected ${collected.size} clicks!`);
		});
	}
	if (!interaction.isUserContextMenuCommand()) return;
		const { username } = interaction.targetUser;
		console.log(username);
		const message = await interaction.reply(`hello`)

});

client.login(token);

const { ActivityType } = require('discord.js');
//client.user.setActivity('activity', { type: ActivityType.Watching });
//client.user.setActivity(ActivityType, { name: 'Chilling' }