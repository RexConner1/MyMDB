'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movie.belongsToMany(models.User, {
        through: "UserMovie",
        foreignKey: "movieId",
        otherKey: "userId",
      });
    }
  };
  Movie.init({
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
    runTime: DataTypes.INTEGER,
    description: DataTypes.STRING,
    wantOrHave: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};