const { verifyToken } = require("../helper/Jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
    try {
        const access_token = req.headers.authorization;
        // console.log(access_token);
        // console.log(req.headers);
        if (!access_token) {
            throw { name: "Unauthenticated", message: "Invalid Token" }
        }

        const [bearer, token] = access_token.split(" ");

        if (bearer !== "Bearer") {
            throw { name: "Unauthenticated", message: "Invalid Token" }
        }

        const payload = verifyToken(token)
        let user = await User.findByPk(payload.id)
        if (!user) {
            throw { name: "Unauthenticated" }
        }

        req.user = {
            id: user.id,
            email: user.email
        }

        next()
    } catch (err) {
        next(err)
    }
}



module.exports = authentication