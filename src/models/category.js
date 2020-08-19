require('dotenv').config()
const connection = require('../config/db');

module.exports = {
  getCategory: () => {
    return new Promise((resolve, reject) =>{
      let sort = true;
        if(sort) {
          connection.query("SELECT * FROM category", (err, result) => {
            if(!err) {
              resolve(result)
            } else {
              reject(new Error(err))
            }
          })
        }
    })
  },

  categoryDetail: (id) => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM category WHERE id= ?", [id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  insertCategory: (name) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO category SET ?", name, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateCategory: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query("UPDATE category SET ? WHERE id= ?", [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  deleteBook: (id) => {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM category WHERE id = ?", [id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  
}