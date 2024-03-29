const path = require('path');


const prodCart = [
    {
        id: 1,
        foto: "buzo_blend.jpg",
        nombre: "Buzo Blend",
        talle: 'M',
        color: 'Negro',
        precio: 8290
    },
    {
        id: 2,
        foto: "crop_top.jpg",
        nombre: "Polera lanilla",
        talle: 'S',
        color: 'Negro',
        precio: 5490
    },
]

const controller = {

    home: (req,res) =>{
        return res.render('home')
    },
    carrito: (req,res) =>{
        return res.render('productCart', {cart: prodCart})
    },
    contacto: (req,res) =>{
        return res.render('contacto')
    }
};

module.exports = controller;