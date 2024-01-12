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
tgBot.command(menu.rt.command, (ctx) => askTutorGender(ctx));
tgBot.command(menu.tp.command, (ctx) => getTutorProfile(ctx));
tgBot.command(menu.utp.command, (ctx) => updateTutorProfile(ctx));

tutorGenderOptions.map((option) => {
  tgBot.hears(option, (ctx) => askTutorLocation(ctx));
});

teachingAreaAndDistricts.map((option) => {
  tgBot.hears(option, async (ctx) => {
    ctx.session ??= {};
    const tgId = ctx.update.message.from.id;

    const {userId} = ctx.session;

    if (!userId) {
      ctx.session.tgId = tgId;

      const user = await db.User.findOrCreate({
        where: {
          tgId,
        },
        defaults: {
          tgId,
        },
        returning: true,
      });

      ctx.session.userId = user[0].id;
    }

    ctx.session.locations ??= [];
    if (option !== CONFIRM_T_LOCATION) {
      ctx.session.locations.push(option);
    } else {
      await db.Tutor.update(
        {
          locations: ctx.session.locations,
        },
        {
          where: {
            userId,
          },
        }
      );

      return askTutorSubject(ctx);
    }
  });
});

tutorSubjectOptions.map((option) => {
  tgBot.hears(option, async (ctx) => {
    ctx.session ??= {};

    const {userId} = ctx.session;
    if (!userId) {
      const user = await db.User.findOrCreate({
        where: {
          tgId: ctx.update.message.from.id,
        },
        defaults: {
          tgId: ctx.update.message.from.id,
        },
        returning: true,
      });
      ctx.session.tgId = ctx.update.message.from.id;
      ctx.session.userId = user[0].id;
    }
    ctx.session.subjects ??= [];

    if (option !== CONFIRM_T_SUBJECTS) {
      ctx.session.subjects.push(option);
    } else {
      await db.Tutor.update(
        {
          subjects: ctx.session.subjects,
        },
        {
          where: {
            userId,
          },
        }
      );

      return askTutorPrice(ctx);
    }
  });
});

tgBot.hears(T_PRICE_CONFIRMATION, (ctx) => askTutorBio(ctx));

tgBot.hears(T_BIO_CONFIRMATION, (ctx) => finishTutorRegistration(ctx));

// Student Commands
tgBot.command(menu.rs.command, (ctx) => ctx.reply("你已經登記成為學生，請等待管理員審核"));

// Cases Command
tgBot.command(menu.tc.command, (ctx) => ctx.reply("最新導師資料"));
tgBot.command(menu.sc.command, (ctx) => ctx.reply("最新學生資料"));

tgBot.on("sticker", (ctx) => ctx.reply("🥳"));

module.exports = tgBot;
