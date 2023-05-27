const { SlashCommandBuilder } = require('discord.js')

let lastTime

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timer')
		.setDescription('internal test'),
			
	async execute(interaction) {
		const startTime = performance.now()
        
        if (lastTime) {
            interaction.channel.send("mark end " + (startTime - lastTime).toString() + "ms recorded") 
            lastTime = null
        } else {
            interaction.channel.send("marked") 
            lastTime = startTime
        }

		await interaction.reply(`⏰ Response processed in ${Math.trunc(performance.now() - startTime)}ms`)
	},
};