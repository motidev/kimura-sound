const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  codeBlock,
} = require("discord.js");
const userSchema = require("../../models/blacklist");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("blacklist")
    .setDescription("Blacklist command")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) =>
      options
        .setName("add")
        .setDescription("[Owner] command")
        .addStringOption((options) =>
          options.setName("user").setDescription("user").setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("remove")
        .setDescription("[Owner] command")
        .addStringOption((options) =>
          options.setName("user").setDescription("user").setRequired(true)
        )
    ),
  async execute(interaction, kimuraClient) {
    const targetCommand = interaction.options.getSubcommand();

    const { options } = interaction;

    const target = options.getString("user");

    switch (targetCommand) {
      case "add":
        {
          userSchema.findOne(
            {
              userId: target,
            },
            async (data) => {
              new userSchema({
                userId: target,
              }).save();
              interaction.reply({
                content: "User added to blacklist",
                ephemeral: true,
              });
            }
          );
        }
        break;
      case "remove":
        {
            userSchema.findOneAndDelete({ 
                userId: target,
            }, async () => {
                interaction.reply({
                    content: "User removed to blacklist",
                    ephemeral: true,
                  });
            })
        }
        break;
    }
  },
};
