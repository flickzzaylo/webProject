var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.function.js');
var Prog_language = db.prog_language;

exports.findAll = (req,res) =>{
    Prog_language.findAll()
    .then(objects=>{
        globalFunctions.sendResult(res,objects);
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
    })
}

exports.findById = (req,res) =>{
    Prog_language.findByPk(req.params.id)
    .then(object=>{
        globalFunctions.sendResult(res,object);
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
    })
}

exports.create = (req,res) =>{
    Prog_language.create({
        name:req.body.name
    })
    .then(object=>{
        globalFunctions.sendResult(res,object);
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
    })
}

exports.update = (req,res) => {
    Prog_language.update({
        name: req.body.name
    },
    {
        where:
        {
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
    Prog_language.destroy({
        where:{
            id:req.params.id
        }
    })
    .then(()=>{
        globalFunctions.sendResult(res,'Язык удален');
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
    })
}