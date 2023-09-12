const express = require('express');
const productApiController = require('../../controllers/api/productApiController');
const router = express.Router();

//Rutas
//Listado de productos
router.get('/', productApiController.list);
//Detalle de un producto
router.get('/:id', productApiController.detail);
//Agregar un producto
//router.post('/create', productApiController.create);
//Modificar una producto
//router.put('/update/:id', productApiController.update);
//Eliminar una producto
//router.delete('/delete/:id', productApiController.destroy);

module.exports = router;