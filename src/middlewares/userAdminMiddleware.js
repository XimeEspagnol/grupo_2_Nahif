const fs = require('fs');
const path = require('path')

const datos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));

const userAdminMiddleware = (req, res, next) => {
    res.locals.isAdmin = false
    if (req.session.usuarioLogueado ) {  
      const usuario = datos.find((row) => row.email == req.session.usuarioLogueado);
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