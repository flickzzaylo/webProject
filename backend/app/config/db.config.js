var dbProperties = {
    database: 'online_compiler',
    username: 'root',
    password: '',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10, // максимальное количество одновременно открытых соединений
        min: 0, 
        acquire: 30000,
        idle: 10000
    }
};

var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    dbProperties.database, dbProperties.username, dbProperties.password,
    {
        host: dbProperties.host,
        dialect: dbProperties.dialect,
        operatorsAliases: false,
        pool: {
            max: dbProperties.max,
            min: dbProperties.pool.min,
            acquire: dbProperties.pool.acquire,
            idle: dbProperties.pool.idle
        },
        define: {
            // имена таблиц не будут создаваться автоматически во множественном числе
            freezeTableName: true,

            // запрет на автоматическое создание полей createdAt и updatedAt (эти поля по умолчанию создаются ORM Sequalize во всех таблицах, при желании можете включить эту настройку)
            timestamps: false
        }
    }
);

// Подключение моделей
var init_models = require('../model/init-models.js');
var db = init_models.initModels(sequelize);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

Object.keys(db).forEach(key => {
    if (db[key] && db[key].associate) {
        db[key].associate(db);
    }
});

// db.role.create({
//     name: 'Виталя'
// }).then(newReport=>{
//     console.log('Тест пройден',newReport);
// }).catch(error=>{
//     console.error('Ошибка при тесте',error);
// });

module.exports = db;