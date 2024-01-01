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
}

function updateTutorProfile(ctx) {
  // TODO: Extract TG info
}

module.exports = {
  updateTutorProfile,
  getTutorProfile,
  registerTutor,
};
