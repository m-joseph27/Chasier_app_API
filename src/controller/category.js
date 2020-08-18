const categoryModel = require('../models/product');
const helper = require('../helper/helpers');
const { connect } = require('../config/db');
const connection = require('../config/db');

module.exports = {
  getProduct: (req, res) => {
    const page = req.query.page;
    const result = {}
    if(!page) {
    categoryModel.getProduct().then((results) => {
      if(results.length === 0 ) {
        result.status = 404;
        result.message = 'product not found';
        helper.response(res, result);
      } else {
        result.status = 200;
        result.message = 'OK';
        result.data = results;
        helper.response(res, result);
          }
      })
    } else {
      connection.query("SELECT COUNT (*) as total FROM `product`", (err, result) => {
        const total = result[0].total;
        if(page >0) {
          const dataPage = 6;
          const totalPage = total / dataPage;
          const allPage = Math.ceil(totalPage);
          categoryModel.getPage(page)
          .then((result) => {
            if(page <= allPage){
              result.status = 200;
              result.message = 'OK';
              result.data = result;
              helper.response(res, result);
            } else {
              result.status = 404;
              result.message = 'page not found';
              helper.response(res, result);
            }
          })
          .catch(err => {
            result.status = 500;
            result.message = 'Internal server error';
            result.err = err;
            helper.response(res, result);
          })
        }
      })
    }
  },

  insertProduct: (req, res) => {
    const data = req.body;
    const result = {};
    data.photo = `http://54.208.198.155:2727//api/upload/${req.file.filename}`
    categoryModel.insertProduct(data).then((results) => {
      if(data === undefined ) {
        console.log(data)
        result.status = 404;
        result.message = 'failed to input product';
        helper.response(res, result);
      } else {
        result.status = 200;
        result.message = 'OK';
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

  updateProduct: (req, res) => {
    const idProduct = req.params.id_product;
    const data = req.body;
    const result = {};
    data.photo = `http://54.208.198.155:2727//api/upload/${req.file.filename}`
    categoryModel.updateProduct(idProduct, data).then((results) => {
      if(data === 0 ) {
        result.status = 404;
        result.message = 'failed to input update';
        helper.response(res, result);
      } else {
        result.status = 200;
        result.message = 'OK';
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

  detailProduct: (req, res) => {
    const idProduct = req.params.id_product;
    const result = {}
    categoryModel.productDetail(idProduct).then((results) => {
      if(results.length === 0 ) {
        result.status = 404;
        result.message = 'Product not found';
        helper.response(res, result);
      } else {
        result.status = 200;
        result.message = 'OK';
        result.data = results;
        helper.response(res, result);
      }
    })
    .catch(err => {
      result.message = 'internal server error';
      result.err = err;
      helper.response(res, result)
    })
  }

}