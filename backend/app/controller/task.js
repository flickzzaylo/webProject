var db = require('../config/db.config');
var globalFunctions = require('../config/global.function');
var task = db.task;
const { Op } = require("sequelize");

exports.findAll = (req,res) =>{
    task.findAll()
    .then(objects=>{
        globalFunctions.sendResult(res,objects);
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
    })
}

exports.findById = (req,res) =>{
    task.findByPk(req.params.id)
    .then(object=>{
        globalFunctions.sendResult(res,object);
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
    })
}

exports.create = (req, res) => {
    task.create({
        teacher_discipline_id: req.body.teacher_discipline_id,
        prog_language_id: req.body.prog_language_id,
        name: req.body.name,
        description: req.body.description
    })
    .then(object => {
        globalFunctions.sendResult(res, object);
    })
    .catch(err => {
        globalFunctions.sendError(res, err);
    });
}

exports.update = (req, res) => {
    task.update({
        teacher_discipline_id: req.body.teacher_discipline_id,
        prog_language_id: req.body.prog_language_id,
        name: req.body.name,
        description: req.body.description
    }, {
        where: {
            id: req.params.id
        }
    })
    .then(object=>{
        globalFunctions.sendResult(res,object);
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
    })
}

exports.delete = (req, res) => {
    task.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(object=>{
        globalFunctions.sendResult(res,"Запись удалена");
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
    })
}

exports.findByProgLanguage = (req, res) => {
    task.findAll({
        where: {
            prog_language_id: req.params.id
        }
    })
    .then(objects => {
        globalFunctions.sendResult(res, objects);
    })
    .catch(err => {
        globalFunctions.sendError(res, err);
    });
}

// exports.findByUserId = (req, res) => {
//     task.findAll({
//         where: {
//             user_id: req.params.id
//         }
//     })
//     .then(objects => {
//         globalFunctions.sendResult(res, objects);
//     })
//     .catch(err => {
//         globalFunctions.sendError(res, err);
//     });
// }

exports.findByTeacherDisciplineId = (req, res) => {
    task.findAll({
        where: {
            teacher_discipline_id: req.params.id
        }
    })
    .then(objects => {
        globalFunctions.sendResult(res, objects);
    })
    .catch(err => {
        globalFunctions.sendError(res, err);
    });
}

// exports.findByFileUploaded = (req, res) => {
//     task.findAll({
//         where: {
//             file: {
//                 [Op.not]: ''
//             }
//         }
//     })
//     .then(objects => {
//         globalFunctions.sendResult(res, objects);
//     })
//     .catch(err => {
//         globalFunctions.sendError(res, err);
//     });
// }

exports.findByTeacherDisciplineIdAndTaskId = (req,res) =>{
    db.sequelize.query(
        `SELECT user.login, user.id as user_id, task.id as task_id, task.isComplete as task_isComplete
        FROM user
        RIGHT JOIN task ON user.id = task.user_id
        WHERE teacher_discipline_id = ${req.params.teacher_discipline_id} AND task.id = ${req.params.task_id}`,
        {
            type: db.sequelize.QueryTypes.SELECT
        })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
}

// exports.findByTeacherDisciplineIdAndTaskIdAndUserId = (req,res) =>{
//     db.sequelize.query(
//         `SELECT * FROM teacher_discipline, task, user WHERE teacher_discipline.id=${req.params.teacher_discipline_id} AND task.id=${req.params.task_id} AND user.id=${req.params.user_id}`,
//         {
//             type: db.sequelize.QueryTypes.SELECT
//         })
//         .then(objects => {
//             globalFunctions.sendResult(res, objects);
//         })
//         .catch(err => {
//             globalFunctions.sendError(res, err);
//         })
// }