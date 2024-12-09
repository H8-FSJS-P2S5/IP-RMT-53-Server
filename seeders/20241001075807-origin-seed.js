'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../data/origins.json').map((e) => {
      e.createdAt = e.updatedAt = new Date() 
      return e;
    })
    await queryInterface.bulkInsert('Origins', data, {});
    /**
     * Add seed commands here.
     *
     * Example:
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Origins', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
