const db = require ('../../database/models')
const bcrypt = require('bcrypt')
const Products = db.Products

module.exports={
    list: async (req, res) =>{
        let response = {}
        try {
           const productos  = await Products.findAll()
           response.count = productos.length
           response.products = productos.map(productos => {
                return {
                    id: productos.id,
                    name: productos.nombre,
                    detalle: productos.detalle,
                    precio: productos.precio,
                    stock: productos.stock,
                    detail: `api/products/${productos.id}`
                
                }})
            
            return res.json(response)
        } catch (error) {
            response.msg = "Hubo un error!"
            return res.json(response)
        }
    },

    detail: async (req, res) => {
      let response = {};
      try {
        const findproduct = await Products.findByPk(req.params.id);
        response.meta = {
          status: 200,
          total: findproduct.length,
          url: `/api/products/${req.params.id}`,
        };
        response.data = findproduct;
        response.data.fotoPpal = "/public/img/"+ findproduct.fotoPpal
        return res.json(response);
      } catch (error) {
        console.error("Error finding product:", error);
        response.meta = {
          status: 500,
          total: null,
          url: `/api/products/${req.params.id}`,
        };
        response.msg = `Error! No encontramos el usuario con id: ${req.params.id}.`;
        return res.status(500).json(response);
      }
    },
  
    /*create: async (req, res) => {
      let response = {};
      try {
        const usuarioCrear = await Products.create({
          name: req.body.name,
          lastname: req.body.lastname,
          product_name: req.body.product,
          email: req.body.email,
          profile_id: req.body.categoria ? req.body.categoria : "2",
          password: bcrypt.hashSync(req.body.password, 10),
          confirm_password: bcrypt.hashSync(req.body.repeatPassword, 10),
          image: req.file ? req.file.filename : "product-default.png",
        });
        response.meta = {
          status: 201,
          url: "/api/products/create",
        };
        response.data = usuarioCrear;
        return res.json(response);
      } catch (error) {
        console.error("Error creating product:", error);
        response.meta = {
          status: 500,
          url: "/api/products/create",
        };
        response.msg =
          "Oops! Something went wrong while creating the Products. Please try again later.";
        return res.status(500).json(response);
      }
    },
  
    update: async (req, res) => {
      let response = {};
      let productId = req.params.id;
      console.log(req);
      try {
        const editproduct = await Products.update(
          {
            name: req.body.name,
            lastname: req.body.lastname,
            product_name: req.body.product,
            email: req.body.email,
            profile_id: req.body.profile_id ? req.body.profile_id : "2",
            image: req.file ? req.file.filename : "product-default.png",
          },
  
          {
            where: { id: productId },
          }
        );
  
        if (req.params.id == req.session.productLogged.id) {
          if (req.cookies.productEmail) {
            res.clearCookie("productEmail");
            res.cookie("productEmail", req.body.product, { maxAge: 1000 * 60 * 60 });
          }
          delete editproduct.password;
          req.session.productLogged = editproduct;
        }
  
        console.log(editproduct);
        response.meta = {
          status: 201,
          url: `/api/products/edit/${req.params.id}`,
        };
        response.msg = `product successfully updated!`;
        return res.json(response);
      } catch (error) {
        console.error("Error creating product:", error);
        response.meta = {
          status: 500,
          url: `/api/products/edit/${req.params.id}`,
        };
        response.msg =
          "Oops! Something went wrong while updating the Product. Please try again later.";
        return res.status(500).json(response);
      }
    },
  
    destroy: async (req, res) => {
      let response = {};
      try {
        let productId = req.params.id;
        const deleteproduct = await Products.destroy({
          where: { id: productId },
          force: false,
        });
        if (deleteproduct) {
          response.meta = {
            status: 200,
            url: `/api/products/delete/${productId}`,
          };
          response.msg = "product successfully deleted!";
        } else {
          response.meta = {
            status: 404,
            url: `/api/products/delete/${productId}`,
          };
          response.msg = "product not found for deletion.";
        }
        return res.json(response);
      } catch (error) {
        console.error("Error deleting product:", error);
        response.meta = {
          status: 500,
          url: `/api/products/delete/${productId}`,
        };
        response.msg =
          "Oops! Something went wrong while deleting the Product. Please try again later.";
        return res.status(500).json(response);
      }
    },*/
  };