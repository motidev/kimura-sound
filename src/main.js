require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { join } = require("path");
const config = require("./config/config.json");

//Intents
const kimuraClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildWebhooks,
  ],
});

// Listener
const { loadListeners } = require("./Core/ListenerHandler");
kimuraClient.events = new Collection();
loadListeners(kimuraClient);

// Buttons
const { loadButtons } = require("./Core/ButtonHandler.js");
loadButtons(kimuraClient);
kimuraClient.buttons = new Collection();

//selects
const { loadSelect } = require("./Core/SelectHandler.js");
loadSelect(kimuraClient);
kimuraClient.selectMenus = new Collection();

//commands collection
kimuraClient.commands = new Collection();

//Languages
kimuraClient.languages = require("i18n");
kimuraClient.languages.configure({
  locales: ["en", "es"],
  directory: join(__dirname, "locales"),
  defaultLocale: config.defaultLanguage,
  retryInDefaultLocale: true,
  objectNotation: true,
  register: global,

  logWarnFn: function (msg) {
    console.log("WARN" + msg);
  },

  logErrorFn: function (msg) {
    console.log("ERROR" + msg);
  },

  missingKeyFn: function (locale, value) {
    return value;
  },

  mustacheConfig: {
    tags: ["{{", "}}"],
    disable: false,
  },
});

//Definimos nuestro config
kimuraClient.config = require("./config/config.json");

// Crash
require("./Core/CrashHandler")(kimuraClient);


//Login bot
kimuraClient.login(process.env.kimuratoken);