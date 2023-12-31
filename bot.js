const {Telegraf} = require("telegraf");

const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN;

const tgBot = new Telegraf(TG_BOT_TOKEN);

tgBot.start((ctx) => ctx.reply("哈囉～歡迎使用 Yo Tutor\nYoTutor 是按月費🈷️ / 充值形式運行的補習配對服務，當你每次想要聯絡你心怡的導師或學生時，系統會因應你的能量點或月費計劃去決定能可讓你聯絡對方\n  \n 登記成為導師，請按 /rt \n 登記成為學生，請按 /rs \n 查看導師資料，請按 /tp \n 查看學生資料，請按 /stp \n "));

tgBot.help((ctx) => ctx.reply("Send me a sticker"));

tgBot.command("rt", (ctx) => ctx.reply("你已經登記成為導師，請等待管理員審核"));
tgBot.command("rs", (ctx) => ctx.reply("你已經登記成為學生，請等待管理員審核"));
tgBot.command("tp", (ctx) => ctx.reply("最新導師資料"));
tgBot.command("stp", (ctx) => ctx.reply("最新學生資料"));

tgBot.on("sticker", (ctx) => ctx.reply("👍"));

module.exports = tgBot;
