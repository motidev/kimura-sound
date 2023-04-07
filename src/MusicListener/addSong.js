const { EmbedBuilder } = require("discord.js");

module.exports = async (kimuraClient, queue, song) => {
  const embed = new EmbedBuilder()
    .setDescription(
      kimuraClient.languages.__mf(
        {
          phrase: "music.added",
          locale: "es",
        },
        { title: song.name },
        { duration: song.formattedDuration }
      )
    )
    .setColor(kimuraClient.config.defaultColorEmbed)
    
  await queue.textChannel.send({ embeds: [embed] });
};
