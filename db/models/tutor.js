"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tutor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {foreignKey: "userId"});
    }
  }
  Tutor.init(
    {
      gender: DataTypes.STRING,
      locations: DataTypes.ARRAY(DataTypes.STRING),
      subjects: DataTypes.ARRAY(DataTypes.STRING),
      priceRange: DataTypes.ARRAY(DataTypes.STRING),
      bio: DataTypes.ARRAY(DataTypes.STRING),
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      isVIP: DataTypes.BOOLEAN,
      energy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Tutor",
    }
  );
  return Tutor;
};
