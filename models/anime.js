"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Anime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Anime.hasMany(models.AnimeList, {
        foreignKey: "animeId",
        onDelete: "CASCADE",
      });
      Anime.hasMany(models.Rating, {
        foreignKey: "animeId",
        onDelete: "CASCADE",
      });
      Anime.hasMany(models.Review, {
        foreignKey: "animeId",
        onDelete: "CASCADE",
      });
    }
  }
  Anime.init(
    {
      malId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      genre: DataTypes.STRING,
      synopsis: DataTypes.TEXT,
      episodes: DataTypes.INTEGER,
      imageUrl: DataTypes.STRING,
      score: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Anime",
    }
  );
  return Anime;
};
