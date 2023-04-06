const { ActionRowBuilder, SelectMenuBuilder } = require("@discordjs/builders");
const { EmbedBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "loopbtn",
  },
  async run(kimuraClient, interaction, language) {
    const queue = kimuraClient.distube.getQueue(interaction.guild.id);

    const embedloop1 = new EmbedBuilder()
      .setColor(kimuraClient.config.defaultColorEmbed)
      .setDescription(
        kimuraClient.languages.__({ phrase: "loopbtn.2", locale: language })
      );

    const embedloop = new EmbedBuilder()
      .setColor(kimuraClient.config.defaultColorEmbed)
      .setDescription(
        kimuraClient.languages.__({ phrase: "loopbtn.1", locale: language })
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

    if (queue.repeatMode === 0) {
      await kimuraClient.distube.setRepeatMode(interaction.guild.id, 1);
      interaction.reply({ embeds: [embedloop], ephemeral: true });
    } else {
      await kimuraClient.distube.setRepeatMode(interaction.guild.id, 0);
      interaction.reply({ embeds: [embedloop1], ephemeral: true });
    }
  },
};
