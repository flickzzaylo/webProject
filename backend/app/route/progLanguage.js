const {authJwt} = require("../middleware");
module.exports = (app) => {
    const prog_language = require('../controller/progLanguage.js');
    var {authJwt} = require("../middleware");
    app.get('/api/listProgLang',[authJwt.verifyToken],prog_language.findAll)

    app.get('/api/proglang/:id',[authJwt.verifyToken],prog_language.findById)

    app.post('/api/createProgLang',[authJwt.verifyToken],prog_language.create);

    app.post('/api/updateProgLang/:id',[authJwt.verifyToken],prog_language.update);

    app.post('/api/deleteProgLang/:id',[authJwt.verifyToken],prog_language.delete);
}