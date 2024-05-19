const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "TRIAL"
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "TRIAL"
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "TRIAL"
    }
  });
};
