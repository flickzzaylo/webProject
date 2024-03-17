module.exports = (app) =>{
    const user = require('../controller/user.js');

    app.get('/api/listUsers',user.findAll);

    app.get('/api/user/:id',user.findById);

    app.get('/api/userByRoleID/:id',user.findByRoleId);

    app.post('/api/createUser',user.create);

    app.post('/api/updateUser/:id',user.update);

    app.post('/api/deleteUser/:id',user.delete);

    app.get('/api/listTeachersUsers',user.findTeachers);
    app.get('/api/listTeachersHasNotUser',user.teachersHasNotUser);
}