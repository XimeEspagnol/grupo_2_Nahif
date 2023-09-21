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
            let nombreCategoria=""
                return res.render('categorias.ejs', { products: products, categorias: categorias, nombreCategoria:nombreCategoria })
         
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
            let categoriaElegida = await db.Categorias.findOne({ 
                where: {
                   id: req.params.categoria
               }
           })
           let nombreCategoria= categoriaElegida.nombre
            return res.render('categorias', { products: prodEncontrado, categorias: listCategorias, nombreCategoria: nombreCategoria })
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
            const coloresProdEdit = await db.colores_products.findAll({where:{product_id:req.params.id}})
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
            let colores = await db.Colores.findAll()
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
            //chequear si la combinacion ya existe, si no existe crearla.
            //chequear si el color no esta chequeado, y existe en la tabla, si existe borrarlo
            
            
            //
            colores = await db.Colores.findAll()
            for (let i=0; i<colores.length;i++){
                let colorMarcado=false
                if (req.body.coloresProdAlta.length==0) {
                    if (req.body.coloresProdAlta[0]==(colores[i].id)) {colorMarcado = true}
                } else{
                for (j=0; j<req.body.coloresProdAlta.length;j++){
                    if (req.body.coloresProdAlta[j]==(colores[i].id)) {colorMarcado = true}
                }
                }
                let colorExiste = await db.colores_products.findAll({
                        where:{[Op.and]:[
                            {product_id: req.params.id},
                            {color_id: colores[i].id}]
                        }})
                if (colorMarcado == true && colorExiste.length<=0){
                        db.colores_products.create({
                        product_id: req.params.id,
                        color_id: colores[i].id
                        })
                     
                } 
                if (colorMarcado == false && colorExiste.length>=0){
                    await db.colores_products.destroy({
                        where: {[Op.and]:[
                            {product_id: req.params.id},
                            {color_id: colores[i].id}]
                        }, force:true
                    })
                }}
            
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
                fs.unlinkSync(path.join(__dirname, '../../public/img/' + foto.nombreFoto))},
                
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
    eliminarFoto:async (req, res) => {
    
        const producto = await db.Products.findByPk(req.params.id) 
        const fotosProd = await db.FotosProd.findAll({
            where:{
                product_id: req.params.id
            }})
        if (producto && req.body != {}){
            if (req.body.delPpal != undefined) {
                 producto.fotoPpal = "default-image.jpg"
                 fs.unlinkSync(path.join(__dirname, '../../public/img/' + req.body.delPpal))
            }
            if (req.body.delFoto != undefined){
                if (typeof req.body.delFoto == "string"){
                    let fotoBorrada = await db.FotosProd.findOne({where:{nombreFoto: req.body.delFoto}})
                    fs.unlinkSync(path.join(__dirname, '../../public/img/' + fotoBorrada.nombreFoto))

                    await db.FotosProd.destroy({
                        where: {nombreFoto: req.body.delFoto}, force:true
                    })
                
                }
                if (typeof req.body.delFoto != "string") {
                    for (let i=0;i<req.body.delFoto.length;i++){
                        let fotoBorrada = await db.FotosProd.findOne({where:{nombreFoto: req.body.delFoto[i]}})
                        fs.unlinkSync(path.join(__dirname, '../../public/img/' + fotoBorrada.nombreFoto))
                        await db.FotosProd.destroy({
                            where: {nombreFoto: req.body.delFoto[i]}, force:true
                        })
                
                    }   
                }
            }
        }            
        return res.redirect('/products/modificarProd/'+req.params.id)
    }

}

module.exports = productController;
