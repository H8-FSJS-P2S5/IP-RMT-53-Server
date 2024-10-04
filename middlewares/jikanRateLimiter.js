const rateLimit = require('express-rate-limit');

const jikanRateLimiter = rateLimit({
    windowMs: 60 * 1000, 
    max: 50, 
    message: "Too many requests to the Jikan API, please try again later.",
});

module.exports = jikanRateLimiter