const path = require('path')
const express = require("express");
const router = express.Router();
const multer= require('multer');

const controller = require('../controllers/productController');

const cookieMiddleware = require ('../middlewares/cookieMiddleware');
const adminMiddleware = require ('../middlewares/adminMiddleware');

const { contextsKey } = require('express-validator/src/base');

const storage= multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.join(__dirname, '../../public/img'))
    },
    filename: (req, file, cb)=>{
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9)
        
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
})

const fileUpload = multer({
    storage: storage
})


//
router.get('/detail/:id', cookieMiddleware, controller.product);
router.get('/', cookieMiddleware, controller.categorias);
router.get('/probador/:userid', cookieMiddleware, controller.probador);
router.get('/admin', cookieMiddleware, adminMiddleware, controller.productAdmin)
router.get('/list/:categoria', cookieMiddleware, controller.filtroCategorias)
router.get('/listAdmin/:categoria', cookieMiddleware, adminMiddleware, controller.filtroAdminCategorias)

//FORM CREATE
router.get('/altaProducto/create', cookieMiddleware, adminMiddleware, controller.altaProducto)
router.post('/altaProducto/create', fileUpload.any('fotoProdPpal'), controller.processAltaProducto)


//FORM EDIT
router.get('/modificarProd/:id', cookieMiddleware, adminMiddleware, controller.modifProducto)
router.patch('/modificarProd/:id', fileUpload.any('fotoProdPpal'), controller.processModifProd)
router.patch('/eliminarFoto/:id', controller.eliminarFoto)

//FORM DELETE
router.delete('/admin', controller.eliminarProd)

module.exports = router