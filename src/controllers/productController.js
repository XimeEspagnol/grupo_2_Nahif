const path = require('path');

const controller = {

    product: (req,res) =>{
        res.sendFile(path.resolve('./views/productDetail.html'))
    },
    categorias: (req,res) =>{
        res.sendFile(path.resolve('./views/categorias.html'))
    },
    probador: (req,res) =>{
        res.sendFile(path.resolve('./views/probador.html'))
    },
    altaProducto: (req,res) =>{
        res.sendFile(path.resolve('./views/altaProducto.html'))
    }

};

module.exports = controller;