const { Anime } = require("../models");
const axios = require("axios");

class AnimeController {
  // Search and fetch anime from Jikan API, then store in your database
  static async searchAnime(req, res, next) {
    const { q } = req.query;

    try {
      // Fetch data from Jikan API
      const { data } = await axios.get("https://api.jikan.moe/v4/anime", {
        params: { q },
      });

      const animeIds = data.data.map(anime => anime.mal_id); // Get all mal_ids

      // Find all existing anime in the database
      const existingAnime = await Anime.findAll({
        where: {
          malId: animeIds,
        },
        attributes: ["malId"], // Only fetch the malId field to check existence
      });

      const existingIds = existingAnime.map(anime => anime.malId); // Extract IDs of existing anime

      // Filter out the animes that are not yet in the database
      const newAnime = data.data.filter(anime => !existingIds.includes(anime.mal_id));

      // Create new anime in bulk
      if (newAnime.length > 0) {
        const animeToCreate = newAnime.map(anime => ({
          malId: anime.mal_id,
          title: anime.title,
          genre: anime.genres.map(g => g.name).join(", "),
          synopsis: anime.synopsis,
          episodes: anime.episodes,
          imageUrl: anime.images.jpg.image_url,
          score: anime.score,
        }));

        await Anime.bulkCreate(animeToCreate);
      }

      // Return the entire fetched list (including existing ones)
      res.status(200).json({
        message: "Anime data fetched and stored from Jikan successfully",
        data: data.data,
      });
    } catch (error) {
      next(error);
    }
  }

  // Fetch anime details from Jikan API
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
