const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('teacher_discipline', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teacher',
        key: 'id'
      }
    },
    discipline_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'discipline',
        key: 'id'
      }
    }
  });
};
