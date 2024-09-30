const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async register(req, res, next) {
    const { username, email, password } = req.body;
    try {
      const newUser = await User.create({
        username,
        email,
        password,
      });

      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email) {
        return res.status(400).json({
          error: "Validation Error",
          messages: [{ message: "Email is required" }],
        });
      }

      if (!password) {
        return res.status(400).json({
          error: "Validation Error",
          messages: [{ message: "Password is required" }],
        });
      }

      const user = await User.findOne({
        where: { email },
      });

      if (!user || !comparePassword(password, user.password)) {
        return res.status(500).json({ message: "Invalid Email/Password" });
      }

      const token = createToken({
        id: user.id,
        username: user.username,
        email: user.email,
      });
      res
        .status(200)
        .json({
          access_token: token,
          username: user.username,
          email: user.email,
        });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = UserController;
