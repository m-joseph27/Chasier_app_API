const menuModel = require('../models/menu');
const MiscHelper = require('../helpers/helpers');
const connection = require('../config/db');
// const redis = require('redis');
// const client = redis.createClient(process.env.PORT_REDIS);



module.exports = {
  getMenu: (req, res)=>{
    const ascending = req.query.sortasc;
    const descending = req.query.sortdesc;
    const search = req.query.search;
    const page = req.query.page;
    
    if (!page) {
      menuModel.getMenu(search, ascending, descending)
        .then((result)=>{
          console.log(result)
          // client.setex('getallbooks',3600 ,JSON.stringify(result))
          MiscHelper.response(res, result, 200, 'success');
        })
        .catch(err=> {
          MiscHelper.response(res, err, 202, 'Failed')
        });
    } else {
      connection.query("SELECT COUNT(*) as total FROM `menu` ", (err, result)=> {
        const total = result[0].total;
        if(page > 0 ) {
            menuModel.getPage(page, total)
            .then((result)=> {
                MiscHelper.response(res,result, 200)
            })
            .catch((err)=> {
                MiscHelper.response(res, {}, 202,err)
            })
        }
      })
    }
  },

  menuDetail: (req, res) => {
    const idMenu = req.params.id_menu
    menuModel.bookDetail(idMenu)
      .then((result) => {
        if(result[0].length === 0) {
          MiscHelper.response(res, err, 202,'Menu Not Found!')
        }
        MiscHelper.response(res, result, 200, 'Succes');
      })
      .catch((err) => {
        MiscHelper.response(res, err, 202,'Menu Not Found!')
      });
  },

  insertMenu: (req, res)=>{
    const {menu_name, price, id_category, menu_img} = req.body;
    const data = {
      menu_name,
      price,
      id_category,
      menu_img:`http://localhost:2727/uploads/${_req._file.filename}`,
      created_at: new Date()
    }
    menuModel.insertBook(data)
      .then((result) => {
        res.send(result);
      })
      .catch(err => console.log(err));
  },

  updateMenu: (req, res) => {
    const idMenu = req.params.id
    const { menu_name, price, id_category, menu_img} = req.body;
    const data = {
      menu_name,
      price,
      id_category,
      menu_img,
      update_at: new Date(),
    }
    menuModel.updateMenu(idMenu, data)
      .then((result) => {
        res.send(result);
      })
      .catch(err => console.log(err));
  },

  deleteMenu: (req, res) => {
    const idMenu = req.params.id_menu
    menuModel.deleteMenu(idMenu)
      .then((result) => {
        res.send(result);
      })
      .catch(err => console.log(err));
  },
}