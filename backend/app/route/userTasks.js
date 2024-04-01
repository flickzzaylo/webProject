module.exports = (app) =>{
    const userTasks = require('../controller/userTasks');

    app.get('/api/listUserTasks',userTasks.findAll);

    app.get('/api/getUserTasksByTaskId/:task_id',userTasks.findByTaskId);

    app.post('/api/deleteTaskByUserId/:id',userTasks.deleteTask)

    app.post('/api/switchComplete/:id',userTasks.switchComplete);

    app.get('/api/userTask/:id',userTasks.findById);

    app.post('/api/updateUserTask/:id',userTasks.update);

    app.post('/api/addUserToTask/:user_id',userTasks.create);

    app.get('/api/getUsersInTask/:task_id',userTasks.findUsersInTask);
}