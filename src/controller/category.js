const categoryController = require('../models/category');
const helper = require('../helper/helpers');

module.exports = {
  getCategory: (req, res) => {
    const result = {}
    categoryController.getCategory().then((results) => {
      if(results.length === 0) {
        result.status = 404;
        result.message = 'category not found';
        helper.response(res, result);
      } else {
        result.status = 202;
        result.message = 'List Category';
        result.data = results;
        helper.response(res, result);
      }
    })
    .catch(err => {
      result.message = 'internal server error';
      result.err = err;
      helper.response(res, result)
    })
  },

  insertCategory: (req, res) => {
    const data = req.body;
    const result = {};
    data.photo = `http://localhost:2000/api/v1/upload/${req.file.filename}`
    categoryController.insertCategory(data).then((result) => {
      if(data === undefined) {
        result.status = 404;
        result.message = 'failed to insert category';
        helper.response(res, result);
      } else {
        result.status = 200;
        result.message = 'Succes To Insert Category';
        result.data = data;
        helper.response(res, result)
      }
    })
  },

  updateCategory: (req, res) => {
    const idCategory = req.params.id;
    const data = req.body;
    const result = {};
    data.photo = `http://localhost:2000/api/v1/upload/${req.file.filename}`
    categoryController.updateCategory(idCategory, data).then((result) => {
      if(data === 0) {
        result.status = 404;
        result.message = 'failed to update category';
        helper.response(res, result);
      } else {
        result.status = 200;
        result.message = 'Success update category';
        result.data = data;
        helper.response(res, result);
      }
    })
    .catch(err => {
      result.message = 'internal server error';
      result.err = err;
      helper.response(res, result)
    });
  },

  detailCategory: (req, res) => {
    const idCategory = req.params.id;
    const result = {};
    categoryController.detailCategory(idCategory).then((result) => {
      if(result.length === 0) {
        result.status = 404;
        result.message = 'Category not found';
        helper.response(res, result);
      } else {
        result.status = 200;
        result.message = 'List Category';
        result.data = result;
        helper.response(res, result);
      }
    })
    .catch(err => {
      result.message = 'internal server error';
      result.err = err;
      helper.response(res, result)
    })
  },

}