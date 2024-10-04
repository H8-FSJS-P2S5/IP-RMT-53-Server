"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.Monster, {
        foreignKey: "monsterId",
      });
    }
  }

  Image.init(
    {
      monsterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Monsters",
          key: "id",
        },
        validate: {
          notNull: { msg: "Monster ID is required" },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Image URL is required" },
          notEmpty: { msg: "Image URL cannot be empty" },
          isUrl: { msg: "Image URL format is incorrect" },
        },
      },
    },
    {
      sequelize,
      modelName: "Image",
    }
  );

  return Image;
};
