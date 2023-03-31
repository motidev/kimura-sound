const { SlashCommandBuilder, Embed, EmbedBuilder } = require("discord.js");
const { wssend } = require("../../functions/ws-send");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription("View your profile.")
    .addUserOption((options) =>
      options.setName("user").setDescription("User to see profile.")
    ),
  async execute(interaction, kimuraClient, language ) {
    const user = interaction.options.getUser("user") || interaction.user;
    const member = await interaction.guild.members.fetch(user.id);

    const embed = new EmbedBuilder()
      .setColor(kimuraClient.config.defaultColorEmbed)
      .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
      .addFields(
        { 
          name: kimuraClient.languages.__({ phrase: 'profilecommand.userid', locale: language }), 
          value: `${user.id}` },
        {
          name: kimuraClient.languages.__({ phrase: 'profilecommand.userrole', locale: language }), 
          value: `${member.roles.cache.map((r) => r).join(``)}`,
        },
        {
          name: kimuraClient.languages.__({ phrase: 'profilecommand.member', locale: language }), 
          value: `<t:${parseInt(user.createdTimestamp / 1000)}:R>`,
          inline: true,
        },
        {
          name: kimuraClient.languages.__({ phrase: 'profilecommand.server', locale: language }), 
          value: `<t:${parseInt(member.joinedAt / 1000)}:R>`,
          inline: true,
        },
        {
          name: kimuraClient.languages.__({ phrase: 'profilecommand.banner', locale: language }), 
          value: user.bannerURL() ? "** **" :  kimuraClient.languages.__({ phrase: 'profilecommand.nobanner', locale: language }),
        }
      );

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
