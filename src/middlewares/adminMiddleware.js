const fs = require('fs');
const path = require('path')

const datos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));

const adminMiddleware = (req, res, next) => {
        if (req.session.usuarioLogueado ) {  
      const usuario = datos.find((row) => row.email == req.session.usuarioLogueado);
      if (usuario.perfilDeUsuario=="admin") {
         next ();
      } else {
      return res.redirect('/');  
      } } else {
      return res.redirect('/user/login');
    }
}
  
  module.exports = adminMiddleware;