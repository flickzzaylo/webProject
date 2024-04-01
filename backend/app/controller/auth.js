var db = require("../config/db.config");
var config = require("../config/auth.config");
var User = db.user;
var globalFunctions = require('../config/global.function.js');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.register = (req, res) => {
    User.create({
        login: req.body.login,
        password: bcrypt.hashSync(req.body.password, 10),
        role_id: req.body.role_id
    })
        .then(() => {
            var result = {
                message: "Пользователь зарегистрирован"
            };
            globalFunctions.sendResult(res, result);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.login = (req, res) => {
    User.findOne({
        where: {
            login: req.body.login
        }
    })
        .then(user => {
            if (!user) {
                res.status(404).send({ message: "Неверно введенный логин и/или пароль" });
                return;
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                res.status(401).send({
                    accessToken: null,
                    message: "Неверно введенный логин и/или пароль"
                });
                return;
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: "1h"
            });
            console.log("Токен при авторизации");
            console.log(token);
            var object = {
                id: user.id,
                login: user.login,
                accessToken: token
            };
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.refreshToken = (req, res) => {
    User.findOne({
        where: {
            login: req.body.login
        }
    })
        .then(user => {
            if (!user) {
                globalFunctions.sendError(res, "Неверно введенный логин и/или пароль");
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: "1h" // 1 час — время действия токена
            });
            console.log("Новый токен");
            console.log(token);
            var object = {
                id: user.id,
                login: user.login,
                accessToken: token
            };
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.userBoard = (req, res) => {
    globalFunctions.sendResult(res, "Пользователь авторизован");
};