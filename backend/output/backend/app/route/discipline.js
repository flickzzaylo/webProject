module.exports = (app) => { 

    const discipline = require('../controller/discipline');
    
    // Получение всех пользователей
    app.get('/api/listDisciplines', discipline.findAll);

    // Добавление пользователя
    app.post('/api/addDiscipline', discipline.create);

    // Обновление данных пользователя по id
    app.post('/api/updateDiscipline/:id', discipline.update);

    // Удаление данных пользователя по id
    app.post('/api/deleteDiscipline/:id', discipline.delete);

    // Получение пользователя по id
    app.get('/api/discipline/:id', discipline.findById);

}