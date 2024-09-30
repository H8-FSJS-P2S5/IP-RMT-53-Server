'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
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
      reviewText: {
        type: Sequelize.TEXT,
        allowNull: false 
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
    await queryInterface.dropTable('Reviews');
  }
};
