'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Arts', 'quantity', { 
      type: Sequelize.INTEGER });
    /**
     * Add altering commands here.
     *
     * Example:
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users');
    /**
     * Add reverting commands here.
     *
     * Example:
     */
  }
};
