const {Markup} = require("telegraf");
const {GENDER} = require("../constants/gender");
const {DISTRICTS, AREAS} = require("../constants/location");

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
  "確認 ✅",
];

chunkSize = 3;
const areaAndDistrictOptions = [];
for (let i = 0; i < areaAndDistricts.length; i += chunkSize) {
  areaAndDistrictOptions.push(areaAndDistricts.slice(i, i + chunkSize));
}

const locationKeyboard = Markup.keyboard(areaAndDistrictOptions);

async function registerTutor(ctx) {
  // TODO: Extract tg related info
  // TODO: Ask tutor to enter a bio
  // TODO: Ask the user to select teachable subjects (possible ?)
  // TODO: Ask for Reigon
  // TODO: Ask for Price Range
  await ctx.reply("你是...", genderKeyboard);
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
  registerTutor,
};
