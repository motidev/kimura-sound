const { ActionRowBuilder, SelectMenuBuilder } = require("@discordjs/builders");
const { EmbedBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "voldownbtn",
  },
  async run(kimuraClient, interaction, language) {
    const queue = kimuraClient.distube.getQueue(interaction.guild.id);

    const embedvol = new EmbedBuilder()
      .setColor(kimuraClient.config.defaultColorEmbed)
      .setDescription(
        kimuraClient.languages.__({ phrase: "volume.down", locale: language })
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


      interaction.reply({ embeds: [embedvol], ephemeral: true });
      await kimuraClient.distube.setVolume(interaction, queue.volume - 5);
  },
};
