"use strict";
const { hashPassword } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // seeding User
    const dataUser = require("../data/user.json").map((e) => {
      e.createdAt = e.updatedAt = new Date();
      e.password = hashPassword(e.password);
      return e;
    });
    const dataImage = require("../data/image.json").map((e) => {
      e.createdAt = e.updatedAt = new Date();
      return e;
    });
    const dataFavorite = require("../data/userFavorite.json").map((e) => {
      e.createdAt = e.updatedAt = new Date();
      return e;
    });
    await queryInterface.bulkInsert("Users", dataUser, {});
    await queryInterface.bulkInsert("Images", dataImage, {});
    await queryInterface.bulkInsert("UserFavorites", dataFavorite, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Images", null, {});
    await queryInterface.bulkDelete("UserFavorites", null, {});
  },
};
