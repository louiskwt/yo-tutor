const chunkSize = require("./chunkSize");

const PRICE = {
  first: "100 - 200 HKD / hr",
  second: "200 - 300 HKD / hr",
  third: "300 - 400 HKD / hr",
  fourth: "400 - 500 HKD / hr",
  fifth: "500 - 600 HKD / hr",
  other: "按情況決定",
};

const T_PRICE_CONFIRMATION = "確認收費👍";

const T_PRICE = [...Object.keys(PRICE).map((key) => PRICE[key]), T_PRICE_CONFIRMATION];

const tutorPriceOptions = [];

for (let i = 0; i < T_PRICE.length; i += chunkSize) {
  tutorPriceOptions.push(T_PRICE.slice(i, i + chunkSize));
}

module.exports = {
  PRICE,
  T_PRICE_CONFIRMATION,
  tutorPriceOptions,
};
