module.exports = (app) => {
    const role = require('../controller/role.js');

    app.get('/api/listRoles',role.findAll);

    app.post('/api/addRole',role.create);
};