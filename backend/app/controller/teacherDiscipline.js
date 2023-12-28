var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.function.js');
var teacherDiscipline = db.teacher_discipline;

exports.findAll = (req,res) =>{
    teacherDiscipline.findAll()
    .then(objects=>{
        globalFunctions.sendResult(res,objects);
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
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