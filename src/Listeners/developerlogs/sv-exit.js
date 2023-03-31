const { wssend } = require("../../functions/ws-send");

module.exports = {
  name: "guildDelete",
  async execute(guild) {
      wssend(
        process.env.registerkey,
        `
        Delete SERVER
    ------------------------------------
  
        - Name -> ${guild.name}
        - Owner -> <@${guild.ownerId}>
        - Members -> ${guild.members.cache.size}
        - Id server -> ${guild.id}
      `
      );
  },
};
