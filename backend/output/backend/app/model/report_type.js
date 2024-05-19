const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('report_type', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "TRIAL"
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "TRIAL"
    }
  });
};
