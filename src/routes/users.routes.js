const { Router } = require('express');

const Userscontroller = require('../controller/UsersController');

const usersRoutes = Router();

const usersController = new Userscontroller();

usersRoutes.post('/', usersController.create)
usersRoutes.put('/:id', usersController.update)

module.exports = usersRoutes;