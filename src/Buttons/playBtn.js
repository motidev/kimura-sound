const { ActionRowBuilder, SelectMenuBuilder } = require("@discordjs/builders");
const { EmbedBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
    data: {
      name: 'playbtn'
  },
    async run(kimuraClient , interaction, language) {
      const queue = kimuraClient.distube.getQueue(interaction.guild.id);

      const embedplay1 = new EmbedBuilder()
      .setColor(kimuraClient.config.defaultColorEmbed)
      .setDescription(kimuraClient.languages.__({ phrase: 'playbtn.2', locale: language }))

      const embedplay = new EmbedBuilder()
      .setColor(kimuraClient.config.defaultColorEmbed)
      .setDescription(kimuraClient.languages.__({ phrase: 'playbtn.1', locale: language }))

      const embedInfo2 = new EmbedBuilder()
      .setColor(kimuraClient.config.defaultColorEmbed)
      .setDescription(kimuraClient.languages.__({ phrase: 'music.samechannel', locale: language }))
      
      const { channel } = interaction.member.voice;
      const bot = interaction.guild.members.me.voice.channel;
      
      if(bot && bot !== channel ) { 
        return interaction.reply({
          embeds: [embedInfo2], 
          ephemeral: true
        })
      }

      if(!queue.paused) {
        interaction.reply({embeds: [embedplay] , ephemeral: true})
      } else {
        await kimuraClient.distube.resume(interaction.guild.id);
        interaction.reply({embeds: [embedplay1], ephemeral: true})
      }
    }
  }