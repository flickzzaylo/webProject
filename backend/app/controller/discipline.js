var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.function.js');
var Discipline = db.discipline;

exports.findAll = (req,res)=>{
    Discipline.findAll()
    .then(objects=>{
        globalFunctions.sendResult(res,objects);
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
    })
}

exports.create = (req,res)=>{
    Discipline.create({
        name:req.body.name
    })
    .then(object=>{
        globalFunctions.sendResult(res,object);
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
    })
}

exports.delete = (req,res) =>{
    Discipline.destroy({
        where:
        {
            id: req.params.id
        }
    })
    .then(()=>{
        globalFunctions.sendResult(res,'Предмет удален');
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
    })
}

exports.update = (req,res) => {
    Discipline.update({
        name:req.body.name
    },
    {
        where:
        {
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

exports.findById = (req,res) =>{
    Discipline.findByPk(req.params.id)
    .then(object=>{
        globalFunctions.sendResult(res,object);
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
    })
}
