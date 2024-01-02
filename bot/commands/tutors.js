const {Markup} = require("telegraf");
const {GENDER} = require("../constants/gender");
const {DISTRICTS, AREAS} = require("../constants/location");
const {SUBJECTS} = require("../constants/subjects");

const genderOptions = Object.keys(GENDER).map((key) => {
  return `${GENDER[key]}導師`;
});
const genderKeyboard = Markup.keyboard(genderOptions).oneTime().resize();

const areaAndDistricts = [
  ...Object.keys(AREAS).map((key) => {
    return AREAS[key];
  }),
  ...Object.keys(DISTRICTS).map((key) => {
    return DISTRICTS[key];
  }),
  "確認教學地點 ✅",
];

chunkSize = 3;
const areaAndDistrictOptions = [];
for (let i = 0; i < areaAndDistricts.length; i += chunkSize) {
  areaAndDistrictOptions.push(areaAndDistricts.slice(i, i + chunkSize));
}

const locationKeyboard = Markup.keyboard(areaAndDistrictOptions);

const subjectOptions = [];

const subjects = [
  ...Object.keys(SUBJECTS).map((key) => {
    return SUBJECTS[key];
  }),
  "確認可教科目 ✅",
];

for (let i = 0; i < subjects.length; i += chunkSize) {
  subjectOptions.push(subjects.slice(i, i + chunkSize));
}

const subjectKeyboard = Markup.keyboard(subjectOptions);

async function askTutorGender(ctx) {
  // TODO: Extract tg related info
  // TODO: Ask tutor to enter a bio
  await ctx.reply("你是...", genderKeyboard);
}

async function askTutorLocation(ctx) {
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
