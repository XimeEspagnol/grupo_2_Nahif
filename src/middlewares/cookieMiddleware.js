const fs = require('fs');
const path = require('path')
let db = require ('../database/models');
const sequelize = db.sequelize;

const cookieMiddleware = (req, res, next) => {
    if (!req.session && req.cookies.recordame){
        const usuario = db.Users.findOne({
            where:{
              email: req.cookies.recordame
            }
          });
        delete usuario.contrasenia
        req.session.usuarioLogueado = usuario
    }
    next()     
}

module.exports = cookieMiddleware;