var globalFunctions = require('../config/global.functions.js');
var db = require('../config/db.config.js');
var teacher = db.teacher; // название модели смотреть в init-models.js
var teacherDiscipline = db.teacher_discipline;

// Получение всех пользователей
exports.findAll = (req, res) => {
    teacher.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление пользователя
exports.create = (req, res) => {
    teacher.create({
        name: req.body.name
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Обновление данных пользователя по id
exports.update = (req, res) => {
    teacher.update({
            name: req.body.name
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Удаление пользователя по id
exports.delete = (req, res) => {
    teacher.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Получение данных пользователя по id
exports.findById = (req, res) => {
    teacher.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.showListDisciplines = (req,res)=>{
    db.sequelize.query(
        `SELECT teacher.name as teacher_name, discipline.name as discipline_name 
        FROM teacher_discipline
        INNER JOIN discipline ON discipline.id=teacher_discipline.discipline_id
        INNER JOIN teacher ON teacher.id=teacher_discipline.teacher_id;`,
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

exports.createDiscipline = (req, res) => {
    teacherDiscipline.create({
        teacher_id: req.body.teacher_id,
        discipline_id: req.body.discipline_id
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.deleteTeacherDiscipline = (req,res) => {
    teacherDiscipline.destroy({
        include: [
            {
                model: teacherDiscipline,
                required: true
            }
        ],
        where: {
            teacher_id: req.params.teacher_id,
            discipline_id: req.params.discipline_id
        }
    })
    .then(objects => {
        globalFunctions.sendResult(res,objects);
    })
    .catch(err => {
        globalFunctions.sendError(res,err);
    })
};