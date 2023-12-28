var db = require('../config/db.config.js')
var globalFunctions = require('../config/global.function.js');
var Teacher = db.teacher;


exports.findAll = (req,res) =>{
    Teacher.findAll()
    .then(objects=>{
        globalFunctions.sendResult(res,objects);
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
    })
}

exports.findById = (req,res) =>{
    Teacher.findByPk(req.params.id)
    .then(object=>{
        globalFunctions.sendResult(res,object);
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
    })
}

exports.create = (req,res) =>{
    Teacher.create({
        name:req.body.name,
        user_id:req.body.user_id
    })
    .then(object=>{
        globalFunctions.sendResult(res,object);
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
    })
}

exports.update = (req,res) =>{
    Teacher.update({
        name:req.body.name,
        user_id:req.body.user_id
    },{
    where: {
        id:req.params.id
    }})
    .then(object=>{
        globalFunctions.sendResult(res,object);
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
    })
}

exports.delete = (req,res) =>{
    Teacher.destroy({
        where:{
            id:req.params.id
        }
    })
    .then(()=>{
        globalFunctions.sendResult(res,'Преподаватель удален');
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
    })
}
