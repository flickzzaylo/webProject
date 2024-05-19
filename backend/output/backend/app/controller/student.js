var globalFunctions = require('../config/global.functions.js');
var db = require('../config/db.config.js');
var Student = db.student; // название модели смотреть в init-models.js
var StudentGroup = db.student_group;

exports.create = (req, res) => {
    Student.create({
        name: req.body.name,
        student_group_id: req.body.student_group_id
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

//Обновление данных студента
exports.update = (req,res) => {
    student.update({
        name: req.body.name,
        student_group_id: req.body.student_group_id
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(object => {
        globalFunctions.sendResult(res,object);
    })
    .catch(err => {
        globalFunctions.sendError(res,err);
    })
};

exports.delete = (res,req) => {
    Student.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        globalFunctions.sendResult(req, 'Запись о студенте удалена');
    })
    .catch(err => {
        globalFunctions.sendError(req, err);
    })
};

exports.findById = (req,res) => {
    Student.findByPk(
        req.params.id,
        {
            include: [
                {
                    model: StudentGroup,
                    required: true // INNER JOIN
                }
            ]
        }
    )
    .then(object => {
        globalFunctions.sendResult(res,object);
    })
    .catch(err => {
        globalFunctions.sendError(res,err);
    })
};

exports.fingByStudentGroupId = (req,res) => {
    StudentGroup.findAll({
        include: [
            {
                model: Student,
                required: true
            }
        ],
        where: {
            id: req.params.student_group_id
        }
    })
    .then(objects => {
        globalFunctions.sendResult(res,objects);
    })
    .catch(err => {
        globalFunctions.sendError(res,err);
    })
};

exports.findAll = (req, res) => {
    db.sequelize.query(
        `SELECT student.*, student_group.name as student_group_name 
        FROM student
        INNER JOIN student_group ON student_group.id=student.student_group_id`,
        {
            type: db.sequelize.QueryTypes.SELECT
        })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// var user = {
//     name: "test",
//     student_group_id: 1
// };

// fetch('http://localhost:3000/api/addStudent',{
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8',
//         },
//         body: JSON.stringify(user)
//     }).then((res) => {
//         console.log(res)
//     }).catch((err) => { 
//         console.log(err)
//     })