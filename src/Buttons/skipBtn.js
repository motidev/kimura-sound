const { ActionRowBuilder, SelectMenuBuilder } = require("@discordjs/builders");
const { EmbedBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "skipbtn",
  },
  async run(kimuraClient, interaction, language) {
    const queue = kimuraClient.distube.getQueue(interaction.guild.id);

    const embedskip1 = new EmbedBuilder()
      .setColor(kimuraClient.config.defaultColorEmbed)
      .setDescription(
        kimuraClient.languages.__({ phrase: "skipbtn.2", locale: language })
      );

    const embedskip = new EmbedBuilder()
      .setColor(kimuraClient.config.defaultColorEmbed)
      .setDescription(
        kimuraClient.languages.__({ phrase: "skipbtn.1", locale: language })
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

    if (queue.songs.length === 1 && queue.autoplay === false) {
      interaction.reply({ embeds: [embedskip1], ephemeral: true });
    } else {
      await kimuraClient.distube.skip(interaction.guild.id);
      interaction.reply({ embeds: [embedskip], ephemeral: true });
    }
  },
};
