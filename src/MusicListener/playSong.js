const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");

module.exports = (kimuraClient, queue, song) => {
  const embed = new EmbedBuilder()
    .setColor(kimuraClient.config.defaultColorEmbed)
    .setTitle( kimuraClient.languages.__({
      phrase: "music.title",
      locale: "es",
    }))
    .setDescription(`${song.name}`)
    .addFields(
      {
        name: kimuraClient.languages.__({
          phrase: "music.title1",
          locale: "es",
        }),
        value: `\`[${song.formattedDuration}]\``,
        inline: true,
      },
      {
        name: kimuraClient.languages.__({
          phrase: "music.title2",
          locale: "es",
        }),
        value: `${queue.songs[0].user}`,
        inline: true,
      },
      {
        name: kimuraClient.languages.__({
          phrase: "music.title3",
          locale: "es",
        }),
        value: `${queue.songs.length} `,
        inline: true,
      }
    )
    .setFooter({ text: "Powered by Kimura - Dextiny Studio" })
    .setThumbnail(kimuraClient.config.image);

  const stopBtn = new ButtonBuilder()
    .setCustomId("stopbtn")
    .setStyle(ButtonStyle.Secondary)
    .setLabel("⏸");

  const playBtn = new ButtonBuilder()
    .setCustomId("playbtn")
    .setStyle(ButtonStyle.Secondary)
    .setLabel(`▶`);

  const skipBtn = new ButtonBuilder()
    .setCustomId("skipbtn")
    .setStyle(ButtonStyle.Secondary)
    .setLabel(`⏩`);

  const loopBtn = new ButtonBuilder()
    .setCustomId("loopbtn")
    .setStyle(ButtonStyle.Secondary)
    .setLabel(`🔁`);

  const voldownBtn = new ButtonBuilder()
    .setCustomId("voldownbtn")
    .setStyle(ButtonStyle.Secondary)
    .setLabel(`🔉`);

  const volupBtn = new ButtonBuilder()
    .setCustomId("volupbtn")
    .setStyle(ButtonStyle.Secondary)
    .setLabel(`🔊`);

  let components = new ActionRowBuilder().addComponents([
    stopBtn,
    playBtn,
    skipBtn
  ]);

  let components2 = new ActionRowBuilder().addComponents([
    loopBtn,
    voldownBtn,
    volupBtn,
  ]);

  queue.textChannel.send({
    embeds: [embed],
    components: [components, components2],
  });
};
