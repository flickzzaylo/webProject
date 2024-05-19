const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student', {
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
    },
    student_group_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "TRIAL",
      references: {
        model: 'student_group',
        key: 'id'
      }
    }
  });
};
