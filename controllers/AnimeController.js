const { Anime } = require("../models");
const axios = require("axios");

class AnimeController {
  static async searchAnime(req, res, next) {
    const { q } = req.query;

    try {
      const { data } = await axios.get(`https://api.jikan.moe/v4/anime`, {
        params: { q },
      });

      const animeList = data.data.map(async (anime) => {
        const existingAnime = await Anime.findOne({
          where: { mal_id: anime.mal_id },
        });

        if (!existingAnime) {
          await Anime.create({
            mal_id: anime.mal_id,
            title: anime.title,
            genre: anime.genre.name,
            synopsis: anime.synopsis,
            episodes: anime.episodes,
            image_url: anime.images.jpg.image_url,
            score: anime.score,
          });
        }
      });

      res.status(200).json({
        message: "Anime data fetched and stored from jikan.moe successfully",
        data: animeList,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAnimeDetails(req, res, next) {
    const { id } = req.params;
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
      res.json(response.data.data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AnimeController;
