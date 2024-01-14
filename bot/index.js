const {Telegraf, session} = require("telegraf");
const {getTutorProfile, updateTutorProfile, askTutorGender, askTutorLocation, askTutorSubject, askTutorPrice, finishTutorRegistration, askTutorName, askTutorBio} = require("./commands/tutors");
const menu = require("./menu");
const {tutorGenderOptions} = require("./constants/gender");
const {CONFIRM_T_LOCATION, teachingAreaAndDistricts} = require("./constants/location");
const {CONFIRM_T_SUBJECTS, tutorSubjectOptions} = require("./constants/subjects");
const {T_PRICE_CONFIRMATION} = require("./constants/price");
const {startText, helpText} = require("./content/help");
const {T_BASIC_BIO, T_BIO_CONFIRMATION} = require("./constants/bio");
const db = require("../db/models");
const tutorContent = require("./content/tutorContent");
const studentContent = require("./content/studenContent");

const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN;

const commandArr = Object.keys(menu).map((key) => {
  return {
    command: menu[key].command,
    description: menu[key].description,
  };
});

const tgBot = new Telegraf(TG_BOT_TOKEN);

tgBot.use(session());

tgBot.telegram.setMyCommands(commandArr);

tgBot.start(async (ctx) => {
  const {id} = ctx.update.message.from;
  ctx.session ??= {tgId: id};

  const user = await db.User.findOrCreate({
    where: {
      tgId: id,
    },
    defaults: {
      tgId: id,
    },
    returning: true,
  });

  ctx.session.userId = user[0].id;

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
tgBot.command(menu.rt.command, (ctx) => ctx.reply(tutorContent.tutorRegistration));

// Student Commands
tgBot.command(menu.rs.command, (ctx) => ctx.reply(studentContent.studentRegistration));
// Cases Command
tgBot.command(menu.fc.command, (ctx) => ctx.reply("最新導師資料"));
tgBot.command(menu.fc.command, (ctx) => ctx.reply("最新學生資料"));

tgBot.on("sticker", (ctx) => ctx.reply("🥳"));

module.exports = tgBot;
