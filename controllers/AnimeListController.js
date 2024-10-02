const { AnimeList, Anime, User } = require("../models");

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

      const user = await User.findByPk(id); // Assuming you have a User model  
        if (!user) {  
            const err = new Error("User not found");  
            err.name = "NotFoundError";  
            throw err;  
        }
      
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

  static async removeAnimeFromList(req, res, next) {
    const { id: userId } = req.params; 
    const { animeId } = req.params; 

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
