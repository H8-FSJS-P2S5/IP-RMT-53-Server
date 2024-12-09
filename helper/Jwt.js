const jwt = require("jsonwebtoken")
const secretKey = process.env.SECRET_KEY; 

exports.generateToken = (data) => {
    return jwt.sign(data, secretKey)
}

exports.verifyToken = (token) => {
    return jwt.verify(token, secretKey)
}
