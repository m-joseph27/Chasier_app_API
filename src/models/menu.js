require('dotenv').config()
const connection = require('../config/db');

module.exports = {
  getMenu: (search, descending, ascending) =>{
    return new Promise((resolve, reject)=>{
      if(search){
        connection.query("SELECT menu.*, category.name FROM menu JOIN category ON menu.id_category = category.id WHERE menu_name LIKE ? OR price LIKE ? OR id_category LIKE ? ",[`{search}%`, `%${search}%`, `%${search}%`], (err, result) => {
          if(!err){
            resolve(result)
          }else{
            reject(new Error(err))
          }
        })
      } else if(descending){
        connection.query("SELECT menu.* FROM menu ORDER BY " + descending + " DESC ", (err, result)=>{
          if(!err){
            resolve(result)
          }else{
            reject(new Error(err))
          }
        })
      }else if(ascending){
        connection.query("SELECT menu.* FROM menu ORDER BY " + ascending + " ASC", (err, result)=>{
          if(!err){
            resolve(result)
          }else{
            reject(new Error(err))
          }
        })
      }else{
        connection.query("SELECT menu.*, category.name FROM menu JOIN category ON menu.id_category = category.id", (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        })
      }
    })
  },
  getPage: (page, total)=> {
    const dataPage = 8;
    const totalPage = total / dataPage;
    const firstData = dataPage * page - dataPage;
    return new Promise((resolve,reject)=> {
      connection.query("SELECT * FROM `menu` INNER JOIN category ON menu.id_category = category.id ORDER BY menu.id_menu ASC LIMIT ?, ?",[firstData, dataPage], (err,result)=> {
        if(!err){
          const allPage = Math.ceil(totalPage);
            if(page <= allPage){
              resolve([allPage, `Current Page: ${page}`,result])}
            } else {
              reject(new Error(err))
            }
        })
    })
  },
  menuDetail: (id_menu) => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT menu.*, category.name FROM menu INNER JOIN category ON menu.id_category = category.id WHERE menu.id_menu = ?", [id_menu], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  insertMenu: (data) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO menu SET ?", data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  
  updateMenu: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query("UPDATE menu SET ? WHERE id_menu= ?", [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  
  deleteMenu: (id) => {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM menu WHERE id_menu = ?", id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
}