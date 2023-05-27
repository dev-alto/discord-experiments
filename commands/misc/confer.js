const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('confer')
		.setDescription('internal test'),
			
	async execute(interaction) {
		let startTime = performance.now()
		await interaction.reply(`confer init requires a promise callback parameter`)
        interaction.followUp(`success, returning to master`)
		interaction.channel.send(`⏰ Response processed in ${Math.trunc(performance.now() - startTime)}ms`)
	},
};