require("dotenv").config();

const express = require("express");
const nunjucks = require("nunjucks");
const sqlite3 = require("sqlite3").verbose();

const tgBot = require("./bot");
const sequelize = require("./db/db");

const app = express();
const port = 3000;

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.get("/", (req, res) => {
  res.render("index.html");
});

tgBot.launch();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
