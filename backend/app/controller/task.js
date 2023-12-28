var db = require('../config/db.config');
var globalFunctions = require('../config/global.function');
var task = db.task;

exports.findAll = (req,res) =>{
    task.findAll()
    .then(objects=>{
        globalFunctions.sendResult(res,objects);
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
    })
}