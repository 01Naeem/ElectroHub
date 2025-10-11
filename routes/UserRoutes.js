const UserController = require('../controllers/UserController');
const express = require('express');
const Router = express.Router();

Router.post('/registration', UserController.SignUp);
Router.post('/signin', UserController.SignIn);
Router.get('/getuser', UserController.GetUser);

module.exports = Router;