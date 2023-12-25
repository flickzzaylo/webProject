module.exports = (app) => {
    const role = require('../controller/role.js');

    app.get('/api/listRoles',role.findAll);

    app.post('/api/addRole',role.create);

    app.post('/api/deleteRole/id=:id',role.delete);

    app.post('/api/updateRole/:id',role.update);

    app.get('/api/role/:id',role.findById);
};