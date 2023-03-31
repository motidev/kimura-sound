const { EmbedBuilder } = require("@discordjs/builders");
const guildModel = require("../models/guild")
module.exports = {
    data: {
        name: 'langmenu'
    },
    async run(kimuraClient, interaction, language) {
        const languages = interaction.values[0]

        await guildModel
        .findOne({ guildId: interaction.guildId.toString() })
        .then((s, err) => {
          if (err) return console.log(err);
          if (s) {
            s.lang = languages;
            s.save().catch((e) => console.log(e));
          } else {
            const newGuild = new guildModel({
              guildId: interaction.guildId.toString(),
              lang: languages,
            });
            newGuild.save().catch((e) => console.log(e));
          }
        });

        const langEmbed = new EmbedBuilder()
          .setTitle(
            kimuraClient.languages.__({
              phrase: "menu.langtittle",
              locale: language,
            })
          )
          .setDescription(
            kimuraClient.languages.__mf({
              phrase: "menu.langdesc",
              locale: language,
            }, { lang: languages })
          );

        await interaction.reply({ embeds: [langEmbed], ephemeral: true });
    }
}