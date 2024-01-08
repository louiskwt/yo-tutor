const chunkSize = require("./chunkSize");

const T_BASIC_BIO = {
  "5-star-star": "DSE 5** 導師",
  "5-star": "DSE 5** 導師",
  "level-5": "DSE Level 5 導師",
  "A-Level-A": "A-Level 奪A",
  "A-Level-B": "A-Level 奪B",
  aid: "有補底經驗",
  "full-time-teacher": "全職教師",
  "part-time-tutor": "兼職補習",
  "uni-student": "大學學生",
  "diy-notes": "提供筆記及練習",
  patient: "有耐性",
  tough: "嚴格",
  "can-wts": "可以課後 (Whatsapp)問書",
  sen: "有 SEN 教學經驗",
  overseas: "有海外留學經驗",
  "ielts-9": "IELTS 9 分",
  "ielts-8.5": "IELTS 8.5分",
  "ielts-8": "IELTS 8 分",
};

const tutorBio = Object.keys(T_BASIC_BIO).map((key) => {
  return T_BASIC_BIO[key];
});

const T_BIO_CONFIRMATION = "確認導師簡介 ✅";

const T_BIO = [...tutorBio, T_BIO_CONFIRMATION];

const tutorBioOptions = [];

for (let i = 0; i < T_BIO.length; i += chunkSize) {
  tutorBioOptions.push(T_BIO.slice(i, i + chunkSize));
}

module.exports = {
  T_BASIC_BIO,
  tutorBioOptions,
  T_BIO_CONFIRMATION,
};
