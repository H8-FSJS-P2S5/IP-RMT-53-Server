'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Origin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Origin.hasMany(models.Art,{
        foreignKey: {
          name: "OriginId"
        }
      })
    }
  }
  Origin.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Origin',
  });
  return Origin;
};