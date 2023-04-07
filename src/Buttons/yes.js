const { ActionRowBuilder, SelectMenuBuilder } = require("@discordjs/builders");
const { EmbedBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "yes",
  },
  async run(kimuraClient, interaction, language) {
    const embedskip = new EmbedBuilder()
      .setColor(kimuraClient.config.defaultColorEmbed)
      .setDescription(
        kimuraClient.languages.__({
          phrase: "skipallbtn.yes",
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

    const embedskip1 = new EmbedBuilder()
      .setColor(kimuraClient.config.defaultColorEmbed)
      .setDescription(
        kimuraClient.languages.__({ phrase: "skipbtn.2", locale: language })
      );

    const queue = kimuraClient.distube.getQueue(interaction.guild.id);

    if (!queue)
      return interaction.reply({ embeds: [embedskip1], ephemeral: true });

    const { channel } = interaction.member.voice;
    const bot = interaction.guild.members.me.voice.channel;

    if (bot && bot !== channel) {
      return interaction.reply({
        embeds: [embedInfo2],
        ephemeral: true,
      });
    }

    await queue.songs.splice(1, queue.songs.length);
    interaction.reply({ embeds: [embedskip], ephemeral: true });
  },
};
