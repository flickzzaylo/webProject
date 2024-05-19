const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('attestation_book', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "TRIAL"
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "TRIAL",
      references: {
        model: 'student',
        key: 'id'
      }
    },
    student_group_session_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "TRIAL",
      references: {
        model: 'student_group_session',
        key: 'id'
      }
    },
    mark: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "TRIAL"
    },
    theme: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "TRIAL"
    }
  });
};
