const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('testcase', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'task',
        key: 'id'
      }
    },
    input: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    output: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
};
