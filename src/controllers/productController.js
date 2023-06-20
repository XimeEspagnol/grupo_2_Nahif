const path = require('path');
const fs = require('fs')

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
        console.log(req.files)
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
        return res.redirect('/products/altaProducto/create')
    },
    modifProducto: (req, res) => {
        const prodEncontrado = detalleProd.find(row => row.id == req.params.id)
        if (prodEncontrado) return res.render('modifProducto', { detalle: prodEncontrado, listCategorias: listCategorias, listColores: listColores })
        else return res.send("ERROR 404 NOT FOUND")
    },
    processModifProd: (req, res) => {
        console.log(req.body)
        console.log(req.files)
        const prodEncontrado = detalleProd.find(prod => prod.id == req.params.id)
        if (req.files != "") {
            if (req.body.fotoProdPpal != ""& req.files[0].fieldname=='fotoProdPpal') prodEncontrado.fotoPpal = req.files[0].filename
            if (req.body.fotoProdAlta != ""& req.files.length>=1) prodEncontrado.fotos = req.files.filter(row => row.fieldname=='fotoProdAlta')
        }
        prodEncontrado.nombre = req.body.nombreProdAlta
        prodEncontrado.detalle = req.body.descProdAlta
        prodEncontrado.precio = req.body.precioProdAlta
        prodEncontrado.descuento = 2000
        if (req.body.categoriaProdAlta != "") prodEncontrado.categoria = req.body.categoriaProdAlta
        prodEncontrado.colores = req.body.coloresProdAlta
        if (typeof(req.body.coloresProdAlta)== String || req.body.coloresProdAlta!= "") prodEncontrado.colores = req.body.coloresProdAlta
        else prodEncontrado.colores = req.body.coloresProdAlta
        if (typeof(req.body.talleProdAlta)== String || req.body.talleProdAlta!= "") prodEncontrado.talles = req.body.talleProdAlta
        else prodEncontrado.talles = req.body.talleProdAlta
        prodEncontrado.tU = req.body.tU
        prodEncontrado.tS = req.body.tS
        prodEncontrado.tM = req.body.tM
        prodEncontrado.tL = req.body.tL
        fs.writeFileSync(path.resolve('./src/database/products.json'), JSON.stringify(detalleProd, null, 2), "utf-8")
        return res.redirect('/products')
    }

};



module.exports = controller;