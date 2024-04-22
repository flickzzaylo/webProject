const {authJwt} = require("../middleware");
module.exports = (app) =>{
    const teacherDiscipline = require('../controller/teacherDiscipline');
    var {authJwt} = require("../middleware");
    app.get('/api/listTeacherDisciplines',[authJwt.verifyToken],teacherDiscipline.findAll);

    app.get('/api/teacherDiscipline/:id',[authJwt.verifyToken],teacherDiscipline.findById);

    app.post('/api/createTeacherDiscipline',[authJwt.verifyToken],teacherDiscipline.create);

    app.post('/api/updateTeacherDiscipline/id=:id',[authJwt.verifyToken],teacherDiscipline.update);

    app.post('/api/deleteTeacherDiscipline/:id',[authJwt.verifyToken],teacherDiscipline.delete);

    app.get('/api/disciplinesNotTeacher/:teacher_id',[authJwt.verifyToken], teacherDiscipline.findDisciplinesNotTeacher);
}