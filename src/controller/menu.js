const menuController = require('../models/menu');
const helpers = require('../helpers/helpers');

module.exports = {
  getMenu: (req, res)=>{
    const ascending = req.query.sortasc;
    const descending = req.query.sortdesc;
    const search = req.query.search;
    const page = req.query.page;
    
    if (!page) {
      menuController.getMenu(search, ascending, descending)
        .then((result)=>{
          helpers.response(res, result, 200, 'success');
        })
        .catch(err=> {
          helpers.response(res, err, 202, 'Failed')
        });
    } else {
      connection.query("SELECT COUNT(*) as total FROM `menu` ", (err, result)=> {
        const total = result[0].total;
        if(page > 0 ) {
            menuController.getPage(page, total)
            .then((result)=> {
                helpers.response(res,result, 200)
            })
            .catch((err)=> {
                helpers.response(res, {}, 202,err)
            })
        }
      })
    }
  },

  menuDetail: (req, res) => {
    const idMenu = req.params.id_menu
    menuController.menuDetail(idMenu)
      .then((result) => {
        if(result[0].length === 0) {
          helpers.response(res, err, 202,'Menu Not Found!')
        }
        helpers.response(res, result, 200, 'Succes');
      })
      .catch((err) => {
        helpers.response(res, err, 202,'Menu Not Found!')
      });
  },

  insertMenu: (req, res)=>{
    const {menu_name, price, id_category, menu_img} = req.body;
    const data = {
      menu_name,
      price,
      id_category,
      menu_img: `http://localhost:2727/uploads/${req.file.filename}`,
      created_at: new Date()
    }
    menuController.insertMenu(data)
      .then((result) => {
        res.send(result);
      })
      .catch(err => console.log(err));
  },

  updateMenu: (req, res) => {
    const idMenu = req.params.id_menu;
    const { menu_name, price, id_category, menu_img} = req.body;
    const data = {
      menu_name,
      price,
      id_category,
      menu_img: `http://localhost:2727/uploads/${req.file.filename}`,
      update_at: new Date(),
    }
    menuController.updateMenu(idMenu, data)
      .then((result) => {
        res.send(result);
      })
      .catch(err => console.log(err));
  },

  deleteMenu: (req, res) => {
    const idMenu = req.params.id_menu
    menuController.deleteMenu(idMenu)
      .then((result) => {
        res.send(result);
      })
      .catch(err => console.log(err));
  },
}