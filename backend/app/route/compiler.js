module.exports = (app) => {
    const compiler = require('../controller/compiler.js');

    app.post('/api/compileCode', compiler.code);
};