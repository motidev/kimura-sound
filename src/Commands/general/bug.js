const {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  InteractionType,
} = require("discord.js");
const { wssend } = require("../../functions/ws-send");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bug")
    .setDescription("Reporta cualquier bug que suceda con el bot"),
  async execute(interaction) {
    const modal = new ModalBuilder()
      .setTitle("Kimura bug report")
      .setCustomId("bugModal")
      .setComponents(
        new ActionRowBuilder().setComponents(
          new TextInputBuilder()
            .setLabel("Introduce el bug")
            .setCustomId("report")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)
            .setMinLength(10)
            .setMaxLength(500)
        )
      );

    interaction.showModal(modal);

    const modalSubmitInteraction = await interaction.awaitModalSubmit({
      filter: (i) => {
        return true;
      },
      time: 100000,
    });

    modalSubmitInteraction.reply({
      content: "Gracias por reportar el bug",
      ephemeral: true,
    });

    wssend(
      process.env.bugkey,
      `
        Nuevo bug reportado por el usuario <@${modalSubmitInteraction.user.id}>

        ${modalSubmitInteraction.fields.getTextInputValue("report")}
        `
    );
  },
};
