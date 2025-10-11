const ProductsController = require('../controllers/ProductsController')
const express = require('express');
const Router = express.Router();

Router.get('/productDetails', ProductsController.ProductsDisplay);
Router.get('/search', ProductsController.SearchProducts);

module.exports = Router;