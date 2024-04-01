var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.function.js');
const {caretTrimReplace} = require("semver/internal/re");
const {response} = require("express");
var UserTasks = db.user_tasks;

exports.findAll = (req, res) => {
    UserTasks.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findByTaskId = async (req,res) =>{
    try {
        const data = await db.sequelize.query(
            `SELECT user.login,user_tasks.id as primary_id, user_tasks.* from user_tasks JOIN user ON user.id=user_tasks.user_id WHERE user_tasks.task_id = ${req.params.task_id}`,
            {
                type: db.sequelize.QueryTypes.SELECT
            })
        globalFunctions.sendResult(res, data);
    }catch(e){
        globalFunctions.sendError(res,e);
    }
}
exports.deleteTask = (req,res) =>{
        UserTasks.destroy({
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

exports.switchComplete = async (req,res) =>{
    try {
        const data = await db.sequelize.query(`UPDATE user_tasks SET isComplete=!isComplete WHERE id = ${req.params.id}`,
            {
                type: db.sequelize.QueryTypes.UPDATE
            })
        globalFunctions.sendResult(res, data);
    }catch (e){
        globalFunctions.sendError(res,e);
    }
}

exports.update = (req, res) => {
    UserTasks.update({
        task_id: req.body.task_id,
        user_id: req.body.user_id,
        mark: req.body.mark,
        comment: req.body.comment,
        file: req.body.file,
        isComplete: req.body.isComplete
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

exports.findById = async (req,res) =>{
    try {
        const data = await UserTasks.findByPk(req.params.id);
        globalFunctions.sendResult(res, data);
    }catch (e){
        console.log(e);
        globalFunctions.sendResult(res,e);
    }
}

exports.create = (req,res) =>{
    UserTasks.create({
        task_id:req.body.task_id,
        user_id:req.body.user_id,
        mark:null,
        comment: "",
        file: null,
        isComplete: 0
    })
        .then(object=>{
            globalFunctions.sendResult(res,object);
        })
        .catch(err=>{
            globalFunctions.sendError(res,err);
        })
}

exports.findUsersInTask = async (req,res) =>{
    try {
        const data = await db.sequelize.query(
            `SELECT user_tasks.user_id FROM user_tasks WHERE user_tasks.task_id=${req.params.task_id}`,
            {
                type: db.sequelize.QueryTypes.SELECT
            })
        globalFunctions.sendResult(res, data);
    }catch(e){
        globalFunctions.sendError(res,e);
    }
}

// exports.addUser = async (req,res) => {
//     try{
//         const data = await db.sequelize.query(`INSERT`)
//     }catch (e){
//
//     }
// }