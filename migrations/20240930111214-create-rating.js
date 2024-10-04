'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ratings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        references: {
          model: 'Users', 
          key: 'id',      
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE' 
      },
      animeId: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        references: {
          model: 'Animes', 
          key: 'id',       
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE' 
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        validate: {
          min: 1,
          max: 10 
        }
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
    await queryInterface.dropTable('Ratings');
  }
};
