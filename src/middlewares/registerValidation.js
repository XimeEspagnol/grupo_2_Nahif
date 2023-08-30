const {body} = require ('express-validator')

module.exports = [
    body('nombre')
        .notEmpty().withMessage('Completá tu nombre con al menos 2 caracteres')
        .isLength({min:2}).withMessage('Completá tu nombre con al menos 2 caracteres'),
    body('apellido')
        .notEmpty().withMessage('Completá tu apellido con al menos 2 caracteres')
        .isLength({min:2}).withMessage('Completá tu apellido con al menos 2 caracteres'),
    body('usuario')
        .notEmpty().withMessage('Indicar un email válido')
        .isEmail().withMessage('Ingrese un email válido'),
    body('contrasenia')
        .notEmpty().withMessage('Ingresá una contraseña con mínimo 8 caracteres, una mayúscula y un número')
        .isStrongPassword({minLength:8,minUppercase:1,minNumbers:1, minSymbols:0}).withMessage('Debe tener un mínimo de 8 caracteres, una mayúscula y un número'),
    body('noSoyUnRobot')
        .notEmpty().withMessage('Comprobá que no sos un robot')
]