const { SlashCommandBuilder, Embed, EmbedBuilder } = require("discord.js");
const { wssend } = require("../../functions/ws-send");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play music."),
  async execute(interaction, kimuraClient, language ) {


    
  
  },
};
