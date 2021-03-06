'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Movie, {
        through: "UserMovie",
        foreignKey: "userId",
        otherKey: "movieId",
      });
      User.belongsToMany(models.Game, {
        through: "UserGame",
        foreignKey: "userId",
        otherKey: "gameId",
      });
      User.belongsToMany(models.Show, {
        through: "UserShow",
        foreignKey: "userId",
        otherKey: "showId",
      });
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};