const fs = require('fs');
const path = require('path')
let db = require ('../database/models');
const sequelize = db.sequelize;

const adminMiddleware = (req, res, next) => {
        if (req.session.usuarioLogueado ) {  
      const usuario = db.Users.findOne({
        where:{
          email: req.session.usuarioLogueado
        }
      });
      if (usuario.rol_id==1) {
         next ();
      } else {
      return res.redirect('/');  
      } } else {
      return res.redirect('/user/login');
    }
}
  
  module.exports = adminMiddleware;