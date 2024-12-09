'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../data/arts.json').map((e) => {
      e.createdAt = e.updatedAt = new Date()
      return e;
    })
    await queryInterface.bulkInsert('Arts', data, {});
    /**
     * Add seed commands here.
     *
     * Example:
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Arts', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
