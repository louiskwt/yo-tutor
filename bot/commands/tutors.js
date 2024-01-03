const {Markup} = require("telegraf");
const {tutorGenderOptions} = require("../constants/gender");
const {teacingAreaAndDistrictOptions} = require("../constants/location");
const {tutorSubjectOptions} = require("../constants/subjects");

const genderKeyboard = Markup.keyboard(tutorGenderOptions).oneTime().resize();

const locationKeyboard = Markup.keyboard(teacingAreaAndDistrictOptions);

const subjectKeyboard = Markup.keyboard(tutorSubjectOptions);

async function askTutorGender(ctx) {
  // TODO: Extract tg related info
  // TODO: Ask tutor to enter a bio
  await ctx.reply("你是...", genderKeyboard);
}

function askTutorLocation(ctx) {
  return ctx.reply("教學地點？ 可以多選，選好之後按 '確認教學地點 ✅' 提交", locationKeyboard);
}

function askTutorSubject(ctx) {
  return ctx.reply("你可教的科目？ 可以多選，選好之後按 '確認可教科目 ✅' 提交", subjectKeyboard);
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
};
