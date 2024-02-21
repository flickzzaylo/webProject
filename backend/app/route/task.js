module.exports = (app) =>{
    const task = require('../controller/task.js');

    app.get('/api/listTasks',task.findAll);
    app.get('/api/task/:id',task.findById);
    app.post('/api/addTask',task.create);
    app.post('/api/deleteTask/id=:id',task.delete);
    app.post('/api/updateTask/:id',task.update);
    app.get('/api/taskByProgLang/:id',task.findByProgLanguage);
    app.get('/api/taskByUser/:id',task.findByUserId);
    app.get('/api/uploadedTasks',task.findByFileUploaded);
    app.get('/api/taskByDiscipline/:id',task.findByTeacherDisciplineId)
}