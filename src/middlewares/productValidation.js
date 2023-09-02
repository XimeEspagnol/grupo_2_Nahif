const {body} = require ('express-validator')

const productValidation = [
    body('nombreProdAlta')
        .notEmpty().withMessage('Indica un nombre para el producto')
        .isLength({min:5}).withMessage('Deberá tener al menos 5 caracteres'),
    body('descProdAlta')
        .notEmpty().withMessage('Indica una descripción de producto')
        .isLength({min:20}).withMessage('Deberá tener al menos 20 caracteres'),
    body('coloresProdAlta')
    .notEmpty().withMessage('Deberas seleccionar por lo menos 1 color'),
    body('stock').if((value, { req }) => !value).isInt({ min: 0 }).withMessage('El stock debe ser 0 o más').trim().escape(),
    body('precioProdAlta').if((value, { req }) => !value).isInt({ min: 0 }).withMessage('El precio debe ser mayor que 0').trim().escape(),
    body('descuentoProdAlta').if((value, { req }) => !value).isInt({ min: 0 }).withMessage('El descuento debe ser 0 o más').trim().escape(),
    body('fotoProdPpal').custom((value,{req})=>{
            if(req.fileValidationError){
              throw new Error(req.fileValidationError)
            }
            return true
          }),
    body('fotoProdAlta').custom((value,{req})=>{
            if(req.fileValidationError){
              throw new Error(req.fileValidationError)
            }
            return true
          })
        

]
module.exports = productValidation;