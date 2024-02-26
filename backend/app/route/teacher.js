module.exports = (app) =>{
    const teacher = require('../controller/teacher.js');
    
    app.get('/api/listTeachers',teacher.findAll);

    app.get('/api/teacher/:id',teacher.findById);

    app.post('/api/createTeacher',teacher.create);

    app.post('/api/updateTeacher/:id',teacher.update);

    app.post('/api/deleteTeacher/:id',teacher.delete);
}