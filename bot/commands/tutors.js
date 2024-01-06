const {Markup} = require("telegraf");
const {tutorGenderOptions} = require("../constants/gender");
const {teacingAreaAndDistrictOptions, CONFIRM_T_LOCATION} = require("../constants/location");
const {tutorSubjectOptions, CONFIRM_T_SUBJECTS} = require("../constants/subjects");
const {T_PRICE_CONFIRMATION, tutorPriceOptions} = require("../constants/price");
const tutorContent = require("../content/tutorContent");

const genderKeyboard = Markup.keyboard(tutorGenderOptions).resize();

const locationKeyboard = Markup.keyboard(teacingAreaAndDistrictOptions);

const subjectKeyboard = Markup.keyboard(tutorSubjectOptions);

const priceKeyboard = Markup.keyboard(tutorPriceOptions);

function askTutorGender(ctx) {
  return ctx.reply("你是...", genderKeyboard);
}

function askTutorLocation(ctx) {
  return ctx.reply(`教學地點？ 可以多選，選好之後按 '${CONFIRM_T_LOCATION}' 提交`, locationKeyboard);
}

function askTutorSubject(ctx) {
  return ctx.reply(`你可教的科目？ 可以多選，選好之後按 '${CONFIRM_T_SUBJECTS}' 提交`, subjectKeyboard);
}

function askTutorPrice(ctx) {
  return ctx.reply(`你期望的收費？ 可以多選，選好之後按 '${T_PRICE_CONFIRMATION}' 提交`, priceKeyboard);
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
  finishTutorRegistration,
  askTutorName,
};
