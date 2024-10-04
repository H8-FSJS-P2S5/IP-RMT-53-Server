const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

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
      next(error);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      function createValidationError(message) {
        return {
          name: "SequelizeValidationError",
          errors: [{ message }], // Wrap it in an array like Sequelize does
        };
      }

      if (!email) {
        throw createValidationError("Email is required");
      }

      if (!password) {
        throw createValidationError("Password is required");
      }

      const user = await User.findOne({
        where: { email },
      });
      if (!user || !comparePassword(password, user.password)) {
        const err = new Error("Invalid Email/Password");
        err.name = "UnauthorizedError";
        throw err;
      }
      const token = createToken({
        id: user.id,
        username: user.username,
        email: user.email,
      });
      res.status(200).json({
        access_token: token,
        id: user.id,
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience: process.env.G_CLIENT_ID,
      });
      
      const payload = ticket.getPayload();
      let user = await User.findOne({
        where: { email: payload.email },
      });
      if (!user) {
        user = await User.create(
          {
            username: payload.name,
            email: payload.email,
            password: hashPassword(String(Math.floor(Math.random() * 1e12))),
          },
          {
            hooks: false,
          }
        );
      }
      const token = createToken({
        id: user.id,
        username: user.username,
        email: user.email,
      });
      res.status(200).json({
        access_token: token,
        id: user.id,
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserProfile(req, res, next) {
    const userId = req.user.id; // Get user ID from the decoded token

    try {
      const user = await User.findByPk(userId, {
        attributes: ["id", "username", "email"], // Select necessary fields
      });

      if (!user) {
        const err = new Error("User not found");
        err.name = "NotFoundError";
        throw err;
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async updateUsername(req, res) {
    const userId = req.user.id; // Get user ID from the decoded token
    const { username } = req.body;

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      user.username = username;
      await user.save();

      res.status(200).json({ message: "Username updated successfully."});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update username." });
    }
  }
}

module.exports = UserController;
