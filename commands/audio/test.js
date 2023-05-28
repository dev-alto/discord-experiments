const fs = require('node:fs')
const path = require('path')

const { 
	SlashCommandBuilder, 
	ChannelType  
} = require('discord.js');

const { 
	//VoiceConnectionStatus,
	AudioPlayerStatus,
	getVoiceConnection,
	joinVoiceChannel, 
	createAudioResource, 
	createAudioPlayer, 
	NoSubscriberBehavior, 
	AudioPlayerError
} = require('@discordjs/voice');

const ytdl = require('ytdl-core');
const soundboardDirectory = "./assets/audio/soundboard"

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Replies with Pong!')

		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('The channel to join')
				.setRequired(true)
				.addChannelTypes(ChannelType.GuildVoice)
		)
		
		.addStringOption(option =>
			option.setName('string')
				.setRequired(true)
				.setDescription('Wildcard string')
		),
			
	async execute(interaction) {
		
		const inputChannel = interaction.options.getChannel('channel')
		const inputString = interaction.options.getString('string')
		const optionsList = interaction.options._hoistedOptions

		let startTime = performance.now()

		let optionsListString = ``
		for (let i = 0; i < optionsList.length; i++) {
			const option = optionsList[i]
			const optionName = option.name
			const optionValue = option.value
			console.log(`Option "${optionName}" passed as: \`${optionValue}\``)
			optionsListString += `:arrow_forward: Option **${optionName}** passed as: \`${optionValue}\` \n`
		}
		interaction.channel.send(optionsListString)
		
		let connection = getVoiceConnection(inputChannel.guild.id) 

		if (!connection) {
			connection = joinVoiceChannel({
				channelId: inputChannel.id,
				guildId: inputChannel.guild.id,
				adapterCreator: inputChannel.guild.voiceAdapterCreator,
			})
		}
	
		const player = createAudioPlayer({
			behaviors: {
				noSubscriber: NoSubscriberBehavior.Pause,
			},
		})
		
		connection.subscribe(player)

		const responseTrack = createAudioResource(`./assets/audio/received.mp3`)
		const errorTrack = createAudioResource(`./assets/audio/error.mp3`)
		const endTrack = createAudioResource(`./assets/audio/end.mp3`)
		let streamResource
			
		player.once(AudioPlayerStatus.Idle, () => {

			if (inputString.search("www.youtu") != -1) {

				const stream = ytdl(inputString, { 
					filter: 'audioonly',
					highWaterMark: 1<<25
				})
				streamResource = createAudioResource(stream, {inlineVolume: true})
	
			} else {
	
				interaction.channel.send(`:warning: Unexpected input \`string\` value received. Falling back...`)
				let foundTrack;
				let files = fs.readdirSync(soundboardDirectory)
	
				files.forEach(file => {
					if (file == inputString) {
						foundTrack = soundboardDirectory + "/" + file
						console.log("yes " + foundTrack)
					}
				})
		
				if (foundTrack == null) {
					return interaction.channel.send(`:stop_sign: Fallback failed. Terminating.`)
				}
				interaction.channel.send(`:link: Fallback reached. Continuing.`)
				streamResource = createAudioResource(foundTrack)//, {inlineVolume: true})
				
			}
	
			try {
				//const info = await ytdl.getInfo(videoID);
				player.on('error', error => {
					console.error(':octagonal_sign: Error:', error.message);
					player.play(errorTrack)
				});
				player.once(AudioPlayerStatus.Idle, () => {
					console.log("The track has ended.")
					player.play(endTrack)
				})
				player.play(streamResource)
	
			} catch (error) {
	
				console.log(error)
				interaction.channel.send(error)
	
			}

		})
		
		player.play(responseTrack)

		await interaction.reply(`✅ Your command was received. Processing...`)
		
		interaction.channel.send(`⏰ Response processed in ${Math.trunc(performance.now() - startTime)}ms`)
	},
};




/*

fs.readdir(soundboardDirectory, (err, files) => {
				files.forEach(file => {
					// get the details of the file 
					let fileDetails = fs.lstatSync(path.resolve(soundboardDirectory, file));
					// check if the file is directory 
					if (fileDetails.isDirectory()) {
						console.log('Directory: ' + file);
					} else {
						console.log('File: ' + file);
					}
				});
			});


const streamUrl = 'http://www.youtube.com/watch?v=4KkLuRFtuCc'
//xo0ky8FomoU
//fU4zb23tKLM

/*
		connection.on(VoiceConnectionStatus.Connecting, () => {
			console.log('The connection has entered the Connecting state!');
			interaction.followUp('The connection has entered the Connecting state!');
		});

		connection.on(VoiceConnectionStatus.Signalling, () => {
			console.log('The connection has entered the Signalling state!');
			interaction.followUp('The connection has entered the Signalling state!');
		});

		connection.on(VoiceConnectionStatus.Ready, () => {
			console.log('The connection has entered the Ready state - ready to play audio!');
			interaction.followUp('The connection has entered the Ready state - ready to play audio!');
		});
*/


