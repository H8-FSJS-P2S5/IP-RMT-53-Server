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
      if (!email) {  
        const err = new Error("Email is required");  
        err.name = "ValidationError";  
        throw err;  
      }  
  
      if (!password) {  
        const err = new Error("Password is required");  
        err.name = "ValidationError";  
        throw err;  
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
        user = await User.create({  
          username: payload.name,  
          email: payload.email,  
          password: hashPassword(String(Math.floor(Math.random() * 1e12))),  
        },  
        {  
          hooks: false  
        });  
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
}

module.exports = UserController;
