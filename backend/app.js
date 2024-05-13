var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./app/config/db.config.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));
db.sequelize.sync({force: false});
app.use(express.static("files"));
/////
var compiler = require('./app/route/compiler.js');
compiler(app);
var role = require('./app/route/role.js');
role(app);
var discipline = require('./app/route/discipline.js');
discipline(app);
var prog_language = require('./app/route/progLanguage.js')
prog_language(app);
var user = require('./app/route/user.js');
user(app);
var teacher = require('./app/route/teacher.js');
teacher(app);
var teacherDiscipline = require('./app/route/teacherDiscipline.js');
teacherDiscipline(app);
var task = require('./app/route/task.js');
task(app);
var userTasks = require('./app/route/userTasks');
userTasks(app);
var auth = require('./app/route/auth.js');
auth(app);
var testcase = require('./app/route/testcase');
testcase(app);
app.listen(2000);

var route, routes = [];

app._router.stack.forEach(function(middleware){
    if(middleware.route){ // routes registered directly on the app
        routes.push(middleware.route);
    } else if(middleware.name === 'router'){ // router middleware
        middleware.handle.stack.forEach(function(handler){
            route = handler.route;
            route && routes.push(route);
        });
    }
});
console.log(routes)