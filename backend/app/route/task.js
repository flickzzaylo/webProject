module.exports = (app) =>{
    const task = require('../controller/task.js');

    app.get('/api/listTasks',task.findAll);
}