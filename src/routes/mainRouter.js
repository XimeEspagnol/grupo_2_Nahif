const express = require("express");

const router = express.Router();

const controller = require('../controllers/mainController');

const cookieMiddleware = require ('../middlewares/cookieMiddleware')

router.get('/', cookieMiddleware, controller.home);

router.get('/carrito', cookieMiddleware, controller.carrito);


module.exports = router