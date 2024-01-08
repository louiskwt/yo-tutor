const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(process.env.PG_HOST);

module.exports = sequelize;
