const { AnimeList, Anime } = require('../models'); 

class AnimeListController {
  static async getAnimeList(req, res, next) {
    const userId = req.user.id; // Use the authenticated user's ID
    try {
      const readAniList = await AnimeList.findAll({
        where: { userId },
        include: {
          model: Anime,
          attributes: ["malId", "title", "genre", "synopsis", "episodes", "imageUrl", "score"],
        },
      });
      res.status(200).json(readAniList);
    } catch (error) {
      next(error);
    }
  }

  static async addAnimeToList(req, res, next) {
    const { malId } = req.body; 
    const userId = req.user.id; 

    try {
      const anime = await Anime.findOne({ where: { malId } });

      if (!anime) {
        const err = new Error("No anime found in the database");
        err.name = "NotFoundError";
        throw err;
      }

      const newAnimeListEntry = await AnimeList.create({
        userId, 
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

  static async removeAnimeFromList(req, res, next) {
    const { animeId } = req.params; 
    const userId = req.user.id; 

    try {
      const animeListEntry = await AnimeList.findOne({
        where: {
          userId,
          animeId,
        },
      });

      if (!animeListEntry) {
        const err = new Error("Anime not found in your list");
        err.name = "NotFoundError";
        throw err;
      }

      await AnimeList.destroy({
        where: {
          userId,
          animeId,
        },
      });

      res.status(200).json({
        message: "Anime removed from your list successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AnimeListController;
