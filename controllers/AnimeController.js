const { Anime } = require("../models");
const axios = require("axios");

class AnimeController {
  static async searchAnime(req, res, next) {
    const { q } = req.query;

    try {
      const { data } = await axios.get("https://api.jikan.moe/v4/anime", {
        params: { q },
      });

      const animeIds = data.data.map((anime) => anime.mal_id);

      const existingAnime = await Anime.findAll({
        where: {
          malId: animeIds,
        },
        attributes: ["malId"],
      });

      const existingIds = existingAnime.map((anime) => anime.malId);

      const newAnime = data.data.filter(
        (anime) => !existingIds.includes(anime.mal_id)
      );

      if (newAnime.length > 0) {
        const animeToCreate = newAnime.map((anime) => ({
          malId: anime.mal_id,
          title: anime.title,
          genre: anime.genres.map((g) => g.name).join(", "),
          synopsis: anime.synopsis,
          episodes: anime.episodes,
          imageUrl: anime.images.jpg.image_url,
          score: anime.score,
        }));

        await Anime.bulkCreate(animeToCreate);
      }

      res.status(200).json({
        message: "Anime data fetched and stored from Jikan successfully",
        data: data.data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async storeAnime(req, res, next) {
    const animeData = req.body;

    try {
      const animeIds = animeData.map((anime) => anime.mal_id);

      const existingAnime = await Anime.findAll({
        where: { malId: animeIds },
        attributes: ["malId"],
      });

      const existingIds = existingAnime.map((anime) => anime.malId);

      const newAnime = animeData.filter(
        (anime) => !existingIds.includes(anime.mal_id)
      );

      if (newAnime.length > 0) {
        const animeToCreate = newAnime.map((anime) => ({
          malId: anime.mal_id,
          title: anime.title,
          genre: anime.genres.map((g) => g.name).join(", "),
          synopsis: anime.synopsis,
          episodes: anime.episodes,
          imageUrl: anime.images.jpg.image_url,
          score: anime.score,
        }));

        await Anime.bulkCreate(animeToCreate);
      }

      res.status(200).json({
        message: "Anime data stored successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAnimeDetails(req, res, next) {
    const { id } = req.params;

    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
      res.status(200).json(response.data.data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AnimeController;
