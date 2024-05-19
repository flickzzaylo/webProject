module.exports = (app) =>{
    const userTasks = require('../controller/userTasks');
    var {authJwt} = require("../middleware");
    app.get('/api/listUserTasks',[authJwt.verifyToken],userTasks.findAll);

    app.get('/api/getUserTasksByTaskId/:task_id',[authJwt.verifyToken],userTasks.findByTaskId);

    app.post('/api/deleteTaskByUserId/:id',[authJwt.verifyToken],userTasks.deleteTask)

    app.post('/api/switchComplete/:id',[authJwt.verifyToken],userTasks.switchComplete);

    app.get('/api/userTask/:id',[authJwt.verifyToken],userTasks.findById);

    app.post('/api/updateUserTask/:id',[authJwt.verifyToken],userTasks.update);

    app.post('/api/addUserToTask/:user_id',[authJwt.verifyToken],userTasks.create);

    app.get('/api/getUsersInTask/:task_id',[authJwt.verifyToken],userTasks.findUsersInTask);

    app.post('/api/uploadTask/:id',[authJwt.verifyToken],userTasks.uploadFile);

    app.post('/api/checkSql',[authJwt.verifyToken],userTasks.findSql);

    app.post('/api/checkBackend',[authJwt.verifyToken],userTasks.checkBackend);

    app.post('/api/setMark/:id',[authJwt.verifyToken],userTasks.setMark);

    app.get('/api/getTask/userId=:user_id/taskId=:task_id',[authJwt.verifyToken],userTasks.findUserTaskByTaskIdAndUserId);
}