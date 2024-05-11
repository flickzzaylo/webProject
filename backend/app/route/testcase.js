const {authJwt} = require("../middleware");
const Testcase = require("../controller/testcase");
module.exports = (app) =>{
    var {authJwt} = require("../middleware");
    app.get('/api/listTestcases',[authJwt.verifyToken],Testcase.findAll);
    app.get('/api/testcase/:id',[authJwt.verifyToken],Testcase.findById);
    app.post('/api/addTestcase',[authJwt.verifyToken],Testcase.create);
    app.post('/api/updateTestcase/:id',[authJwt.verifyToken],Testcase.update);
    app.post('/api/deleteTestcase/:id',[authJwt.verifyToken],Testcase.delete);
    app.get('/api/testcasesByTask/:task_id',Testcase.testcasesToTask);
}