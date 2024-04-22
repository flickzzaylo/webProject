const {authJwt} = require("../middleware");
module.exports = (app) => {
    const discipline = require('../controller/discipline.js');
    var {authJwt} = require("../middleware");
    app.get('/api/listDisciplines',[authJwt.verifyToken],discipline.findAll);

    app.post('/api/createDiscipline',[authJwt.verifyToken],discipline.create);

    app.post('/api/deleteDiscipline/:id',[authJwt.verifyToken],discipline.delete);

    app.post('/api/updateDiscipline/:id',[authJwt.verifyToken],discipline.update);

    app.get('/api/discipline/:id',[authJwt.verifyToken],discipline.findById);
}