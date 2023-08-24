const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const products = require('../database/models/Products');


//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
const Products = db.Products;
const Categorias = db.Categorias
const Users = db.Users;
const Talles = db.Talles
const colores_products = db.colores_products
const Colores = db.Colores


const productController = {
    /*list: async (req, res) => {
        try {
            productos = await db.Products.findAll()
    
          res.render("categorias.ejs", { productos });
        } catch (error) {
          console.log(error)
        }},*/
    list: async (req, res) => {
        try {
            const products = await db.Products.findAll()
            const categorias = await db.Categorias.findAll()
                console.log (products)
            return res.render('categorias.ejs', { products: products, categorias: categorias })
         
        } catch (error) {
            console.log(error);
        }
    },
    detail: async (req, res) => {
        try {
            let product = await db.Products.findByPk(req.params.id, { include: [{ association: 'talles' }, { association: 'categorias' }, {association: 'colores' }] })
             console.log (product)
            return res.render('productDetail.ejs', {detalle: product});

        } catch (error) {
            console.log(error);
        }
    },
    productAdmin: (req, res) => {
        let prodActivos = detalleProd.filter(row => row.borrado==false)
        return res.render('productAdmin', { categoriaProd: prodActivos, listCategorias: listCategorias })
    },
    filtroCategorias: (req, res) => {
        const prodEncontrado = detalleProd.filter(row => row.categoria==req.params.categoria)
        return res.render('categorias', { categoriaProd: prodEncontrado, listCategorias: listCategorias })
    },
    //listCategorias?
    filtroAdminCategorias: (req, res) => {
        const prodEncontrado = detalleProd.filter(row => row.categoria==req.params.categoria && row.borrado==false)
        return res.render('productAdmin', { categoriaProd: prodEncontrado, listCategorias: listCategorias })
    },

    //Aqui dispongo las rutas para trabajar con el CRUD
    add: async (req, res) => {
        try {
            const talles = await db.Talles.findAll()
            const categorias = await db.Categorias.findAll()
            res.render('altaProducto', [{ allTalles: talles }, { allCategorias: categorias }])
        } catch (error) {
            console.log(error);
        }
    },
    create: async (req, res) => {
        try {
            let fotoPpalNueva = "default-image.jpg"
            let fotosNuevas = []
            if (req.files != "") {
                if (req.body.fotoProdPpal != ""& req.files[0].fieldname=='fotoProdPpal') fotoPpalNueva = req.files[0].filename
                if (req.body.fotoProdAlta != ""& req.files.length>=1)
                    req.files.forEach(row => {
                       if (row.fieldname =='fotoProdAlta') fotosNuevas.push(row.filename)
                    });
            }
            const productoCreado = await db.Products.create({
                nombre: req.body.nombre,
                detalle: req.body.detalle,
                fotoPpal: fotoPpalNueva,
                fotos: fotosNuevas,
                precio: req.body.precio,
                descuento: req.body.descuento,
                talle_id: req.body.talle_id,
                categoria_id: req.body.categoria_id,
                color_id: req.body.color_id,
                stock: req.body.stock
            })
            for (let i = 0; i < colores.length; i++) {
                await productoCreado.addColores(colores[i].id)
            }
            res.redirect('/products')
        } catch (error) {
            console.log(error);
        }
    },
    edit: async (req, res) => {
        try {
            const productsEdit = db.Products.findByPk(req.params.id)
            const tallesEdit = db.Talles.findAll()
            const categoriasEdit = db.Categorias.findAll()
            const coloresProdEdit = db.colores_products.findAll()
            const [products, talles, categorias, coloresProd] = await Promise.all([productsEdit, tallesEdit, categoriasEdit, coloresProdEdit])
            res.render('modifProducto', { Product: products, allTalles: talles, allCategorias: categorias, allColores: coloresProd })
        } catch (error) {
            console.log(error);
        }

    },
    update: async (req, res) => {
        try {
            await db.Products.update({
                nombre: req.body.nombre,
                detalle: req.body.detalle,
                fotoPpal: req.body.fotoPpal,
                fotos: req.body.fotos,
                precio: req.body.precio,
                descuento: req.body.descuento,
                talle_id: req.body.talle_id,
                categoria_id: req.body.categoria_id,
                color_id: req.body.colores,
                stock: req.body.stock
            }, { 
                where: {
                    id: req.params.id
                }
            })


            res.redirect('/products')
        } catch (error) {
            console.log(error);
        }
    },
    delete: async (req, res) =>{
        try {
         const productoEncontrado = await db.Products.findByPk(req.params.id)
         //throw new Error("Hubo un error")
         return res.render('productAdmin', {Product: productoEncontrado})
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
            //console.log(productoEliminado);
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