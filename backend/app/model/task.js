const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('task', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    teacher_discipline_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teacher_discipline',
        key: 'id'
      }
    },
    prog_language_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'prog_language',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
};
