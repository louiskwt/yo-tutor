require("dotenv").config();

const config = {
  development: {
    username: process.env.PG_USER || "root",
    password: process.env.PG_PW || "root",
    database: process.env.PG_DATABASE || "database_development",
    host: process.env.DB_HOST || "",
    port: process.env.PG_PORT || "",
    // use_env_variable: process.env.PG_HOST,
    dialect: "postgres",
  },
};

module.exports = config;
