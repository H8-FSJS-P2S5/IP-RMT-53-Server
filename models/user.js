'use strict';
const {
  Model
} = require('sequelize');
const { encrypt } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Art,{
        foreignKey: {
          name: "UserId"
        }
      })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg:"can't be null"},
        notNull: {msg:"can't be empty"},
        isEmail: {
          arg: true,
          msg: "must be in email format"
        }
      },
      unique: {
        arg: true,
        msg: "email already exists!"
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg:"can't be null"},
        notNull: {msg:"can't be empty"},
        len: {
          args: [5],
          msg: 'please input your password more than 5 words'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Member"
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(data) {
        data.password = encrypt(data.password)
      }
    }
  });
  return User;
};