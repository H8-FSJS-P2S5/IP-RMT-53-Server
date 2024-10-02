const rateLimit = require('express-rate-limit');

const jikanRateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 50, // Limit each IP to 50 requests per minute
    message: "Too many requests to the Jikan API, please try again later.",
});

module.exports = jikanRateLimiter