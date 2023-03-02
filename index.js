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
		else if (commandName === 'react-custom') {
			const message = await interaction.reply({ content: 'I can react with custom emoji!', fetchReply: true });
			message.react('1080878662448070717');
		} 
			
});

client.login(token);

const { ActivityType } = require('discord.js');
//client.user.setActivity('activity', { type: ActivityType.Watching });
//client.user.setActivity(ActivityType, { name: 'Chilling' }