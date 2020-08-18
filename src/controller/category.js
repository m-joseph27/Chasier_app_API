const categoryController = require('../models/category');
const helper = require('../helpers/helpers');
const connection = require('../configs/db');


module.exports = {
  getCategory: (req, res)=>{
    if (!page) {
      categoryController.getCategory().then((result)=>{
          helper.response(res, result, 200, 'Bener');
        })
        .catch(err=> {
          helper.response(res, err, 202, 'Salah')
        });
    } else {
      connection.query("SELECT COUNT(*) as total FROM `book` ", (err, result)=> {
        const total = result[0].total;
        if(page > 0 ) {
            bookModel.getPage(page, total)
            .then((result)=> {
                helper.response(res,result, 200)
            })
            .catch((err)=> {
                helper.response(res, {}, 202,err)
            })
        }
      })
    }
  },

  bookDetail: (req, res) => {
    const idBook = req.params.id_book
    bookModel.bookDetail(idBook)
      .then((result) => {
        helper.response(res, result[0], 200);
      })
      .catch(err => console.log(err));
  },

  insertBook: (req, res)=>{
    const {title, description, image, status, author, id_category} = req.body;
    const data = {
      title,
      description,
      image: `http://localhost:1111/uploads/${req.file.filename}`,
      status,
      author,
      id_category,
      created_at: new Date(),
    }
    bookModel.insertBook(data)
      .then((result) => {
        res.send(result);
      })
      .catch(err => console.log(err));
  },

  updateBook: (req, res) => {
    const idBook = req.params.id
    const { title, description, status, author, id_category } = req.body;
    const data = {
      title,
      description,
      image,
      status,
      author,
      id_category,
      update_at: new Date(),
    }
    bookModel.updateBook(idBook, data)
      .then((result) => {
        res.send(result);
      })
      .catch(err => console.log(err));
  },

  deleteBook: (req, res) => {
    const idBook = req.params.id_book
    bookModel.deleteBook(idBook)
      .then((result) => {
        res.send(result);
      })
      .catch(err => console.log(err));
  },
}