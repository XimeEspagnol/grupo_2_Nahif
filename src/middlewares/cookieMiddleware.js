let db = require ('../database/models');
const sequelize = db.sequelize;

const cookieMiddleware = async (req, res, next) => {
    if (!req.session && req.cookies.recordame){
        const usuario = await db.Users.findOne({
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