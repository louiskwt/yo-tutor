const {Telegraf} = require("telegraf");

const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN;

const tgBot = new Telegraf(TG_BOT_TOKEN);

module.exports = tgBot;
