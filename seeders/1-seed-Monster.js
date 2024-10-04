"use strict";

const axios = require("axios");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const response = await axios.get("https://mhw-db.com/monsters/");
      const monster = response.data;
      const data = monster.map((e) => ({
        id: e.id,
        name: e.name,
        type: e.type,
        species: e.species,
        description: e.description,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await queryInterface.bulkInsert("Monsters", data, {});
    } catch (err) {
      console.log(err, "<<< err seeding monster");
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Monsters", null, {});
  },
};
