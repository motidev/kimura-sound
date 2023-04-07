const { ActionRowBuilder, SelectMenuBuilder } = require("@discordjs/builders");
const { EmbedBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "no",
  },
  async run(kimuraClient, interaction, language) {
    const embedskip = new EmbedBuilder()
      .setColor(kimuraClient.config.defaultColorEmbed)
      .setDescription(
        kimuraClient.languages.__({
          phrase: "skipallbtn.no",
          locale: language,
        })
      );

    const embedInfo2 = new EmbedBuilder()
      .setColor(kimuraClient.config.defaultColorEmbed)
      .setDescription(
        kimuraClient.languages.__({
          phrase: "music.samechannel",
          locale: language,
        })
      );

    const { channel } = interaction.member.voice;
    const bot = interaction.guild.members.me.voice.channel;

    if (bot && bot !== channel) {
      return interaction.reply({
        embeds: [embedInfo2],
        ephemeral: true,
      });
    }
    interaction.reply({ embeds: [embedskip], ephemeral: true });
  },
};
