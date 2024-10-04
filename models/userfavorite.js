"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserFavorite extends Model {
    static associate(models) {
      UserFavorite.belongsTo(models.User, {
        foreignKey: "userId",
      });
      UserFavorite.belongsTo(models.Monster, {
        foreignKey: "monsterId",
      });
    }
  }

  UserFavorite.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "User ID is required" },
        },
      },
      monsterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Monster ID is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "UserFavorite",
    }
  );

  return UserFavorite;
};
