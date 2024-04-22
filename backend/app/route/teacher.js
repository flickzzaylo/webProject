const {authJwt} = require("../middleware");
module.exports = (app) =>{
    const teacher = require('../controller/teacher.js');
    var {authJwt} = require("../middleware");
    app.get('/api/listTeachers',[authJwt.verifyToken],teacher.findAll);

    app.get('/api/teacher/:id',[authJwt.verifyToken],teacher.findById);

    app.post('/api/createTeacher',[authJwt.verifyToken],teacher.create);

    app.post('/api/updateTeacher/:id',[authJwt.verifyToken],teacher.update);

    app.post('/api/deleteTeacher/:id',[authJwt.verifyToken],teacher.delete);
}