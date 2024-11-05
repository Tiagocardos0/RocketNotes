const { Router } = require('express');

const usersRouter = require('./users.routes');
const MovieNotesRouter = require('./MovieNotes.routes');


const routes = Router();

routes.use('/users', usersRouter);
routes.use('/movienotes', MovieNotesRouter);
module.exports = routes;