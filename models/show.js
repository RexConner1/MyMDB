'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Show extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Show.init({
    title: DataTypes.STRING,
    firstAirDate: DataTypes.STRING,
    seasons: DataTypes.INTEGER,
    episodes: DataTypes.INTEGER,
    description: DataTypes.STRING,
    station: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Show',
  });
  return Show;
};