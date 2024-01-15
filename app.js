require("dotenv").config();

const express = require("express");
const nunjucks = require("nunjucks");
const db = require("./db/models");

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

tgBot.launch();

app.listen(port, async () => {
  try {
    await db.sequelize.authenticate();
    console.log(`Example app listening on port ${port}`);
  } catch (error) {
    console.error("Unable to sync database:", error);
  }
});
