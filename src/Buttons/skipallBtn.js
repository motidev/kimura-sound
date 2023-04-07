const { ActionRowBuilder, SelectMenuBuilder } = require("@discordjs/builders");
const { EmbedBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  data: {
    name: "skipallbtn",
  },
  async run(kimuraClient, interaction, language) {

    const embedskip = new EmbedBuilder()
      .setColor(kimuraClient.config.defaultColorEmbed)
      .setDescription(
        kimuraClient.languages.__({ phrase: "skipallbtn.advert", locale: language })
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

    const yes = new ButtonBuilder()
      .setCustomId("yes")
      .setStyle(ButtonStyle.Primary)
      .setLabel(`Si`);

    const no = new ButtonBuilder()
      .setCustomId("no")
      .setStyle(ButtonStyle.Danger)
      .setLabel(`No`);

    let components = new ActionRowBuilder().addComponents([
     yes,
     no
    ]);

    interaction.reply({ embeds: [embedskip], components: [components], ephemeral: true });
  },
};
