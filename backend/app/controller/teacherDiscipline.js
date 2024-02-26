var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.function.js');
var teacherDiscipline = db.teacher_discipline;
var teacher = db.teacher;

exports.findAll = (req,res) =>{
    db.sequelize.query(
        `SELECT teacher.name as teacher_name, discipline.name as discipline_name, teacher_discipline.* 
        FROM teacher_discipline
        INNER JOIN discipline ON discipline.id=teacher_discipline.discipline_id
        INNER JOIN teacher ON teacher.id=teacher_discipline.teacher_id;`,
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

exports.findById = (req,res) =>{
    teacherDiscipline.findByPk(req.params.id)
    .then(object=>{
        globalFunctions.sendResult(res,object);
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
    })
}

exports.create = (req,res) =>{
    teacherDiscipline.create({
        teacher_id:req.body.teacher_id,
        discipline_id:req.body.discipline_id 
    })
    .then(object=>{
        globalFunctions.sendResult(res,object);
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
    })
}

exports.update = (req,res) =>{
    teacherDiscipline.update({
        teacher_id:req.body.teacher_id,
        discipline_id:req.body.discipline_id
    },{
        where:{
            id:req.params.id
        }
    })
    .then(object=>{
        globalFunctions.sendResult(res,object);
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
    })
}

exports.delete = (req,res) =>{
    teacherDiscipline.destroy({
        where:{
            id:req.params.id
        }
    })
    .then(()=>{
        globalFunctions.sendResult(res,'Запись удалена');
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
    })
}

exports.findDisciplinesNotTeacher = (req, res) => {
    db.sequelize.query(
        `SELECT * FROM discipline
            WHERE NOT EXISTS (
                SELECT * FROM teacher_discipline
                WHERE teacher_id = ? AND teacher_discipline.discipline_id = discipline.id 
            )`,
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: [req.params.teacher_id]
        })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};