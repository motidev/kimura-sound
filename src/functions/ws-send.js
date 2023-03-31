const { WebhookClient } = require("discord.js");

async function wssend(key, value) {
  const wsClient = new WebhookClient({ url: key });

  await wsClient.send({
    content: `${value}`
  });
}


module.exports = {wssend}