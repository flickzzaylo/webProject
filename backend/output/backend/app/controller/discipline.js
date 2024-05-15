var db = require('../config/db.config.js');
var Discipline = db.discipline; // название модели смотреть в init-models.js
var globalFunctions = require('../config/global.functions.js');

// Получение всех пользователей
exports.findAll = (req, res) => {
   Discipline.findAll()
        .then(objects => {
            // возврат найденных записей
            globalFunctions.sendResult(res, objects);
        }).catch(err => {
            // возврат найденной ошибки
            globalFunctions.sendError(res, err);
        })
};

exports.create = (req, res) => {
    Discipline.create({
        name: req.body.name
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.update = (req, res) => {
    Discipline.update({
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
    Discipline.destroy({
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
    Discipline.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};