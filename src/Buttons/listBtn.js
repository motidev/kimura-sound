const { ActionRowBuilder, SelectMenuBuilder } = require("@discordjs/builders");
const { EmbedBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "listbtn",
  },
  async run(kimuraClient, interaction, language) {
    const queue = kimuraClient.distube.getQueue(interaction.guild.id);

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

    const pagesNum = Math.ceil(queue.songs.length / 10);
    if (pagesNum === 0) pagesNum = 1;

    const songStrings = [];
    for (let i = 1; i < queue.songs.length; i++) {
      const song = queue.songs[i];
      songStrings.push(
        `_${i}._ **${song.name}** \`[${song.formattedDuration}]\`
        `
      );
    }

    const pages = [];
    for (let i = 0; i < pagesNum; i++) {
      const str = songStrings.slice(i * 10, i * 10 + 10).join("");
      const embed = new EmbedBuilder()
      .setTitle(
        kimuraClient.languages.__({
          phrase: "list.title",
          locale: language,
        })
      )
        .setThumbnail(queue.songs[0].thumbnail)
        .setColor(kimuraClient.config.defaultColorEmbed)
        .addFields(
          {
            name: kimuraClient.languages.__({
              phrase: "music.title3",
              locale: language,
            }),
            value: `${queue.songs.length}`,
            inline: true
          },
          {
            name: kimuraClient.languages.__({
              phrase: "music.title1",
              locale: language,
            }),
            value: `${queue.formattedDuration}`,
            inline: true
          }
        )
        .addFields(
          {
            name: kimuraClient.languages.__({
              phrase: "list.now",
              locale: language,
            }),
            value: `\n**${queue.songs[0].name}** \`[${queue.songs[0].formattedDuration}]\`\n\n`,
          },
          {
            name: kimuraClient.languages.__({
              phrase: "list.rest",
              locale: language,
            }),
            value: `${str == "" ? "  Nothing" : "\n" + str}`,
          }
        )
        .setFooter({ text: "Powered by Kimura - Dextiny Studio" })

      pages.push(embed);
    }

    interaction.reply({
      embeds: [pages[0]],
      ephemeral: true,
    });
  },
};
