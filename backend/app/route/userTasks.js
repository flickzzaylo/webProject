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
}