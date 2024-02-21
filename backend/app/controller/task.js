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
        user_id: req.body.user_id,
        prog_language_id: req.body.prog_language_id,
        name: req.body.name,
        description: req.body.description
        // mark: req.body.mark,
        // comment: req.body.comment,
        // file: req.body.file
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
        user_id: req.body.user_id,
        prog_language_id: req.body.prog_language_id,
        name: req.body.name,
        description: req.body.description,
        mark: req.body.mark,
        comment: req.body.comment,
        file: req.body.file
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

exports.findByUserId = (req, res) => {
    task.findAll({
        where: {
            user_id: req.params.id
        }
    })
    .then(objects => {
        globalFunctions.sendResult(res, objects);
    })
    .catch(err => {
        globalFunctions.sendError(res, err);
    });
}

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

exports.findByFileUploaded = (req, res) => {
    task.findAll({
        where: {
            file: {
                [Op.not]: ''
            }
        }
    })
    .then(objects => {
        globalFunctions.sendResult(res, objects);
    })
    .catch(err => {
        globalFunctions.sendError(res, err);
    });
}