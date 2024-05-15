var db = require('../config/db.config.js');
Student = db.student;
var globalFunctions = require('../config/global.functions.js');

exports.findAll = (req, res) => {
    Student.findAll()
            .then(objects => {
                globalFunctions.sendResult(res, objects);
            }).catch(objects => {
                globalFunctions.sendError(res, err);
            })
}

exports.create = (req, res) => {
    Student.create({
                name: req.body.name,
                student_group_id: req.body.student_group_id
            }).then(objects => {
                globalFunctions.sendResult(res, objects);
            }).catch(objects => {
                globalFunctions.sendError(res, err);
            })
}

exports.update = (req, res) => {
    Student.update({
                name: req.body.name,
                student_group_id: req.body.student_group_id
            },
            {
                where: {
                    id: req.params.id
                }
            }
            ).then(objects => {
                globalFunctions.sendResult(res, objects);
            }).catch(objects => {
                globalFunctions.sendError(res, err);
            })
}

exports.delete = (req, res) => {
    Student.destroy({
            where: {
                    id: req.params.id
                }
            }
            ).then(objects => {
                globalFunctions.sendResult(res, 'Запись удалена');
            }).catch(objects => {
                globalFunctions.sendError(res, err);
            })
}

var StudentGroup = db.student_group;

exports.findById = (req, res) => {
    Student.findAll({
        include: [
            {
                model: StudentGroup,
                required: true // INNER JOIN
            }
        ]
    })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.studentsByStudentGroup = (req, res) => {
    StudentGroup.findAll({
        include: [
            {
                model: Student,
                required: true // INNER JOIN
            }
        ],
        where: {
            id: req.params.student_group_id
        }
    })
    .then(objects => {
        globalFunctions.sendResult(res, objects);
    })
    .catch(err => {
        globalFunctions.sendError(res, err);
    })
};