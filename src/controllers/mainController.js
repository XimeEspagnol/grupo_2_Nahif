const path = require('path');



const controller = {

    home: (req,res) =>{
        res.sendFile(path.resolve('./views/home.html'))
    },
    carrito: (req,res) =>{
        res.render('productCart')
    }
};

module.exports = controller;