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
  .post('/', uploads.single('menu_img'), menuController.insertMenu)
  .patch('/:id_menu', uploads.single('menu_img') ,menuController.updateMenu)
  .delete('/:id_menu', menuController.deleteMenu)

module.exports = Router;