const express = require('express');
const userApiController = require('../../controllers/api/userApiController');
const router = express.Router();

//Rutas
//Listado de usuarios
router.get('/', userApiController.list);
//Detalle de un usuario
router.get('/:id', userApiController.detail);
//Agregar un usuario
//router.post('/create', userApiController.create);
//Modificar una usuario
//router.put('/update/:id', userApiController.update);
//Eliminar una usuario
//router.delete('/delete/:id', userApiController.destroy);

module.exports = router;