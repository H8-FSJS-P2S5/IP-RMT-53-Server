"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AnimeList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AnimeList.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      AnimeList.belongsTo(models.Anime, {
        foreignKey: "animeId",
        onDelete: "CASCADE",
      });
    }
  }
  AnimeList.init(
    {
      userId: DataTypes.INTEGER,
      animeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "AnimeList",
    }
  );
  return AnimeList;
};
