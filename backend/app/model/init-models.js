var DataTypes = require("sequelize").DataTypes;
var _discipline = require("./discipline");
var _prog_language = require("./prog_language");
var _role = require("./role");
var _task = require("./task");
var _teacher = require("./teacher");
var _teacher_discipline = require("./teacher_discipline");
var _testcase = require("./testcase");
var _user = require("./user");
var _user_tasks = require("./user_tasks");

function initModels(sequelize) {
  var discipline = _discipline(sequelize, DataTypes);
  var prog_language = _prog_language(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var task = _task(sequelize, DataTypes);
  var teacher = _teacher(sequelize, DataTypes);
  var teacher_discipline = _teacher_discipline(sequelize, DataTypes);
  var testcase = _testcase(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var user_tasks = _user_tasks(sequelize,DataTypes);

  discipline.hasMany(teacher_discipline, {foreignKey: "discipline_id",onDelete: "CASCADE"});
  prog_language.hasMany(task, {foreignKey: "prog_language_id",onDelete: "CASCADE"});
  role.hasMany(user, {foreignKey: "role_id",onDelete: "CASCADE"});
  task.hasMany(testcase, {foreignKey: "task_id",onDelete: "CASCADE"});
  teacher.hasMany(teacher_discipline, {foreignKey: "teacher_id",onDelete: "CASCADE"});
  teacher_discipline.hasMany(task, {foreignKey: "teacher_discipline_id",onDelete: "CASCADE"});
  user.hasMany(teacher, {foreignKey: "user_id",onDelete: "CASCADE"});
  task.hasMany(user_tasks,{foreignKey: "task_id", onDelete: "CASCADE"});
  user.hasMany(user_tasks,{foreignKey: "user_id", onDelete: "CASCADE"});

  teacher_discipline.belongsTo(teacher, {foreignKey: "teacher_id"});
  task.belongsTo(teacher_discipline, {foreignKey: "teacher_discipline_id"});
  teacher.belongsTo(user, {foreignKey: "user_id"});
  teacher_discipline.belongsTo(discipline, {foreignKey: "discipline_id"});
  task.belongsTo(prog_language, {foreignKey: "prog_language_id"});
  user.belongsTo(role, {foreignKey: "role_id"});
  testcase.belongsTo(task, {foreignKey: "task_id"});
  user_tasks.belongsTo(task,{foreignKey: "task_id", onDelete: "CASCADE"});
  user_tasks.belongsTo(user,{foreignKey: "user_id", onDelete: "CASCADE"});


  return {
    discipline,
    prog_language,
    role,
    task,
    teacher,
    teacher_discipline,
    testcase,
    user,
    user_tasks,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
