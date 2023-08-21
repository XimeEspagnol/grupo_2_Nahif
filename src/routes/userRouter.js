const path = require('path');

const express = require("express");

const router = express.Router();

const multer = require('multer');

const registerValidation = require('../middlewares/registerValidation')

const controller = require('../controllers/userController');


const logMiddleware = require ('../middlewares/logMiddleware');

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

router.get('/login', logMiddleware, controller.login);
router.post('/login', controller.processLogin);
router.get('/register', logMiddleware, controller.register);
router.post('/register', fileUpload.single('fotoRegistro'), registerValidation, controller.processRegister);

router.get ('/perfil', controller.users);
router.get ('/logout', controller.logout);
//router.get ('/user', controller.userController);


module.exports = router