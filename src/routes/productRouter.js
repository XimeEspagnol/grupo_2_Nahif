const path = require('path')
const express = require("express");
const router = express.Router();
const multer= require('multer');

const controller = require('../controllers/productController');

const adminMiddleware = require ('../middlewares/adminMiddleware');
const productValidation = require ('../middlewares/productValidation');

//const { contextsKey } = require('express-validator/src/base');


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
router.get('/detail/:id' , controller.detail);
//router.get('/detail/:id' , controller.product);
router.get('/', controller.list);
//router.get('/', controller.categorias);
//router.get('/probador/:userid', controller.probador);
router.get('/admin', adminMiddleware, controller.productAdmin)
router.get('/list/:categoria', controller.filtroCategorias)
router.get('/listAdmin/:categoria', adminMiddleware, controller.filtroAdminCategorias)

//FORM CREATE
router.get('/altaProducto/create', adminMiddleware, controller.add)
router.post('/altaProducto/create', fileUpload.any('fotoProdPpal'),productValidation, controller.create)


//FORM EDIT
router.get('/modificarProd/:id', adminMiddleware, controller.edit)
router.patch('/modificarProd/:id',  fileUpload.any('fotoProdPpal'),productValidation, controller.update)
router.patch('/eliminarFoto/:id', controller.eliminarFoto)

//FORM DELETE
router.delete('/admin', controller.delete)
router.post('/admin', controller.destroy)

module.exports = router