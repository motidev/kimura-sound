const { EmbedBuilder } = require("discord.js");

module.exports = async (kimuraClient, queue, playlist) => {
  const embed = new EmbedBuilder()
    .setDescription(
      kimuraClient.languages.__mf(
        {
          phrase: "music.playlist",
          locale: "es",
        },
        { title: playlist.name }
      )
    )
    .setColor(kimuraClient.config.defaultColorEmbed)

  queue.textChannel.send({ embeds: [embed] });

  console.log(playlist)

};
