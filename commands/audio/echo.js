      //  config('24023eb75646b79a15dada1e9f5d2997', 'https://tiktok-tts.weilnet.workers.dev');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { createReadStream } = require('node:fs');

const { Readable } = require('stream');

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
		)

        .addStringOption(option =>
			option.setName('string2')
				.setRequired(true)
				.setDescription('Wildcard string 2')
		),
			
	async execute(interaction) {
		
		const inputChannel = interaction.options.getChannel('channel')
		const inputString = interaction.options.getString('string')
        const inputString2 = interaction.options.getString('string2')

		let startTime = performance.now()

		
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

		responseTrack.volume.setVolume(0.6)
		//player.play(responseTrack)

        const ENDPOINT = 'https://tiktok-tts.weilnet.workers.dev'
        const req = new XMLHttpRequest()
        req.open('POST', `${ENDPOINT}/api/generation`, false)
        req.setRequestHeader('Content-Type', 'application/json')
        req.send(JSON.stringify({
            text: inputString,
            voice: inputString2
        }))

        let resp = JSON.parse(req.responseText)
        if (resp.data === null) {
            return console.log(`Generation failed: "${resp.error}"`)
        } 

        const generatedVoiceTrack = Buffer.from(resp.data, 'base64')
        //console.log(generatedVoiceTrack)

        const stream = Readable.from(generatedVoiceTrack);

        const streamResource = createAudioResource(stream)
        player.play(streamResource)
        


		
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
				//player.play(streamResource)

			} catch (error) {

				console.log(error)
				interaction.channel.send(error)

			}
		})

		await interaction.reply(`✅ Your command was received. Processing...`)
		
		interaction.channel.send(`⏰ Response processed in ${Math.trunc(performance.now() - startTime)}ms`)
	},
};

/*
What the fucck did you just fuccking say about me you little bittch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Kai-da. I have over 300 confirmed kills and I am trained in gorilla warfare.
*/