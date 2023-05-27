const { config, createAudioFromText } = require('tiktok-tts')
        
config('24023eb75646b79a15dada1e9f5d2997', 'https://tiktok-tts.weilnet.workers.dev');

const { createReadStream } = require('node:fs');

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

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('internal test')

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
		
		joinVoiceChannel({
			channelId: inputChannel.id,
			guildId: inputChannel.guild.id,
			adapterCreator: inputChannel.guild.voiceAdapterCreator,
		})
		const connection = getVoiceConnection(inputChannel.guild.id)

		const player = createAudioPlayer({
			behaviors: {
				noSubscriber: NoSubscriberBehavior.Pause,
			},
		})
		connection.subscribe(player)

		const responseTrack = createAudioResource(`./assets/audio/received.mp3`, {inlineVolume: true})
		const errorTrack = createAudioResource(`./assets/audio/error.mp3`)
		const endTrack = createAudioResource(`./assets/audio/end.mp3`)

        const generatedVoiceTrack = await createAudioFromText(inputString)
        console.log(generatedVoiceTrack)
		const streamResource = createAudioResource(createReadStream(generatedVoiceTrack))
        
		responseTrack.volume.setVolume(0.6)
		player.play(responseTrack)
		
		player.once(AudioPlayerStatus.Idle, () => {
			try {
				//const info = await ytdl.getInfo(videoID);
				player.on('error', error => {
					console.error(':octagonal_sign: Error:', error.message);
					player.play(errorTrack)
				});
				player.once(AudioPlayerStatus.Idle, () => {
					console.log('The audio file has ended.')
					player.play(endTrack)
				})
				player.play(streamResource)

			} catch (error) {

				console.log(error)
				interaction.channel.send(error)

			}
		})

		await interaction.reply(`✅ Your command was received. Processing...`)
		
		interaction.channel.send(`⏰ Response processed in ${Math.trunc(performance.now() - startTime)}ms`)
	},
};