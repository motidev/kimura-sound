const {
  SlashCommandBuilder,
  ActionRowBuilder,
  UserSelectMenuBuilder,
  ChannelSelectMenuBuilder,
  EmbedBuilder,
  ButtonBuilder,
  SelectMenuOptionBuilder,
  SelectMenuBuilder,
  ButtonStyle,
  PermissionsBitField,
} = require("discord.js");

const guildModel = require("../../models/guild");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Open the setup menu."),
  async execute(interaction, kimuraClient, language) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({
        content: kimuraClient.languages.__({
          phrase: "permissions.admin",
          locale: language,
        }),
        ephemeral: true,
      });
    }

    // Creamos nuestros embeds
    const embed = new EmbedBuilder()
      .setColor(kimuraClient.config.defaultColorEmbed)
      .setThumbnail("https://cdn.discordapp.com/attachments/1046214334545661952/1082980893846687744/logo_oficial.png")
      .setTitle(
        kimuraClient.languages.__({
          phrase: "menu.title",
          locale: language,
        })
      )
      .addFields(
        {
          name: kimuraClient.languages.__({ phrase: 'lang.langtitle', locale: language }),
          value: kimuraClient.languages.__({ phrase: 'menu.menulang', locale: language })
        }
      )

    // Botones de nuestro menu de configuracion

    const langBtn = new ActionRowBuilder().addComponents([
      new ButtonBuilder()
        .setCustomId("langbtn")
        .setStyle(ButtonStyle.Success)
        .setLabel(
          kimuraClient.languages.__({
            phrase: "menu.langBtn",
            locale: language,
          })
        ),
    ]);

    await interaction.reply({
      embeds: [embed],
      components: [langBtn],
      ephemeral: true,
    });
  },
};
