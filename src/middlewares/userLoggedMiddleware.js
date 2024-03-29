function userLoggedMiddleware (req, res, next) {
	res.locals.isLogged = false;
	if (req.session.usuarioLogueado) {
	res.locals.isLogged = true;
	res.locals.userLogged = req.session.usuarioLogueado
	res.locals.fotoPerfil = req.session.fotoPerfil
	res.locals.nombre = req.session.nombre
	}
	next();
}
module.exports = userLoggedMiddleware