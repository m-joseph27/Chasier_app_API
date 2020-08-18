const express = require('express');
const Router = express.Router();
const menuController = require('../controller/menu');

Router

  .get('/', menuController.getMenu)
  .get('/:id_menu', menuController.menuDetail)
  // .post('/', uploads, menuController.insertMenu)
  .patch('/:id', menuController.updateMenu)
  .delete('/:id_book', menuController.deleteMenu)

module.exports = Router;