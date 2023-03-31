const guildmodel = require("../../models/guild.js");
const { wssend } = require("../../functions/ws-send");
const executeButton = require("../../functions/executeButton");
const executeSelectMenu = require("../../functions/executeSelectMenu");
const userSchema = require("../../models/blacklist.js")
module.exports = {
  name: "interactionCreate",
  async execute(interaction, kimuraClient) {

    if (interaction.isButton()) executeButton(kimuraClient, interaction);

    if (interaction.isStringSelectMenu()) executeSelectMenu(kimuraClient, interaction)

    if (interaction.isChatInputCommand()) {
      const command = kimuraClient.commands.get(interaction.commandName);
      if (!command) {
        return interaction.reply({
          content: "This command not enabled",
          ephemeral: true,
        });
      }

      const Guild = interaction.member.guild;

      await guildmodel
        .findOne({ guildId: interaction.guildId })
        .then((s, err) => {
          if (err) return console.log(err);
          if (s) {
            Guild.lang = s.lang;
          } else {
            const newGuild = new guildmodel({
              guildId: interaction.guildId.toString(),
              lang: "es",
            });
            newGuild.save().catch((e) => console.log(e));
          }
        });

      if (interaction.customId == "langbtn") {
        console.log("holAA");
      }

      if (command.developer && interaction.user.id !== "972840062209376306") {
        return interaction.reply({
          content: "This command is only avaible to the developer",
          ephemeral: true,
        });
      }

      const userBlacklisted = await userSchema.findOne({
        userId: interaction.user.id
      })

      if(userBlacklisted) {
        const language = interaction.member.guild.lang;
        
        return interaction.reply({
          content:  kimuraClient.languages.__({
            phrase: "user.blacklist",
            locale: language,
          }),
          ephemeral: true,
        });
      }

      try {
        const language = interaction.member.guild.lang;
        command.execute(interaction, kimuraClient, language);
        wssend(process.env.commandkey, `El usuario con nombre ${interaction.user.username} con id ${interaction.user.id} ha usado el comando ${interaction.commandName}`);
      } catch (err) {
        console.log(err);
        await interaction.reply({
          content: "Something went wrong while executing this command",
          ephemeral: true,
        });
        wssend(process.env.errorkey, `💻 [TRACE] :: Error ${err}`);
      }
    }
  },
};
