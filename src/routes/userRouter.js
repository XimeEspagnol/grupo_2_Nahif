const path = require('path');

const express = require("express");

const router = express.Router();

const multer = require('multer');

const registerValidation = require('../middlewares/registerValidation')

const controller = require('../controllers/userController');

const cookieMiddleware = require ('../middlewares/cookieMiddleware');

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

router.get('/login', cookieMiddleware, logMiddleware, controller.login);
router.post('/login', controller.processLogin);
router.get('/register', cookieMiddleware, logMiddleware, controller.register);
router.post('/register', fileUpload.single('fotoRegistro'), registerValidation, controller.processRegister);

router.get ('/perfil', cookieMiddleware, controller.users);


module.exports = router