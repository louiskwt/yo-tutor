const chunkSize = require("./chunkSize");

const DISTRICTS = {
  CW: "中西區",
  E: "東區",
  S: "南區",
  SSP: "深水埗區",
  KC: "九龍城區",
  WTS: "黃大仙區",
  YTM: "油尖旺區",
  KT: "觀塘區",
  TW: "荃灣區",
  TM: "屯門區",
  YL: "元朗區",
  N: "北區",
  TP: "大埔區",
  ST: "沙田區",
  SK: "西貢區",
  IL: "離島區",
  WC: "灣仔區",
};

const AREAS = {
  HK: "香港島",
  KLN: "九龍",
  NT: "新界",
};

const CONFIRM_T_LOCATION = "確認教學地點 ✅";

const teachingAreaAndDistricts = [
  ...Object.keys(AREAS).map((key) => {
    return AREAS[key];
  }),
  ...Object.keys(DISTRICTS).map((key) => {
    return DISTRICTS[key];
  }),
  CONFIRM_T_LOCATION,
];

const teacingAreaAndDistrictOptions = [];

for (let i = 0; i < teachingAreaAndDistricts.length; i += chunkSize) {
  teacingAreaAndDistrictOptions.push(teachingAreaAndDistricts.slice(i, i + chunkSize));
}

module.exports = {
  DISTRICTS,
  AREAS,
  CONFIRM_T_LOCATION,
  teachingAreaAndDistricts,
  teacingAreaAndDistrictOptions,
};
