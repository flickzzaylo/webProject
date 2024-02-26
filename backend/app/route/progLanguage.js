module.exports = (app) => {
    const prog_language = require('../controller/progLanguage.js');

    app.get('/api/listProgLang',prog_language.findAll)

    app.get('/api/proglang/:id',prog_language.findById)

    app.post('/api/createProgLang',prog_language.create);

    app.post('/api/updateProgLang/:id',prog_language.update);

    app.post('/api/deleteProgLang/:id',prog_language.delete);
}