const express = require("express");

const router = express.Router();

const controller = require('../controllers/mainController');


router.get('/', controller.home);

router.get('/carrito', controller.carrito);


module.exports = router