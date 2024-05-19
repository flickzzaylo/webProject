var globalFunctions = require('../config/global.functions.js');
var db = require('../config/db.config.js');
var Group = db.student_group; // название модели смотреть в init-models.js

// Получение всех пользователей
exports.findAll = (req, res) => {
    Group.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление пользователя
exports.create = (req, res) => {
    Group.create({
        name: req.body.name
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Обновление данных пользователя по id
exports.update = (req, res) => {
    Group.update({
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
    Group.destroy({
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
    Group.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// // Получение данных пользователя по username
// exports.findByUsername = (req, res) => {
//     Group.findAll({
//         where: {
//             name: req.params.name
//         }
//     }).then(objects => {
//         globalFunctions.sendResult(res, objects);
//     }).catch(err => {
//         globalFunctions.sendError(res, err);
//     })
// };
