const fs = require('fs');
const path = require('path')

const datos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));

const cookieMiddleware = (req, res, next) => {
    if (!req.session && req.cookies.recordame){
        const usuario = datos.find((row) => row.email == req.cookies.recordame);
        delete usuario.contrasenia
        req.session.usuarioLogueado = usuario
    }
    next()     
}

module.exports = cookieMiddleware;