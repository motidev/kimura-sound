
/**
 * @param {import('discord.js').Client} kimuraClient 
 * @param {import('discord.js').ChatInputCommandInteraction} interaction 
 */
module.exports = async (kimuraClient, interaction) => {
    const buttonId = interaction.customId
    const button= kimuraClient.buttons.get(buttonId)

    if (!button) return

    try {
        const language = interaction.member.guild.lang
        await button.run(kimuraClient, interaction, language)
    } catch (e) {
        console.error(e)
        return interaction.reply({ content: 'Ha surgido un error al ejecutar el comando.' })
    }
}