const express = require('express');
const Router = express.Router();
const categoryController = require('../controller/category');

Router

  .get('/', categoryController.getCategory)
  .get('/:id', categoryController.categoryDetail)
  .post('/insert', categoryController.insertCategory)
  .patch('/id', categoryController.updateCategory)

  module.exports = Router;