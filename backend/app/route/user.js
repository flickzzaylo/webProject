module.exports = (app) =>{
    const user = require('../controller/user.js');
    var {authJwt} = require("../middleware");
    app.get('/api/listUsers',[authJwt.verifyToken],user.findAll);

    app.get('/api/user/:id',[authJwt.verifyToken],user.findById);

    app.get('/api/userByRoleID/:id',[authJwt.verifyToken],user.findByRoleId);

    app.post('/api/createUser',[authJwt.verifyToken],user.create);

    app.post('/api/updateUser/:id',[authJwt.verifyToken],user.update);

    app.post('/api/deleteUser/:id',[authJwt.verifyToken],user.delete);

    app.get('/api/listTeachersUsers',[authJwt.verifyToken],user.findTeachers);
    app.get('/api/listTeachersHasNotUser',[authJwt.verifyToken],user.teachersHasNotUser);

    app.get('/api/roleByUser/:login',[authJwt.verifyToken],user.findRoleByUser);
    app.get('/api/idByUser/:login',[authJwt.verifyToken],user.findIdByLogin);
}