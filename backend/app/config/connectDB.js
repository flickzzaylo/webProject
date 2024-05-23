const mysql = require('mysql2/promise');
const fs = require('fs');

async function main() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: ''
        });
        await connection.query('SET FOREIGN_KEY_CHECKS = 0');
        // данные о схеме приходят в первом массиве
        var schemes = await connection.query(`SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'online_compiler'`);
        // данные о схеме приходят в первом массиве
        if (schemes[0].length > 0) {
            await connection.execute('DROP DATABASE online_compiler');
        }
        await connection.execute('CREATE DATABASE online_compiler');
        await connection.query('USE online_compiler');
        var dumpContent = fs.readFileSync('online_compiler.sql', 'utf8');

        // удаление лишних строк, которые мешают импорту
        dumpContent = dumpContent.split('\n').filter(line => !line.includes('SET SQL_MODE') && !line.includes('SET time_zone') && !line.includes('/*!')).join('\n');

        // приходится разделять запросы, так как всё за один раз не получилось выполнить
        const queries = dumpContent.split(';').filter(query => query.trim() !== '');
        for (const query of queries) {
            await connection.query(query);
        }

        connection.end();
    } catch (err) {
        console.error(err);
    }
}

main();