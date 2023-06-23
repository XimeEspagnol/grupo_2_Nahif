const path = require('path');
const fs = require('fs');
//const { formatWithOptions } = require('util');

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
    productAdmin: (req, res) => {
        let prodActivos = detalleProd.filter(row => row.borrado==false)
        return res.render('productAdmin', { categoriaProd: prodActivos, listCategorias: listCategorias })
    },
    altaProducto: (req, res) => {
        return res.render('altaProducto', { listCategorias: listCategorias, listColores: listColores })
    },
    processAltaProducto: (req, res) => {
        let fotoPpalNueva = "default-image.jpg"
        let fotosNuevas = []
        if (req.files != "") {
            if (req.body.fotoProdPpal != ""& req.files[0].fieldname=='fotoProdPpal') fotoPpalNueva = req.files[0].filename
            if (req.body.fotoProdAlta != ""& req.files.length>=1)
                req.files.forEach(row => {
                   if (row.fieldname =='fotoProdAlta') fotosNuevas.push(row.filename)
                });
        }
        let prodNuevo = {
            "id": detalleProd.length + 1,
            "fotoPpal": fotoPpalNueva,
            "fotos": fotosNuevas,
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
            "descuento": req.body.antesProdAlta,
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
        const prodEncontrado = detalleProd.find(prod => prod.id == req.params.id)
        if (req.files != "") {
            if (req.body.fotoProdPpal != ""& req.files[0].fieldname=='fotoProdPpal') prodEncontrado.fotoPpal = req.files[0].filename
            if (req.body.fotoProdAlta != ""& req.files.length>=1)
                req.files.forEach(row => {
                   if (row.fieldname =='fotoProdAlta') prodEncontrado.fotos = [...prodEncontrado.fotos,row.filename]
                });
        }
        prodEncontrado.nombre = req.body.nombreProdAlta
        prodEncontrado.detalle = req.body.descProdAlta
        prodEncontrado.precio = req.body.precioProdAlta
        if (req.body.categoriaProdAlta != "") prodEncontrado.categoria = req.body.categoriaProdAlta
        prodEncontrado.colores = req.body.coloresProdAlta
        if (typeof(req.body.coloresProdAlta)== String || req.body.coloresProdAlta!= "") prodEncontrado.colores = req.body.coloresProdAlta
        else prodEncontrado.colores = req.body.coloresProdAlta
        if (typeof(req.body.talleProdAlta)== String || req.body.talleProdAlta!= "") prodEncontrado.talles = req.body.talleProdAlta
        else prodEncontrado.talles = req.body.talleProdAlta
        prodEncontrado.descuento = req.body.antesProdAlta
        prodEncontrado.tU = req.body.tU
        prodEncontrado.tS = req.body.tS
        prodEncontrado.tM = req.body.tM
        prodEncontrado.tL = req.body.tL
        fs.writeFileSync(path.resolve('./src/database/products.json'), JSON.stringify(detalleProd, null, 2), "utf-8")
        return res.redirect('/products/modificarProd/'+req.params.id)
    },
    eliminarProd:(req, res) => {
        console.log(req.body);
    
        if (req.body){
            if (req.body.borrarProd){
                if (typeof req.body.borrarProd == "string"){
                    let producto = detalleProd.find(row=>row.id == req.body.borrarProd)
                    if (producto) producto.borrado=true
                  //  fs.unlinkSync(path.join(__dirname, '../../public/img/' + req.body.delFoto))
                }
                if (typeof req.body.borrarProd != "string") {
                    for (let i=0;i<req.body.borrarProd.length;i++){
                     let prodEncontrado = detalleProd.find(row=> row.id==req.body.borrarProd)
                        if (prodEncontrado) productoEncontrado.borrado=true
                    }   
                }
            }
        }            
        fs.writeFileSync(path.join(__dirname,'../database/products.json'),JSON.stringify(detalleProd, null, 2))
        return res.redirect('/products/admin')
    },
    eliminarFoto:(req, res) => {
        console.log(req.body);
    
        const producto = detalleProd.find(row=> row.id==req.params.id)
        if (producto && req.body != undefined){
            if (req.body.delPpal != "") {
                 producto.fotoPpal = "default-image.jpg"
                // fs.unlinkSync(path.join(__dirname, '../../public/img/' + req.body.delPpal))
            }
            if (req.body.delFoto != undefined){
                if (typeof req.body.delFoto == "string"){
                    producto.fotos = producto.fotos.filter(row=>row != req.body.delFoto)
                  //  fs.unlinkSync(path.join(__dirname, '../../public/img/' + req.body.delFoto))
                }
                if (typeof req.body.delFoto != "string") {
                    for (let i=0;i<req.body.delFoto.length;i++){
                     let fotoEncontrada = producto.fotos.find(row=> row==req.body.delFoto[i])
                        if (fotoEncontrada) {
                    //         fs.unlinkSync(path.join(__dirname, '../../public/img/' + req.body.delFoto[i]))
                             producto.fotos=producto.fotos.filter(row=>row !=req.body.delFoto[i])
                        }
                    }   
                }
            }
        }            
        fs.writeFileSync(path.join(__dirname,'../database/products.json'),JSON.stringify(detalleProd, null, 2))
        return res.redirect('/products/modificarProd/'+req.params.id)
    }
   

};



module.exports = controller;