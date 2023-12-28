var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.function.js');
var User = db.user;

exports.findAll = (req,res) => {
    User.findAll()
    .then(objects =>{
        globalFunctions.sendResult(res,objects);
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
    })
}

exports.findById = (req,res) =>{
    User.findByPk(req.params.id)
    .then(object =>{
        globalFunctions.sendResult(res,object);
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
    })
}

exports.findByRoleId = (req,res) =>{
    User.findAll({
        where:{
            role_id: req.params.id
        }
    })
    .then(objects=>{
        globalFunctions.sendResult(res,objects);
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
    })
}

exports.create = (req,res) =>{
    User.create({
        login:req.body.login,
        password:req.body.password,
        role_id:req.body.role_id
    })
    .then(object=>{
        globalFunctions.sendResult(res,object);
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
    })
}

exports.update = (req,res) =>{
    User.update({
        login:req.body.login,
        password:req.body.password,
        role_id:req.body.role_id
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
    User.destroy({
        where:{
            id:req.params.id
        }
    })
    .then(()=>{
        globalFunctions.sendResult(res,'Пользователь удален');
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
    })
}