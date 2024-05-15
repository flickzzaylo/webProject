var db = require('../config/db.config.js');
var Teacher = db.teacher; // название модели смотреть в init-models.js
var globalFunctions = require('../config/global.functions.js');

// Получение всех пользователей
exports.findAll = (req, res) => {
    Teacher.findAll()
            .then(objects => {
                // возврат найденных записей
                globalFunctions.sendResult(res, objects);
            }).catch(err => {
                // возврат найденной ошибки
                globalFunctions.sendError(res, err);
            })
};
 
exports.create = (req, res) => {
    Teacher.create({
        name: req.body.name
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};
 
exports.update = (req, res) => {
    Teacher.update({
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
    Teacher.destroy({
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
    Teacher.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

var TeacherDiscipline = db.teacher_discipline;

exports.findAllDisciplines = (req, res) => {
    TeacherDiscipline.findAll()
                .then(object => {
                    globalFunctions.sendResult(res, object);
                })
                .catch(err => {
                    globalFunctions.sendError(res, err);
                })
}

exports.createDiscipline = (req, res) => {
    TeacherDiscipline.create({
        teacher_id: req.body.teacher_id, 
        discipline_id: req.body.discipline_id 
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.deleteDiscipline = (req, res) => {
    TeacherDiscipline.destroy({
        where: {
            teacher_id: req.body.teacher_id,
            discipline_id: req.body.discipline_id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};
 
