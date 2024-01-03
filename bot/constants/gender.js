const GENDER = {
  M: "男",
  F: "女",
};

const tutorGenderOptions = Object.keys(GENDER).map((key) => {
  return `${GENDER[key]}導師`;
});

module.exports = {
  GENDER,
  tutorGenderOptions,
};
