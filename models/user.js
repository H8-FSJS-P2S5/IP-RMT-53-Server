"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.AnimeList, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      User.hasMany(models.Rating, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      User.hasMany(models.Review, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }

  User.init(
    {  
      username: {  
        type: DataTypes.STRING,  
        allowNull: false,  
        validate: {  
          notEmpty: { msg: "Username is required." },  
          len: {  
            args: [3, 20],  
            msg: "Username must be between 3 and 20 characters.",  
          },  
          notNull: {  
            msg: "Username cannot be null."  
          }  
        },  
      },  
      email: {  
        type: DataTypes.STRING,  
        allowNull: false,  
        validate: {  
          notEmpty: { msg: "Email is required." },  
          isEmail: {  
            msg: "Email must be a valid email address.",  
          },  
          notNull: {  
            msg: "Email cannot be null."  
          }  
        },  
      },  
      password: {  
        type: DataTypes.STRING,  
        allowNull: false,  
        validate: {  
          notEmpty: { msg: "Password is required." },  
          len: {  
            args: [6, 100],  
            msg: "Password must be at least 6 characters long.",  
          },  
          notNull: {  
            msg: "Password cannot be null."  
          }  
        },  
      },  
    },  
    {  
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user) => {
          user.password = hashPassword(user.password);
        },
        beforeUpdate: (user) => {
          if (user.changed("password")) {
            user.password = hashPassword(user.password);
          }
        },
      },
    }
  );

  return User;
};
