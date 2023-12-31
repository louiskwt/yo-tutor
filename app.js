require("dotenv").config();

const express = require("express");
const nunjucks = require("nunjucks");
const tgBot = require("./bot");

const app = express();
const port = 3000;

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.get("/", (req, res) => {
  res.render("index.html");
});

tgBot.start((ctx) => ctx.reply("Welcome!"));

tgBot.help((ctx) => ctx.reply("Send me a sticker"));

tgBot.on("sticker", (ctx) => ctx.reply("👍"));

tgBot.launch();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
