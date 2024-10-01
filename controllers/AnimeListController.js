const { AnimeList } = require("../models");

class AnimeListController {
  static async getAnimeList(req, res, next) {
    const { id } = req.params;
    try {
      const readAniList = await AnimeList.findAll({
        where: { userId: id }, 
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
}

module.exports = AnimeListController;
