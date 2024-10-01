const router = require('express').Router()

const UserController = require('../controllers/UserController');
const AnimeListController = require('../controllers/AnimeListController');
const AnimeController = require('../controllers/AnimeController');
const RatingController = require('../controllers/RatingController');
const ReviewController = require('../controllers/ReviewController');
const errorHandler = require('../middlewares/errorHandler');

// User routes
router.post('/api/register', UserController.register); // Register a new user
router.post('/api/login', UserController.login); // Authenticate user
router.post('/api/google-login', UserController.googleLogin); // Google login

// Anime List routes
// router.get('/api/user/:id/anime-list', AnimeListController.getAnimeList); // Retrieve user's anime list
// router.post('/api/user/:id/anime-list', AnimeListController.addAnime); // Add an anime to the user's list
// router.delete('/api/user/:id/anime-list/:animeId', AnimeListController.removeAnime); // Remove an anime from the user's list

// Anime routes
// router.get('/anime/search', AnimeController.searchAnime); // Search anime via Jikan API
// router.get('/anime/:id', AnimeController.getAnimeDetails); // Grab detailed information for a specific anime

// Rating routes
// router.post('/api/user/:id/anime/:animeId/rate', RatingController.rateAnime); // Rate an anime

// Review routes
// router.post('/api/user/:id/anime/:animeId/review', ReviewController.submitReview); // Submit a review
// router.put('/api/user/:id/anime/:animeId/review', ReviewController.updateReview); // Update a review

router.use(errorHandler)

module.exports = router;