module.exports = (app) => {
    const discipline = require('../controller/discipline.js');

    app.get('/api/listDisciplines',discipline.findAll);

    app.post('/api/createDiscipline',discipline.create);

    app.post('/api/deleteDiscipline/id=:id',discipline.delete);

    app.post('/api/updateDiscipline/:id',discipline.update);

    app.get('/api/discipline/:id',discipline.findById);
}