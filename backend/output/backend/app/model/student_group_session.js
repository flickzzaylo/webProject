module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student_group_session', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    student_group_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    report_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    teacher_discipline_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mark_date: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
};
