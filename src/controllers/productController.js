const path = require('path');
const fs = require('fs')

/*const detalleProd = [
    {
        id: 1,
        fotos: ["polera-combinada.png", "polera-c2.png","polera-c3.png","polera-c4.png"],
        nombre: "Polera Combinada",
        detalle: "Polera combinada manga campana Odesa",
        precio: 8290,
        descuento: 2000,
        categoria:"Poleras",
        colores: ['Negro', 'Azul', 'Rosa'],
        talles: ['S', 'M'],
        tU: 0,
        tS: 3,
        tM: 2,
        tL: 0,
    },
    {
        id: 2,
        fotos: ["polera-Lanilla.png","polera-c2.png","polera-c3.png","polera-c4.png"],
        nombre: "Polera lanilla",
        detalle: "Polera lanilla brush con recorte tipo corset Bellrose",
        precio: 5490,
        descuento: 2000,
        categoria:"Poleras",
        colores: ['Crema', 'Blanca', 'Rosa'],
        talles: ['S', 'M', 'L'],
        tU: 0,
        tS: 2,
        tM: 1,
        tL: 4,
    },
    {
        id: 3,
        fotos: ["polera-Trenzas.png", "polera-c2.png","polera-c3.png","polera-c4.png"],
        nombre: "Polera con diseño Trenza",
        detalle: "Polera trenzas gruesas y finas Linette",
        precio: 6990,
        descuento: 2000,
        categoria:"Poleras",
        colores: ['Crema', 'Blanco', 'Verde', 'Azul'],
        talles: ['L', 'M'],
        tU: 0,
        tS: 0,
        tM: 5,
        tL: 2,
    },
    {
        id: 4,
        fotos: ['Poleron-Largo2.png',"polera-c2.png","polera-c3.png","polera-c4.png"],
        nombre: "Polera Trenzas Black",
        detalle: "Polera punto morley con trenza lateral",
        precio: 7690,
        descuento: 2000,
        categoria:"Poleras",
        colores: ['Negro', 'Azul', 'Blanco', 'Crema', 'Verde'],
        talles: ['Talle único'],
        tU: 8,
        tS: 0,
        tM: 0,
        tL: 0,
    },
    {
        id: 5,
        fotos: ["polera-c2.png","polera-c2.png","polera-c3.png","polera-c4.png"],
        nombre: "Polera Combinada Marrón",
        detalle: "Polera combinada manga campana Odesa",
        precio: 8290,
        descuento: 2000,
        categoria:"Poleras",
        colores: ['Negro', 'Verde', 'Blanco'],
        talles: ['S', 'L'],
        tU: 0,
        tS: 3,
        tM: 0,
        tL: 2,
    },
    {
        id: 6,
        fotos: ["remera-algodon.png","polera-c2.png","polera-c3.png","polera-c4.png"],
        nombre: "Remera algodón",
        detalle: "Polera lanilla brush con recorte tipo corset Bellrose",
        precio: 5490,
        descuento: 2000,
        categoria:"Remeras",
        colores: ['Negro', 'Blanco'],
        talles: ['S', 'M', 'L'],
        tU: 0,
        tS: 5,
        tM: 3,
        tL: 4,
    },
    {
        id: 7,
        fotos: ["remera-amplia.png","polera-c2.png","polera-c3.png","polera-c4.png"],
        nombre: "Remera oversize",
        detalle: "Polera trenzas gruesas y finas Linette",
        precio: 6990,
        descuento: 2000,
        categoria:"Remeras",
        colores: ['Negro', 'Azul', 'Rosa', 'Verde'],
        talles: ['Talle único'],
        tU: 11,
        tS: 0,
        tM: 0,
        tL: 0,
    },
    {
        id: 8,
        fotos: ['remera-corta.png',"polera-c2.png","polera-c3.png","polera-c4.png"],
        nombre: "Remera Corta",
        detalle: "Polera punto morley con trenza lateral",
        precio: 7690,
        descuento: 2000,
        categoria:"Remeras",
        colores: ['Negro', 'Azul', 'Blanca'],
        talles: ['S', 'M', 'L'],
        tU: 0,
        tS: 7,
        tM: 3,
        tL: 4,
    },
    {
        id: 9,
        fotos: ["remera-lanilla.png","polera-c2.png","polera-c3.png","polera-c4.png"],
        nombre: "Remera lanilla",
        detalle: "Polera trenzas gruesas y finas Linette",
        precio: 6990,
        descuento: 2000,
        categoria:"Remeras",
        colores: ['Verde', 'Azul', 'Rosa', 'Crema'],
        talles: ['M', 'L'],
        tU: 0,
        tS: 0,
        tM: 3,
        tL: 5,
    },
    {
        id: 10,
        fotos: ['remera-manga-larga.png',"polera-c2.png","polera-c3.png","polera-c4.png"],
        nombre: "Remera manga larga",
        detalle: "Polera punto morley con trenza lateral",
        precio: 7690,
        descuento: 2000,
        categoria:"Remeras",
        colores: ['Negro', 'Blanca', 'Crema'],
        talles: ['S', 'M', 'L'],
        tU: 0,
        tS: 3,
        tM: 2,
        tL: 1,
    }
];*/

//const listCategorias=['Buzos','Camperas','Remeras','Pantalones','Shorts','Calzas','Poleras']

const detalleProd = JSON.parse(fs.readFileSync(path.resolve('./src/database/products.json')))
const listCategorias = JSON.parse(fs.readFileSync(path.resolve('./src/database/categorias.json')))
const listColores = JSON.parse(fs.readFileSync(path.resolve('./src/database/colores.json')))

const controller = {

    product: (req, res) => {
        const prodEncontrado = detalleProd.find(row => row.id == req.params.id)
        if (prodEncontrado) return res.render('productDetail', { detalle: prodEncontrado })
        else return res.send("ERROR 404 NOT FOUND")
    },
    categorias: (req, res) => {
        return res.render('categorias', { categoriaProd: detalleProd, listCategorias: listCategorias })
    },
    probador: (req, res) => {
        return res.render('probador')
    },
    altaProducto: (req, res) => {
        return res.render('altaProducto', { listCategorias: listCategorias })
    },
    processAltaProducto: (req, res) => {
        console.log(req.body );
        console.log(req.file);
        let prodNuevo = {
            "id": detalleProd.length + 1,
            "fotoPpal": req.file.filename,
            "fotos": "",
            "nombre": req.body.nombreProdAlta,
            "detalle": req.body.descProdAlta,
            "precio": req.body.precioProdAlta,
            "categoria": req.body.categoriaProdAlta,
            "colores": req.body.coloresProdAlta,
            "talles": req.body.talleProdAlta,
            "tU": req.body.tU,
            "tS": req.body.tS,
            "tM": req.body.tM,
            "tL": req.body.tL,
        }
        fs.writeFileSync(path.resolve('./src/database/products.json'), JSON.stringify([...detalleProd, prodNuevo], null, 2), "utf-8")
        return res.redirect('/altaProducto/create')
    },
    modifProducto: (req, res) => {
        const prodEncontrado = detalleProd.find(row => row.id == req.params.id)
        if (prodEncontrado) return res.render('modifProducto', { detalle: prodEncontrado, listCategorias: listCategorias, listColores: listColores })
        else return res.send("ERROR 404 NOT FOUND")
    },
    processModifProd: (req, res) => {
        const prodEncontrado = detalleProd.find(prod => prod.id == req.params.id)
        if (req.body.fotoProdPpal != "") prodEncontrado.fotoPpal = req.body.fotoProdPpal
        if (req.body.fotoProdAlta != "") prodEncontrado.fotos = req.body.fotoProdAlta
        prodEncontrado.nombre = req.body.nombreProdAlta
        prodEncontrado.detalle = req.body.descProdAlta
        prodEncontrado.precio = 7690
        prodEncontrado.descuento = 2000
        prodEncontrado.categoria = req.body.categoria
        prodEncontrado.colores = req.body.coloresProdAlta
        prodEncontrado.talles = req.body.talleProdAlta
        prodEncontrado.tU = req.body.tU
        prodEncontrado.tS = req.body.tS
        prodEncontrado.tM = req.body.tM
        prodEncontrado.tL = req.body.tL
        fs.writeFileSync(path.resolve('./src/database/products.json'), JSON.stringify(detalleProd, null, 2), "utf-8")
        return res.redirect('/products')
    }

};



module.exports = controller;