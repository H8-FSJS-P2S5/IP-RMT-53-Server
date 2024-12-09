'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../data/users.json').map((e) => {
      e.createdAt = e.updatedAt = new Date()
      return e;
    })
    await queryInterface.bulkInsert('Users', data, {});
    /**
     * Add seed commands here.
     *
     * Example:
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
