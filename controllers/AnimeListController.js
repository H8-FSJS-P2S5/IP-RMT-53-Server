const { AnimeList, Anime } = require("../models");

class AnimeListController {
  static async getAnimeList(req, res, next) {
    const { id } = req.params;
    try {
      const readAniList = await AnimeList.findAll({
        where: { userId: id },
        include: {
          model: Anime,
          attributes: ["malId", "title", "synopsis", "imageUrl", "score"], // Select only necessary fields
        },
      });

      if (readAniList.length === 0) {
        const err = new Error("No anime list found for this user");
        err.name = "NotFoundError";
        throw err;
      }

      res.status(200).json(readAniList);
    } catch (error) {
      next(error);
    }
  }

  static async addAnimeToList(req, res, next) {
    const { id } = req.params; 
    const { malId } = req.body; 

    try {
      
      const anime = await Anime.findOne({ where: { malId } });

      
      if (!anime) {
        const err = new Error("No anime list found in the database");
        err.name = "NotFoundError";
        throw err;
      }

      const newAnimeListEntry = await AnimeList.create({
        userId: id, 
        animeId: anime.id, 
      });

      res.status(201).json({
        message: "Anime added to your list successfully",
        data: newAnimeListEntry,
      });
      
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AnimeListController;
