const { ActionRowBuilder, SelectMenuBuilder } = require("@discordjs/builders");
const { EmbedBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "stopbtn",
  },
  async run(kimuraClient, interaction, language) {
    const queue = kimuraClient.distube.getQueue(interaction.guild.id);

    const embedstop1 = new EmbedBuilder()
      .setColor(kimuraClient.config.defaultColorEmbed)
      .setDescription(
        kimuraClient.languages.__({ phrase: "stopbtn.2", locale: language })
      );

    const embedstop = new EmbedBuilder()
      .setColor(kimuraClient.config.defaultColorEmbed)
      .setDescription(
        kimuraClient.languages.__({ phrase: "stopbtn.1", locale: language })
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

    if (queue.paused) {
      interaction.reply({ embeds: [embedstop], ephemeral: true });
    } else {
      await kimuraClient.distube.pause(interaction.guild.id);
      interaction.reply({ embeds: [embedstop1], ephemeral: true });
    }
  },
};
