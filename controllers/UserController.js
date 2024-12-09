const { compare } = require("../helper/bcrypt");
const { User } = require("../models");
const { generateToken } = require("../helper/Jwt");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

exports.register = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    let user = await User.create({ email, password });
    res.status(201).json({ message: "your data has been created" });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  let { email, password } = req.body;
  if (!email) {
    throw {
      name: "Bad Request",
      message: "Please input your email correctly",
    };
  }
  if (!password) {
    throw {
      name: "Bad Request",
      message: "Please input your password correctly",
    };
  }
  
  try {
    const user = await User.findOne({
      where: {
        email
      }
    });
    
    if (!user || await !compare(password, user.password)) {
      throw { name: "Unauthorized", message: "Email or Password wrong" };
    }

    const access_token = generateToken({ id: user.id });
    res.status(200).json({ access_token });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.GoogleLogin = async (req, res, next) => {
  try {
    const { googleToken } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.G_CLIENT_ID,
      });
      const { username, email } = ticket.getPayload();
      console.log("User creation:", { username, email });

      let user = await User.findOne({ where: { email } });
      console.log(user?.toJSON(), "<<< user OAuth");

      if (!user) {
        const username = email.split("@")[0];
        user = await User.create(
          {
            username,
            email,
            password: "123456",
            role: "Admin",
          },
          {
            hooks: false,
          }
        );
      }
      const access_token = generateToken({ id: user.id });
      res.status(200).json({ access_token: access_token });
    } catch (err) {
      console.log(err, "<<< err googleLogin");
      next(err);
    }
  }
   