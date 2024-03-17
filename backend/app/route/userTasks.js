module.exports = (app) =>{
    const userTasks = require('../controller/userTasks');

    app.get('/api/listUserTasks',userTasks.findAll);

    app.get('/api/getUserTasksByTaskId/:task_id',userTasks.findByTaskId);

    app.post('/api/deleteTaskByUserId/:id',userTasks.deleteTask)

    app.post('/api/switchComplete/:id',userTasks.switchComplete);
}