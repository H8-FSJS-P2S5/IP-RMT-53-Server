'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Animes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      malId: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        unique: true 
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      synopsis: {
        type: Sequelize.TEXT,
        allowNull: true 
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true 
      },
      score: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Animes');
  }
};
