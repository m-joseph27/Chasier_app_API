const categoryController = require('../models/category');
const helper = require('../helpers/helpers');


module.exports = {
  getCategory: (req, res)=>{
    categoryController.getCategory()
    .then((result)=>{
      helper.response(res, result, 200);
    })
    .catch(err=>console.log(err));
  },

  categoryDetail: (req, res) => {
    const idCategory = req.params.id
    categoryController.categoryDetail(idCategory)
      .then((result) => {
        helper.response(res, result[0], 200);
      })
      .catch(err => console.log(err));
  },

  insertCategory: (req, res)=>{
    const {name} = req.body;
    const data = {name}
    categoryController.insertCategory(data)
      .then((result) => {
        helper.response(res, result[0], 200)
      })
      .catch(err => console.log(err));
  },

  updateCategory: (req, res) => {
    const idCategory = req.params.id
    const { id, name } = req.body;
    const data = {id, name}
    categoryController.updateCategory(idCategory, data)
      .then((result) => {
        helper.response(res, result[0], 200)
      })
      .catch(err => console.log(err));
  },

  deleteCategory: (req, res) => {
    const idCategory = req.params.id
    categoryController.deleteBook(idCategory)
      .then((result) => {
        helper.response(res, result[0], 200)
      })
      .catch(err => console.log(err));
  },
}