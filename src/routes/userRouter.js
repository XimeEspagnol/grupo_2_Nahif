const path = require('path');

const express = require("express");

const router = express.Router();

const multer = require('multer');

const registerValidation = require('../middlewares/registerValidation')

const controller = require('../controllers/userController');

const storage= multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.join(__dirname, '../../public/img'))
    },
    filename: (req, file, cb)=>{
        const uniqueSuffix = Date.now()

        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
})

const fileUpload = multer({
    storage: storage
})

router.get('/login', controller.login);
router.post('/login', controller.processLogin);
router.get('/register', controller.register);
router.post('/register', fileUpload.single('fotoRegistro'), registerValidation, controller.processRegister);

router.get ('/perfil', controller.users);


module.exports = router