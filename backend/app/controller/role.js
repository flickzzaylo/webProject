var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.function.js');
var Role = db.role;

exports.findAll = (req, res) => {
    Role.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.create = (req,res) =>{
    Role.create({
        name: req.body.name
    })
    .then(objects=>{
        globalFunctions.sendResult(res,objects);
    })
    .catch(err=>{
        globalFunctions.sendError(res,err);
    })
};