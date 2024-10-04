"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Monster extends Model {
    static associate(models) {
      Monster.belongsToMany(models.User, {
        through: models.UserFavorite,
        foreignKey: "monsterId",
        otherKey: "userId",
      });
      Monster.hasOne(models.Image, {
        foreignKey: "monsterId",
      });
    }
  }

  Monster.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Type is required" },
          notEmpty: { msg: "Type cannot be empty" },
        },
      },
      species: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Species is required" },
          notEmpty: { msg: "Species cannot be empty" },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Name is required" },
          notEmpty: { msg: "Name cannot be empty" },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Description is required" },
          notEmpty: { msg: "Description cannot be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "Monster",
    }
  );

  return Monster;
};
