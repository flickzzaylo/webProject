module.exports = (app) => {

    const teacher = require('../controller/teacher');
    
    // Получение всех пользователей
    app.get('/api/listTeachers', teacher.findAll);
    // Добавление пользователя
    app.post('/api/addTeacher', teacher.create);

    // Обновление данных пользователя по id
    app.post('/api/updateTeacher/:id', teacher.update);

    // Удаление данных пользователя по id
    app.post('/api/deleteTeacher/:id', teacher.delete);

    // Получение пользователя по id
    app.get('/api/teacher/:id', teacher.findById);

    app.get('/api/listTeacherDiscipline',teacher.showListDisciplines);
    app.post('/api/addTeacherDiscipline',teacher.createDiscipline);
    app.post('/api/deleteTeacherDiscipline/teacherId=:teacher_id/disciplineId=:discipline_id',teacher.deleteTeacherDiscipline);
};