const {authJwt} = require("../middleware");
module.exports = (app) =>{
    const task = require('../controller/task.js');
    var {authJwt} = require("../middleware");
    app.get('/api/listTasks',[authJwt.verifyToken],task.findAll);
    app.get('/api/task/:id',[authJwt.verifyToken],task.findById);
    app.post('/api/addTask',[authJwt.verifyToken],task.create);
    app.post('/api/deleteTask/:id',[authJwt.verifyToken],task.delete);
    app.post('/api/updateTask/:id',[authJwt.verifyToken],task.update);
    app.get('/api/taskByProgLang/:id',[authJwt.verifyToken],task.findByProgLanguage);
    // app.get('/api/taskByUser/:id',task.findByUserId);
    // app.get('/api/uploadedTasks',task.findByFileUploaded);
    app.get('/api/taskByDiscipline/:id',[authJwt.verifyToken],task.findByTeacherDisciplineId);
    app.get('/api/task/teacherDId=:teacher_discipline_id/taskId=:task_id',[authJwt.verifyToken],task.findByTeacherDisciplineIdAndTaskId);
    // app.get('/api/task/teacherDId=:teacher_discipline_id/taskId=:task_id/userId=:user_id',task.findByTeacherDisciplineIdAndTaskIdAndUserId);
}