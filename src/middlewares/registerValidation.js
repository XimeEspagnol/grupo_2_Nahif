const {body} =require ('express-validator')

module.exports = [
    body('nombreCompleto')
        .notEmpty().withMessage('Completá tu nombre y apellido'),
    body('usuario')
        .notEmpty().withMessage('Indicar un email')
        .isEmail().withMessage('Ingrese un email válido'),
    body('contrasenia')
        .notEmpty().withMessage('Indica una contraseña')
        .isStrongPassword({minLength:5,minUppercase:1,minNumbers:1, minSymbols:0}).withMessage('Debe tener un mínimo de 5 caracteres, una mayúscula y un número'),
    body('noSoyUnRobot')
        .notEmpty().withMessage('Comprobá que no sos un robot')
]