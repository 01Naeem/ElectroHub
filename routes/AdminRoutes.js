const AdminController = require('../controllers/AdminControllers');
const express = require('express');
const Router = express.Router();

Router.post('/adminlogin', AdminController.AdminLogin);
Router.post('/productupload', AdminController.UploadProducts);

module.exports = Router;