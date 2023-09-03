const path = require('path');
const fs = require('fs')
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const products = require('../database/models/Products');
const { validationResult } = require("express-validator");

//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
const Products = db.Products;
const Categorias = db.Categorias
const Users = db.Users;
const Talles = db.Talles
const colores_products = db.coloes_products
const Colores = db.Colores


const productController = {
    list: async (req, res) => {
        try {
            const products = await db.Products.findAll()
            const categorias = await db.Categorias.findAll()
                return res.render('categorias.ejs', { products: products, categorias: categorias })
         
        } catch (error) {
            console.log(error);
        }
    },
    detail: async (req, res) => {
        try {
            let product = await db.Products.findByPk(req.params.id, { include: [{ association: 'talles' }, { association: 'categorias' }, {association: 'colores' }, {association:'fotos'}] })
            return res.render('productDetail.ejs', {detalle: product});

        } catch (error) {
            console.log(error);
        }
    },
    productAdmin: async (req, res) => {
        const prodActivos = await db.Products.findAll()
        const listCategorias = await db.Categorias.findAll()
        return res.render('productAdmin', { categoriaProd: prodActivos, listCategorias: listCategorias })
    },
    filtroCategorias:async (req, res) => {
        try {
            const listCategorias = await db.Categorias.findAll()
            let prodEncontrado = await db.Products.findAll({ 
                 where: {
                    categoria_id: req.params.categoria
                }
            })
            return res.render('categorias', { products: prodEncontrado, categorias: listCategorias })
        } catch (error) {
            console.log(error);
        }
        
    },
    filtroAdminCategorias: async(req, res) => {
        try {
            const listCategorias = await db.Categorias.findAll()
            let prodEncontrado = await db.Products.findAll({ 
                 where: {
                    categoria_id: req.params.categoria
                }
            })
            return res.render('productAdmin', { categoriaProd: prodEncontrado, listCategorias: listCategorias })
        } catch (error) {
            console.log(error);
        }
        
    },

    // rutas para trabajar con el CRUD
    add: async (req, res) => {
        try {
            const talles = await db.Talles.findAll()
            const categorias = await db.Categorias.findAll()
            const colores = await db.Colores.findAll()
            const errores = {msg:""}
            return res.render('altaProducto', {errors: errores, listTalles: talles , listCategorias: categorias , listColores: colores})
        } catch (error) {
            console.log(error);
        }
    },
    create: async (req, res) => {
        try {
            const talles = await db.Talles.findAll()
            const categorias = await db.Categorias.findAll()
            const colores = await db.Colores.findAll()
            const rdoValidacion = validationResult(req)
            let prodExists = { msg: "" }
            //poner busqueda si existe el producto
            if (!rdoValidacion.isEmpty()) return res.render('altaProducto', { errors: rdoValidacion.mapped(), oldData: req.body, prodExists: prodExists, listTalles: talles , listCategorias: categorias , listColores: colores })
            let fotoPpalNueva = "default-image.jpg"
            if (req.files != "") {
                if (req.body.fotoProdPpal != ""& req.files[0].fieldname=='fotoProdPpal') fotoPpalNueva = req.files[0].filename
            }
            const productoCreado = await db.Products.create({
                nombre: req.body.nombreProdAlta,
                detalle: req.body.descProdAlta,
                fotoPpal: fotoPpalNueva,
                precio: req.body.precioProdAlta,
                descuento: req.body.descuentoProdAlta,
                talle_id: req.body.talleProdAlta,
                categoria_id: req.body.categoriaProdAlta,
                color_id: 1,
                stock: req.body.stock
            })
            
            if (req.files != "") {
                if (req.body.fotoProdAlta != ""& req.files.length>=1)
                    req.files.forEach(async row => {
                       if (row.fieldname =='fotoProdAlta') {
                        await db.FotosProd.create({
                            product_id: productoCreado.id,
                            nombreFoto: row.filename
                        })
                       }
                    });
                }
                for (let i=0; i<req.body.coloresProdAlta.length;i++ ) {
                         db.colores_products.create({
                         product_id: productoCreado.id,
                         color_id: req.body.coloresProdAlta[i]
                     })
                    }
            return res.redirect('/products')
        }   catch (error) {
            console.log(error);
        }
    },
    edit: async (req, res) => {
        try {
            const colores = await db.Colores.findAll()
            const productsEdit = await db.Products.findByPk(req.params.id, { include: [{ association: 'talles' }, { association: 'categorias' }, {association: 'colores' }, {association:'fotos'}] })
            const tallesEdit = await db.Talles.findAll()
            const categoriasEdit = await db.Categorias.findAll()
            const coloresProdEdit = await db.colores_products.findAll()
            const [products, talles, categorias, coloresProd] = await Promise.all([productsEdit, tallesEdit, categoriasEdit, coloresProdEdit])
            res.render('modifProducto', { detalle: products, listTalles: talles, listCategorias: categorias, listColores: coloresProd, listColor: colores })
        } catch (error) {
            console.log(error);
        }

    },
    update: async (req, res) => {
        try {
            let productos = await db.Products.findByPk(req.params.id, { include: [{ association: 'talles' }, { association: 'categorias' }, {association: 'colores' }, {association:'fotos'}] })
            const talles = await db.Talles.findAll()
            const categorias = await db.Categorias.findAll()
            const colores = await db.Colores.findAll()
            const coloresProdEdit = await db.colores_products.findAll()
            const rdoValidacion = validationResult(req)
            if (!rdoValidacion.isEmpty()) return res.render('modifProducto', { errors: rdoValidacion.mapped(), oldData: req.body, detalle: productos, listTalles: talles , listCategorias: categorias , listColor: colores, listColores: coloresProdEdit })
            let prodModif = await db.Products.findByPk(req.params.id)
            let fotoPpalNueva = prodModif.fotoPpal
            if (req.files != "") {
                if (req.body.fotoProdPpal != ""& req.files[0].fieldname=='fotoProdPpal') fotoPpalNueva = req.files[0].filename
            }
            await db.Products.update({
                nombre: req.body.nombreProdAlta,
                detalle: req.body.descProdAlta,
                fotoPpal: fotoPpalNueva,
                precio: req.body.precioProdAlta,
                descuento: req.body.descuentoProdAlta,
                talle_id: req.body.talleProdAlta,
                categoria_id: req.body.categoriaProdAlta,
                color_id: 1,
                stock: req.body.stock
            }, { 
                where: {
                    id: req.params.id
                }
            })
            if (req.files != "") {
                if (req.body.fotoProdAlta != ""& req.files.length>=1)
                    req.files.forEach(async row => {
                       if (row.fieldname =='fotoProdAlta') {
                        await db.FotosProd.create({
                            product_id: req.params.id,
                            nombreFoto: row.filename
                        })
                       }
                    });
                }
            for (let i=0; i<req.body.coloresProdAlta.length;i++ ) {
                db.colores_products.create({
                product_id: req.params.id,
                color_id: req.body.coloresProdAlta[i]
            })
           }

            res.redirect('/products/admin')
        } catch (error) {
            console.log(error);
        }
        
    },
    delete: async (req, res) =>{
        try {
        const delProd =[]
        delProd.push(req.body.borrarProd)
        delProd.forEach(async productoEncontrado =>{
         await db.colores_products.destroy({
                where: {product_id: productoEncontrado}, force:true
            })
        let borrarFoto =[]
        borrarFoto = await db.FotosProd.findAll({
            where: {product_id: productoEncontrado}
        })
        if (borrarFoto.length > 1){
            borrarFoto.forEach(async foto=>{
                fs.unlinkSync(path.join(__dirname, '../../public/img/' + borrarFoto.nombreFoto))},
                
        )}
        await db.FotosProd.destroy({
                    where: {product_id: productoEncontrado}, force:true
                })
            let borrarProd = await db.Products.findByPk(productoEncontrado)
            if (borrarProd){   
                await db.Products.destroy({
                    where: {id: productoEncontrado},force:true
                })
         }
        return res.redirect('/products/admin')    
        })
    }
         catch (error) {
             console.log(error);
        } 
    },
    destroy: async (req, res) =>{
        try {
            const productoEliminado = await db.Products.destroy({
                where: {id: req.params.id}
            })
            return res.redirect('/products')
        } catch (error) {
            console.log(error);
        }
    },
    eliminarFoto:(req, res) => {
    
        const producto = detalleProd.find(row=> row.id==req.params.id)
        if (producto && req.body != {}){
            if (req.body.delPpal != undefined) {
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

}

module.exports = productController;

//for (let i = 0; i< colores.length; i++) {
// await productoCreado.addColor(colores[i].id,{through:{rating:actores[i].rating,participaciones:actores[i].apariciones}})
  //  }

/*const detalleProd = JSON.parse(fs.readFileSync(path.resolve('./src/database/products.json')))
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
    filtroCategorias: (req, res) => {
        const prodEncontrado = detalleProd.filter(row => row.categoria==req.params.categoria)
        return res.render('categorias', { categoriaProd: prodEncontrado, listCategorias: listCategorias })
    },
    filtroAdminCategorias: (req, res) => {
        const prodEncontrado = detalleProd.filter(row => row.categoria==req.params.categoria && row.borrado==false)
        return res.render('productAdmin', { categoriaProd: prodEncontrado, listCategorias: listCategorias })
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
            "borrado":false
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
  
        if (req.body){
            if (req.body.borrarProd){
                if (typeof req.body.borrarProd == "string"){
                    let producto = detalleProd.find(row=>row.id == req.body.borrarProd)
                    if (producto) producto.borrado=true
                }
                if (typeof req.body.borrarProd == "object") {
                    for (let i=0;i<req.body.borrarProd.length;i++){
                     let prodEncontrado = detalleProd.find(row=> row.id==req.body.borrarProd[i])
                        if (prodEncontrado != undefined) prodEncontrado.borrado=true
                    }   
                }
            }
        }            
        fs.writeFileSync(path.join(__dirname,'../database/products.json'),JSON.stringify(detalleProd, null, 2))
        return res.redirect('/products/admin')
    },
    eliminarFoto:(req, res) => {
    
        const producto = detalleProd.find(row=> row.id==req.params.id)
        if (producto && req.body != {}){
            if (req.body.delPpal != undefined) {
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
   

};*/