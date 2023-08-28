const fs = require('fs');
const path = require('path')
let db = require ('../database/models');
const sequelize = db.sequelize;

const userAdminMiddleware = async (req, res, next) => {
    res.locals.isAdmin = false
    if (req.session.usuarioLogueado ) {  
      const usuario = await db.Users.findOne({
        where:{
          email: req.session.usuarioLogueado
        }
      });
      if (usuario){
        if (usuario.rol_id==1) {
          res.locals.isAdmin = true
         //next ();
        }
      }
    }
    next()
}
  
  module.exports = userAdminMiddleware;