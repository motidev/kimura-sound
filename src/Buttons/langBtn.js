const { ActionRowBuilder, SelectMenuBuilder } = require("@discordjs/builders");
const { EmbedBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
    data: {
      name: 'langbtn'
  },
    async run(kimuraClient , interaction, language) {

      const embed = new EmbedBuilder()
      .setColor(kimuraClient.config.defaultColorEmbed)
      .setTitle(
        kimuraClient.languages.__({
          phrase: "lang.langtitle",
          locale: language,
        })
      )
      .setDescription(
        kimuraClient.languages.__({
          phrase: "lang.langdesc",
          locale: language,
        })
      );

      const langMenu = new ActionRowBuilder().addComponents([
        new StringSelectMenuBuilder()
          .setCustomId("langmenu")
          .setPlaceholder(
            kimuraClient.languages.__({
              phrase: "lang.langselect",
              locale: language,
            })
          )
          .addOptions([
            {
              label: "ES",
              value: "es",
            },
            {
              label: "EN",
              value: "en",
            },
          ]),
      ]);
  
      await interaction.reply({
        embeds: [embed],
        components: [langMenu],
        ephemeral: true,
      });
    }
  }