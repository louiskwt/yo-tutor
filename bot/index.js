const {Telegraf} = require("telegraf");
const {getTutorProfile, updateTutorProfile, askTutorGender, askTutorLocation, askTutorSubject, askTutorPrice, finishTutorRegistration, askTutorName, askTutorBio} = require("./commands/tutors");
const menu = require("./menu");
const {tutorGenderOptions} = require("./constants/gender");
const {CONFIRM_T_LOCATION} = require("./constants/location");
const {CONFIRM_T_SUBJECTS} = require("./constants/subjects");
const {T_PRICE_CONFIRMATION} = require("./constants/price");
const {startText, helpText} = require("./content/help");
const {T_BASIC_BIO, T_BIO_CONFIRMATION} = require("./constants/bio");
const db = require("../db/models");

const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN;

const commandArr = Object.keys(menu).map((key) => {
  return {
    command: menu[key].command,
    description: menu[key].description,
  };
});

const tgBot = new Telegraf(TG_BOT_TOKEN);

tgBot.telegram.setMyCommands(commandArr);

tgBot.start(async (ctx) => {
  console.log("ctx", ctx.update.message.from);

  const {id} = ctx.update.message.from;

  db.User.findOrCreate({
    where: {
      tgId: id,
    },
    defaults: {
      tgId: id,
    },
  });

  ctx.reply(startText);

  // db.User.findOrCreate({}
  setTimeout(() => {
    ctx.reply("你的名字？");
  }, 2000);
});

tgBot.help((ctx) => {
  ctx.reply(helpText);
});

// Tutor Commands
tgBot.command(menu.rt.command, (ctx) => askTutorGender(ctx));
tgBot.command(menu.tp.command, (ctx) => getTutorProfile(ctx));
tgBot.command(menu.utp.command, (ctx) => updateTutorProfile(ctx));

tutorGenderOptions.map((option) => {
  tgBot.hears(option, (ctx) => askTutorLocation(ctx));
});

tgBot.hears(CONFIRM_T_LOCATION, (ctx) => askTutorSubject(ctx));

tgBot.hears(CONFIRM_T_SUBJECTS, (ctx) => askTutorPrice(ctx));

tgBot.hears(T_PRICE_CONFIRMATION, (ctx) => askTutorBio(ctx));

tgBot.hears(T_BIO_CONFIRMATION, (ctx) => finishTutorRegistration(ctx));

// Student Commands
tgBot.command(menu.rs.command, (ctx) => ctx.reply("你已經登記成為學生，請等待管理員審核"));

// Cases Command
tgBot.command(menu.tc.command, (ctx) => ctx.reply("最新導師資料"));
tgBot.command(menu.sc.command, (ctx) => ctx.reply("最新學生資料"));

tgBot.on("sticker", (ctx) => ctx.reply("🥳"));

module.exports = tgBot;
