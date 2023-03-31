const { SlashCommandBuilder, PermissionFlagsBits, codeBlock } = require("discord.js");
const { inspect } = require("util");

const { wssend } = require("../../functions/ws-send");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName("dev")
    .setDescription("Development command")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) => options
        .setName("eval")
        .setDescription("Development command")
        .addStringOption((options) => options
            .setName("code")
            .setDescription("Code")
            .setRequired(true)
        )
    )
    .addSubcommand((options) => options 
        .setName("ping")
        .setDescription("Development command")
    ),
    async execute(interaction, kimuraClient) {
        const targetCommand = interaction.options.getSubcommand();

        switch(targetCommand) {
            case "eval": {
                const { options } = interaction;

                const target = options.getString("code")
        
                try{ 
                    const result = await eval(target)
                    let output = result;
                    if(typeof result !=+ "string") {
                        output = inspect(result, { depth: 0});
                    }
        
                    interaction.reply({
                        content: codeBlock('js', output),
                        ephemeral: true
                    })
        
                    
                } catch (e) {
                    interaction.reply({
                        content: "Ha surgido un error al evaluar.",
                        ephemeral: true
                    })
                    wssend(process.env.evalkey , `💻 [TRACE] :: Eval command ${e}`);
                }
            }
            break;
            case "ping": {
                interaction.reply({
                    content: `${kimuraClient.ws.ping} ms`,
                    ephemeral: true
                })
            }
            break;
        }
        
      

    }
}