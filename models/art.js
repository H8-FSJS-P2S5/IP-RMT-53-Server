'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Art extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Art.belongsTo(models.User,{
        foreignKey: "UserId"
      })
      Art.belongsTo(models.Origin,{
        foreignKey: "OriginId"
      })
    }
  }
  Art.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "please input title name"},
        notNull: {msg: "please input title name"}
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {msg: "please input something here!"},
        notNull: {msg: "please input something here!"}
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: "somethin must have a price"},
        notNull: {msg: "somethin must have a price"}
      }
    },
    artis: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "please input the artis here"},
        notNull: {msg: "please input the artis here"}
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "please input the image here"},
        notNull: {msg: "please input the image here"}
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    OriginId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Art',
  });
  return Art;
};