
module.exports = async (kimuraClient, interaction) => {
    const selectMenuId = interaction.customId
    const selectMenu = kimuraClient.selectMenus.get(selectMenuId)

    if (!selectMenu) return

    try {
        const language = interaction.member.guild.lang
        await selectMenu.run(kimuraClient, interaction, language)
    } catch (e) {
        console.error(e)
        return interaction.reply({ content: 'Ha surgido un error al ejecutar el comando.' })
    }
}