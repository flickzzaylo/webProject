const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('attestation_book', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    student_group_session_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mark: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    theme: {
      type: DataTypes.STRING(150),
      allowNull: true
    }
  });
};
