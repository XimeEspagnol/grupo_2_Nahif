const express = require("express");

const router = express.Router();

const controller = require('../controllers/productController');

router.get('/product/:id', controller.product);

router.get('/categorias', controller.categorias);

router.get('/probador', controller.probador);

router.get('/altaProducto', controller.altaProducto)

router.get('/modificar/:id', controller.modifProducto)

module.exports = router