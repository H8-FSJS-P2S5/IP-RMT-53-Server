const { verifyToken } = require("../helpers/jwt");
const { User } = require('../models')


const authentication = async (req, res, next) => {

  const bearerToken = req.headers["authorization"]
  if(!bearerToken) {
    return next({name: "AuthenticationError"})
  }

  const [, token] = bearerToken.split(" ")
  if(!token) {
    return next({ name: "AuthenticationError" })
  }

  try {
    const data = verifyToken(token)
    const user = await User.findByPk(data.id)
    if(!user) {
      return next ({ name: "AuthenticationError" })
    }
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
};

module.exports = authentication;
