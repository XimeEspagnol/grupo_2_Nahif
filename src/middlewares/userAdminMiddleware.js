const fs = require('fs');
const path = require('path')
let db = require ('../database/models');
const sequelize = db.sequelize;

const userAdminMiddleware = (req, res, next) => {
    res.locals.isAdmin = false
    if (req.session.usuarioLogueado ) {  
      const usuario = db.Users.findOne({
        where:{
          email: req.session.usuarioLogueado
        }
      });
      
      if (usuario){
        if (usuario.perfilDeUsuario=="admin") {
          res.locals.isAdmin = true
          next ();
        }
      }
    }
    next()
}
  
  module.exports = userAdminMiddleware;