const {authJwt} = require("../middleware");
module.exports = (app) => {
    const role = require('../controller/role.js');
    var {authJwt} = require("../middleware");
    app.get('/api/listRoles',[authJwt.verifyToken],role.findAll);

    app.post('/api/addRole',[authJwt.verifyToken],role.create);

    app.post('/api/deleteRole/:id',[authJwt.verifyToken],role.delete);

    app.post('/api/updateRole/:id',[authJwt.verifyToken],role.update);

    app.get('/api/role/:id',[authJwt.verifyToken],role.findById);
};