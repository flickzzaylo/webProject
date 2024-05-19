module.exports = (app) => {

    const user = require('../controller/studentGroup');
    
    // Получение всех пользователей
    app.get('/api/listStudentGroups', user.findAll);
    // Добавление пользователя
    app.post('/api/addStudentGroup', user.create);

    // Обновление данных пользователя по id
    app.post('/api/updateStudentGroup/:id', user.update);

    // Удаление данных пользователя по id
    app.post('/api/deleteStudentGroup/:id', user.delete);

    // Получение пользователя по id
    app.get('/api/studentGroup/:id', user.findById);

    // // Получение пользователя по username
    // app.get('/api/group/:name', user.findByUsername);
};