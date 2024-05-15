module.exports = (app) => { 

    const student = require('../controller/student');
    
    // Получение всех пользователей
    app.get('/api/listStudents', student.findAll);

    // Добавление пользователя
    app.post('/api/addStudent', student.create);

    // Обновление данных пользователя по id
    app.post('/api/updateStudent/:id', student.update);

    // Удаление данных пользователя по id
    app.post('/api/deleteStudent/:id', student.delete);

    // Получение пользователя по id
    app.get('/api/student/:id', student.findById);

    app.get('/api/studentsByStudentGroup/studentGroupId=:student_group_id', student.studentsByStudentGroup);

}