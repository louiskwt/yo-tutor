"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tutors", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      locations: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      subjects: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      priceRange: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      bio: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      isVIP: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      energy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tutors");
  },
};
