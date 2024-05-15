module.exports = (app) => { 

    const group = require('../controller/studentGroup');
    
    // Получение всех пользователей
    app.get('/api/listStudentGroups', group.findAll);

    // Добавление пользователя
    app.post('/api/addStudentGroup', group.create);

    // Обновление данных пользователя по id
    app.post('/api/updateStudentGroup/:id', group.update);

    // Удаление данных пользователя по id
    app.post('/api/deleteStudentGroup/:id', group.delete);

    // Получение пользователя по id
    app.get('/api/studentGroup/:id', group.findById);

}
