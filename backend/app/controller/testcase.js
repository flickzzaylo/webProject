var db = require('../config/db.config.js')
var globalFunctions = require('../config/global.function.js');
var Testcase = db.testcase;


exports.findAll = (req,res) =>{
    Testcase.findAll()
        .then(response=>{
            globalFunctions.sendResult(res,response);
        })
        .catch(err=>{
            globalFunctions.sendError(res,err);
        })
}

exports.findById = (req,res) =>{
    Testcase.findByPk(req.params.id)
        .then(object =>{
            globalFunctions.sendResult(res,object);
        })
        .catch(e=>{
            globalFunctions.sendError(res,e);
        })
}

exports.create = (req,res) =>{
    Testcase.create({
        task_id:req.body.task_id,
        input:req.body.input,
        output:req.body.output
    })
        .then(response=>{
            globalFunctions.sendResult(res,response);
        })
        .catch(err=>{
            globalFunctions.sendError(res,err);
        })
}

exports.update = (req,res) =>{
    Testcase.update({
        task_id:req.body.task_id,
        input:req.body.input,
        output:req.body.output
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
    Testcase.destroy({
        where:{
            id:req.params.id
        }
    })
        .then(()=>{
            globalFunctions.sendResult(res,'Тесткейс удален');
        })
        .catch(err=>{
            globalFunctions.sendError(res,err);
        })
}

exports.testcasesToTask = (req,res) =>{
    Testcase.findAll({
        where:{
            task_id:req.params.task_id
        }
    })
        .then(objs=>{
            globalFunctions.sendResult(res,objs);
        })
        .catch(e=>{
            globalFunctions.sendError(res,e);
        })
}
