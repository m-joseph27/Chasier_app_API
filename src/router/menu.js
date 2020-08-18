const express = require('express');
const Router = express.Router();
const menuController = require('../controller/menu');
const cors = require('cors');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads')
  },
  filename: function(req,file,cb){
    cb(null,file.originalname)
  },
})
const uploads = multer({
  storage
})

Router

  .get('/', menuController.getMenu)
  .get('/:id_menu', menuController.menuDetail)
  .post('/', uploads.single('images'), menuController.insertMenu)
  // .post('/', uploads, menuController.insertMenu)
  .patch('/:id', menuController.updateMenu)
  .delete('/:id_book', menuController.deleteMenu)

module.exports = Router;