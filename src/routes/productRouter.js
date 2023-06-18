const path = require('path')
const express = require("express");
const router = express.Router();
const multer= require('multer');

const controller = require('../controllers/productController');

const storage= multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.join(__dirname, '../../public/img'))
    },
    filename: (req, file, cb)=>{
        let imageName = Date.now() + path.extname(file.originalname)
        cb(null, imageName)
    }
})

const fileUpload = multer({
    storage: storage
})


//
router.get('/product/:id', controller.product);
router.get('/products', controller.categorias);
router.get('/probador', controller.probador);

//FORM CREATE
router.get('/altaProducto/create', controller.altaProducto)
router.post('/altaProducto/create', fileUpload.single('fotoProdPpal'), controller.processAltaProducto)


//FORM EDIT
router.get('/modificarProd/:id', controller.modifProducto)
router.patch('/modificarProd/:id', controller.processModifProd)

//FORM DELETE


module.exports = router