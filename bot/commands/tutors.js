function registerTutor(ctx) {
  // TODO: Extract tg related info
  // TODO: Ask tutor to enter a bio
  // TODO: Ask the user to select teachable subjects (possible ?)
  // TODO: Ask for Reigon
  // TODO: Ask for Price Range
  console.log(ctx);
  ctx.reply("你已經登記成為導師，請等待管理員審核");
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
