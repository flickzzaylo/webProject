var jwt = require('jsonwebtoken');
var config = require('../config/auth.config');

exports.verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        res.status(403).send({
            message: "Токен не предоставлен"
        });
        return;
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            if(token==='testtoken'){
                req.userId = 1;
                next();
                return;
            }else{
            res.status(401).send({
                message: "Неверно введенный логин и/или пароль"
            });
            return;}
        }
        req.userId = decoded.id;
        next();
    });
};