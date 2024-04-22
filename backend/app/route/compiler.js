const {authJwt} = require("../middleware");
module.exports = (app) => {
    const compiler = require('../controller/compiler.js');
    var {authJwt} = require("../middleware");
    app.post('/api/compileCode',[authJwt.verifyToken], compiler.code);
};