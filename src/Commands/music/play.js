const { SlashCommandBuilder, Embed, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription(
      "Play music from a supported URL or search a query on SoundCloud or Spotify."
    )
    .addStringOption((options) =>
      options
        .setName("song")
        .setDescription("Supported URL or search query")
        .setRequired(true)
    ),
  async execute(interaction, kimuraClient, language) {
    const { options } = interaction;
    const { channel } = interaction.member.voice;
    const target = options.getString("song");

    const embedSearch = new EmbedBuilder()
      .setColor(kimuraClient.config.defaultColorEmbed)
      .setDescription(
        kimuraClient.languages.__mf(
          { phrase: "music.add", locale: language },
          { song: target }
        )
      );

    const embedInfo = new EmbedBuilder()
      .setColor(kimuraClient.config.defaultColorEmbed)
      .setDescription(
        kimuraClient.languages.__({
          phrase: "music.voiceChannel",
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

    const bot = interaction.guild.members.me.voice.channel;

    if (!channel)
      return interaction.reply({
        embeds: [embedInfo],
        ephemeral: true,
      });

    if (bot && bot !== channel) {
      return interaction.reply({
        embeds: [embedInfo2],
        ephemeral: true,
      });
    } else {
      await interaction.reply({ embeds: [embedSearch] });
    }

    const optionsMusic = {
      member: interaction.member,
      textChannel: interaction.channel,
      interaction,
    };

    kimuraClient.distube.play(
      interaction.member.voice.channel,
      target,
      optionsMusic
    );
  },
};
