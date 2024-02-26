module.exports = (app) =>{
    const teacherDiscipline = require('../controller/teacherDiscipline');

    app.get('/api/listTeacherDisciplines',teacherDiscipline.findAll);

    app.get('/api/teacherDiscipline/:id',teacherDiscipline.findById);

    app.post('/api/createTeacherDiscipline',teacherDiscipline.create);

    app.post('/api/updateTeacherDiscipline/id=:id',teacherDiscipline.update);

    app.post('/api/deleteTeacherDiscipline/:id',teacherDiscipline.delete);

    app.get('/api/disciplinesNotTeacher/:teacher_id', teacherDiscipline.findDisciplinesNotTeacher);
}