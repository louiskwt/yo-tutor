require("dotenv").config();

const express = require("express");
const nunjucks = require("nunjucks");
const sqlite3 = require("sqlite3").verbose();

const tgBot = require("./bot");

const app = express();
const port = 3000;

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

let db = new sqlite3.Database("./db/yo-tutor.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the yo-tutor database.");
  }
});

app.get("/", (req, res) => {
  res.render("index.html");
});

tgBot.launch();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
