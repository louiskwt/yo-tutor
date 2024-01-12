const {Markup} = require("telegraf");
const {tutorGenderOptions, GENDER} = require("../constants/gender");
const {teacingAreaAndDistrictOptions, CONFIRM_T_LOCATION} = require("../constants/location");
const {tutorSubjectOptions, CONFIRM_T_SUBJECTS} = require("../constants/subjects");
const {T_PRICE_CONFIRMATION, tutorPriceOptions} = require("../constants/price");
const tutorContent = require("../content/tutorContent");
const {tutorBioOptions, T_BIO_CONFIRMATION} = require("../constants/bio");
const db = require("../../db/models");

const genderKeyboard = Markup.keyboard(tutorGenderOptions).resize();

const locationKeyboard = Markup.keyboard(teacingAreaAndDistrictOptions);

const subjectKeyboard = Markup.keyboard(tutorSubjectOptions);

const priceKeyboard = Markup.keyboard(tutorPriceOptions);

const bioKeyboard = Markup.keyboard(tutorBioOptions);

async function askTutorGender(ctx) {
  const {id} = ctx.update.message.from;
  ctx.session ??= {tgId: id};
  const hasUserInSession = ctx.session.userId;
  let user = null;

  if (!hasUserInSession) {
    console.log("No user in session");
    user = await db.User.findOrCreate({
      where: {
        tgId: id,
      },
      defaults: {
        tgId: id,
      },
      returning: true,
    });

    ctx.session.userId = user[0].id;
  }

  const tutor = await db.Tutor.findOrCreate({
    where: {
      userId: user ? user[0].id : ctx.session.userId,
    },
    defaults: {
      userId: user ? user[0].id : ctx.session.userId,
    },
    returning: true,
  });

  ctx.session.tutorId = tutor[0].id;

  return ctx.reply("你是...", genderKeyboard);
}

async function askTutorLocation(ctx) {
  const genderResponse = ctx.update.message.text[0];

  const genderKey = Object.keys(GENDER).find((k) => GENDER[k] === genderResponse);

  await db.Tutor.update(
    {
      gender: genderKey,
    },
    {
      where: {
        userId: ctx.session.userId,
      },
    }
  );

  return ctx.reply(`教學地點？ (可以多選)\n選好之後按 '${CONFIRM_T_LOCATION}' 提交\n註冊後可以隨時更改`, locationKeyboard);
}

function askTutorSubject(ctx) {
  return ctx.reply(`你可教的科目？ (可以多選)\n選好之後按 '${CONFIRM_T_SUBJECTS}' 提交\n註冊後可以隨時更改`, subjectKeyboard);
}

function askTutorPrice(ctx) {
  return ctx.reply(`你期望的收費？ (可以多選)\n選好之後按 '${T_PRICE_CONFIRMATION}' 提交\n註冊後可以隨時更改`, priceKeyboard);
}

function askTutorBio(ctx) {
  return ctx.reply(`請輸入你的自我介紹... (可以多選)\n選好之後按 '${T_BIO_CONFIRMATION}' 提交\n註冊後可以隨時更改\n`, bioKeyboard);
}

function finishTutorRegistration(ctx) {
  return ctx.reply(tutorContent.confirmation);
}

function getTutorProfile(ctx) {
  // TODO: Extract TG info
  // Query DB if not cached
  // Return the profile in chat
  console.log(ctx.update.message.from);
  ctx.reply("你的導師資料");
}

function updateTutorProfile(ctx) {
  // TODO: Extract TG info
  console.log(ctx.update.message.from);
  console.log(ctx.update.message.chat);
  console.log(ctx.update.message.entities);
}
module.exports = {
  updateTutorProfile,
  getTutorProfile,
  askTutorGender,
  askTutorLocation,
  askTutorSubject,
  askTutorPrice,
  askTutorBio,
  finishTutorRegistration,
};
