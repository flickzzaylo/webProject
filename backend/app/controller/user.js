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
exports.findTeachers = async (req, res) => {
    try {
        const data = await User.findAll({
            where: {
                role_id: 1
            }
        })
        globalFunctions.sendResult(res, data);
    }catch (e){
        globalFunctions.sendError(res,e);
    }
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
exports.teachersHasNotUser = (req,res) =>{
    db.sequelize.query(
        `SELECT user.id, user.password, user.login, user.role_id
        FROM user
        LEFT JOIN teacher ON user.id = teacher.user_id
        WHERE teacher.id IS NULL AND role_id=1;`,
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

