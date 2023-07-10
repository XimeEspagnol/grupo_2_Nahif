const logMiddleware = (req, res, next) => {
    if (req.session.usuarioLogueado ) {
      return res.redirect('/user/perfil')
    } else {
      next();
    }
  }
  
  module.exports = logMiddleware;