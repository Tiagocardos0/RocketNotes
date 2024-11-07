const { Router } = require('express');

const usersRouter = require('./users.routes');
const MovieNotesRouter = require('./MovieNotes.routes');
const tagsRouter = require('./tags.routes');

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/movienotes', MovieNotesRouter);
routes.use('/tags', tagsRouter);
module.exports = routes;