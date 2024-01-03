const chunkSize = require("./chunkSize");

const SUBJECTS = {
  ALL: "全科",
  PCHIN: "小學中文",
  PENG: "小學英文",
  PMATH: "小學數學",
  PSCI: "小學常識",
  MATH: "數學",
  PHY: "物理",
  CHEM: "化學",
  BIO: "生物",
  HIST: "歷史",
  CHIST: "中國歷史",
  ECON: "經濟",
  GEO: "地理",
  ICT: "資訊科技",
  M1: "數學M1",
  M2: "數學M2",
  CLIT: "中國文學",
  ELIT: "英國文學",
  ALEVEL: "A-LEVEL",
  SAT: "美國 SAT",
  IB: "IB 課程",
  IELTS: "IELTS 英文",
  TOEFL: "TOEFL 英文",
  PTH: "普通話",
  OTHER: "其他科目",
};

const CONFIRM_T_SUBJECTS = "確認可教科目 ✅";

const T_SUBJECTS = [
  ...Object.keys(SUBJECTS).map((key) => {
    return SUBJECTS[key];
  }),
  CONFIRM_T_SUBJECTS,
];

const tutorSubjectOptions = [];

for (let i = 0; i < T_SUBJECTS.length; i += chunkSize) {
  tutorSubjectOptions.push(T_SUBJECTS.slice(i, i + chunkSize));
}

module.exports = {
  SUBJECTS,
  tutorSubjectOptions,
};
