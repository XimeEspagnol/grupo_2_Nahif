const {body} = require ('express-validator')

const productValidation = [
    body('nombreProdAlta')
        .notEmpty().withMessage('Indica un nombre para el producto')
        .isLength({min:5}).withMessage('Deberá tener al menos 5 caracteres'),
    body('descProdAlta')
        .notEmpty().withMessage('Indica una descripción de producto')
        .isLength({min:20}).withMessage('Deberá tener al menos 20 caracteres'),
]
module.exports = productValidation;