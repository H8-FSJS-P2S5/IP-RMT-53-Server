function errorHandling(err, req, res, next) {
    console.log(err, "<<<<<<errorHandling");
    
    switch (err.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            res.status(401).json({ message: err.errors[0].message });
            return;
        case "Not Found":
            res.status(404).json({ message: err.message });
            return;
        case "Unauthorized":
        case "Unauthenticated":
            res.status(401).json({ message: err.message });
            return;
        case "Bad Request":
            res.status(400).json({  message: err.message })
            return;
        case "Forbidden":
            res.status(403).json({  message: err.message })
            return
        case "JsonWebTokenError":
            res.status(401).json({  message: "Invalid Token" })
            return;
        default:
            res.status(500).json({ message: "Internet Server Error" })
    }
}

module.exports = errorHandling;