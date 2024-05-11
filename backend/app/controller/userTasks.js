var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.function.js');
const {caretTrimReplace} = require("semver/internal/re");
const {response} = require("express");
var UserTasks = db.user_tasks;
var multiparty = require('multiparty');
var fs = require('fs');
var uuid = require('uuid');
const path = require("path");
var unzipper = require('unzipper')
const mysql = require('mysql2/promise')
const axios = require("axios");
const {file} = require("unzipper/lib/Open");

exports.findAll = (req, res) => {
    UserTasks.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findByTaskId = async (req,res) =>{
    try {
        const data = await db.sequelize.query(
            `SELECT user.login,user_tasks.id as primary_id, user_tasks.* from user_tasks JOIN user ON user.id=user_tasks.user_id WHERE user_tasks.task_id = ${req.params.task_id}`,
            {
                type: db.sequelize.QueryTypes.SELECT
            })
        globalFunctions.sendResult(res, data);
    }catch(e){
        globalFunctions.sendError(res,e);
    }
}
exports.deleteTask = (req,res) =>{
        UserTasks.destroy({
            where:{
                id:req.params.id
            }
        })
            .then(()=>{
                globalFunctions.sendResult(res,'Запись удалена');
            })
            .catch(err=>{
                globalFunctions.sendError(res,err);
            })
}

exports.switchComplete = async (req,res) =>{
    try {
        const data = await db.sequelize.query(`UPDATE user_tasks SET isComplete=!isComplete WHERE id = ${req.params.id}`,
            {
                type: db.sequelize.QueryTypes.UPDATE
            })
        globalFunctions.sendResult(res, data);
    }catch (e){
        globalFunctions.sendError(res,e);
    }
}

exports.update = (req, res) => {
    UserTasks.update({
        task_id: req.body.task_id,
        user_id: req.body.user_id,
        mark: req.body.mark,
        comment: req.body.comment,
        file: req.body.file,
        isComplete: req.body.isComplete
    }, {
        where: {
            id: req.params.id
        }
    })
        .then(object=>{
            globalFunctions.sendResult(res,object);
        })
        .catch(err=>{
            globalFunctions.sendError(res,err);
        })
}

exports.findById = async (req,res) =>{
    try {
        const data = await UserTasks.findByPk(req.params.id);
        globalFunctions.sendResult(res, data);
    }catch (e){
        console.log(e);
        globalFunctions.sendResult(res,e);
    }
}

exports.create = (req,res) =>{
    UserTasks.create({
        task_id:req.body.task_id,
        user_id:req.body.user_id,
        mark:null,
        comment: "",
        file: null,
        isComplete: 0
    })
        .then(object=>{
            globalFunctions.sendResult(res,object);
        })
        .catch(err=>{
            globalFunctions.sendError(res,err);
        })
}

exports.findUsersInTask = async (req,res) =>{
    try {
        const data = await db.sequelize.query(
            `SELECT user_tasks.user_id FROM user_tasks WHERE user_tasks.task_id=${req.params.task_id}`,
            {
                type: db.sequelize.QueryTypes.SELECT
            })
        globalFunctions.sendResult(res, data);
    }catch(e){
        globalFunctions.sendError(res,e);
    }
}

exports.uploadFile = async (req,res)=>{
    var form = new multiparty.Form();
    await form.parse(req,async (err,fields,files) => {
      if(!err){
          var mimeType = files.file[0].headers['content-type'];
          expansion = mimeType.split('/')[1];
          var newName = uuid.v4() + "." + expansion;
          var link = './files/' + newName;

          fs.copyFile(files.file[0].path, link, (err) => {
              if (err) {
                  throw err;
              }
              fs.unlink(files.file[0].path, (err) => {
                  if (err) {
                      console.error('Ошибка удаления файла:', err);
                  }
              });
          });
          UserTasks.update({
              file: newName,
              mime_type: mimeType
          }, {
              where: {
                  id: req.params.id
              }
          })
              .then(object=>{
                  globalFunctions.sendResult(res,object);
                  console.log(`file uploaded:${res}`);
              })
              .catch(err=>{
                  globalFunctions.sendError(res,err);
                  console.log(error);
              })
      }else{
          console.log(err);
      }
    })
}

async function importSql(fileName,task_id){
    try {
        const requestTC = await axios.create({
            baseURL: "http://localhost:2000/api",
            headers: {
                "Content-Type": "application/json"
            }
        }).get(`/testcasesByTask/${task_id}`);
        const testcases = requestTC.data;
        console.log(testcases)
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: ''
        });

        var schemes = await connection.query(`SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'test_online_compiler'`);
        connection.query('SET FOREIGN_KEY_CHECKS = 0');
        if (schemes[0].length > 0) {
            await connection.query('USE test_online_compiler');
            const tables = await connection.query('SHOW TABLES');
            for (let table of tables[0]) {
                // console.error(table)
                await connection.query(`DROP TABLE ${table.Tables_in_test_online_compiler}`);
            }
        } else {
            await connection.execute('CREATE DATABASE test_online_compiler');
        }
        connection.query('SET FOREIGN_KEY_CHECKS = 1');
        var dumpContent = fs.readFileSync(`./output/${fileName}`, 'utf8');
        dumpContent = dumpContent.split('\n').filter(line => !line.includes('SET SQL_MODE') && !line.includes('SET time_zone') && !line.includes('/*!')).join('\n');
        const queries = dumpContent.split(';').filter(query => query.trim() !== '');
        for (const query of queries) {
            await connection.query(query);
        }
        for(let i = 0;i<testcases.length;i++){
            let request = testcases[i].input;
            const rows = await connection.query(request);
            console.log(rows[0]);
        }
        connection.end();
        return 'Succesful';
    } catch (err) {
        return err;
    }
}

exports.findSql = (req,res) =>{
    let result;
    try {
        fs.createReadStream(`./files/${req.body.fileName}`)
            .pipe(unzipper.Parse())
            .on('entry', async function (entry) {
                const filePath = entry.path;
                const fileName = path.basename(filePath)
                const type = entry.type;
                const size = entry.vars.uncompressedSize;
                if (path.extname(fileName) === ".sql") {
                    await entry.pipe(fs.createWriteStream(`./output/${fileName}`));
                    result = await importSql(fileName, req.body.task_id);
                } else {
                    entry.autodrain();
                }
            });
        globalFunctions.sendResult(res,'result');
    }catch (e){
        globalFunctions.sendError(res,e);
    }
}