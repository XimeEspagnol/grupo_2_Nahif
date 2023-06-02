const express = require("express");

const router = express.Router();

const controller = require('../controllers/productController');

router.get('/product', controller.product);

router.get('/categorias', controller.categorias);

router.get('/probador', controller.probador);

module.exports = router