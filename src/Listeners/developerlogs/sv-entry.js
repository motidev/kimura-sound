const { wssend } = require("../../functions/ws-send");
module.exports = {
  name: "guildCreate",
  execute(guild) {
    wssend(
      process.env.registerkey,
      `
      NEW SERVER
  ------------------------------------

      - Name -> ${guild.name}
      - Owner -> <@${guild.ownerId}>
      - Members -> ${guild.members.cache.size}
      - Id server -> ${guild.id}
    `
    );
  },
};
