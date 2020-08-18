require('dotenv').config()
const connection = require('../config/db');

module.exports = {
  getCategory: (search, descending, ascending) =>{
    return new Promise((resolve, reject)=>{
      if(search){
        connection.query("SELECT * FROM category WHERE id LIKE ? OR name LIKE ? ",[`{search}%`, `%${search}%`, `%${search}%`], (err, result) => {
          if(!err){
            resolve(result)
          }else{
            reject(new Error(err))
          }
        })
      } else if(descending){
        connection.query("SELECT category.* FROM category ORDER BY " + descending + " DESC ", (err, result)=>{
          if(!err){
            resolve(result)
          }else{
            reject(new Error(err))
          }
        })
      }else if(ascending){
        connection.query("SELECT category. * FROM category ORDER BY " + ascending + " ASC", (err, result)=>{
          if(!err){
            resolve(result)
          }else{
            reject(new Error(err))
          }
        })
      }else{
        connection.query("SELECT * FROM category", (err, result) => {
          if (!err) {
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

  insertCategory: (idCategory) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO category SET ?", idCategory, (err, result) => {
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

  deleteCategory: (id) => {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM category WHERE id = ?", id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
}