const router = require('express').Router()

const UserController = require('../controllers/UserController');
const AnimeListController = require('../controllers/AnimeListController');
const AnimeController = require('../controllers/AnimeController');
const RatingController = require('../controllers/RatingController');
const ReviewController = require('../controllers/ReviewController');
const errorHandler = require('../middlewares/errorHandler');
const jikanRateLimiter = require('../middlewares/jikanRateLimiter');
const authentication = require('../middlewares/authentication');
const ChatbotController = require('../controllers/ChatbotController');
const UserAuthorization = require('../middlewares/authorization');


// User routes
router.post('/api/register', UserController.register); // Register a new user
router.post('/api/login', UserController.login); // Authenticate user
router.post('/api/google-login', UserController.googleLogin); // Google login

// Chatbot route for AI anime recommendations
router.post('/api/chat', ChatbotController.getAnimeRecommendation);

// Anime routes
router.get('/anime/search', jikanRateLimiter, AnimeController.searchAnime); // Search anime via Jikan API
router.get('/anime/:id', jikanRateLimiter, AnimeController.getAnimeDetails); // Grab detailed information for a specific anime
router.post('/api/anime/store', jikanRateLimiter, AnimeController.storeAnime); // Store new anime data

// Route for fetching the anime recommendation
router.post('/api/recommendation', ChatbotController.getAnimeRecommendation);

router.use(authentication)

// User Profile routes
router.get('/api/user/me', UserController.getUserProfile); // Fetch user profile information
router.put('/api/user/me/username', UserController.updateUsername); // PUT endpoint for updating username

// Anime List routes
router.get('/api/user/me/anime-list', AnimeListController.getAnimeList); // Retrieve current user's anime list
router.delete('/api/user/me/anime-list/:animeId', AnimeListController.removeAnimeFromList); // Remove an anime from the current user's list
router.post('/api/user/me/anime-list', AnimeListController.addAnimeToList); // Add an anime to the current user's list


// Rating routes
// router.post('/api/user/:id/anime/:animeId/rate', RatingController.rateAnime); // Rate an anime

// Review routes
// router.post('/api/user/:id/anime/:animeId/review', ReviewController.submitReview); // Submit a review
// router.put('/api/user/:id/anime/:animeId/review', ReviewController.updateReview); // Update a review

router.use(errorHandler)

module.exports = router;