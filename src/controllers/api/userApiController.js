const db = require ('../../database/models')
const bcrypt = require('bcrypt')
const Users = db.Users

module.exports={
    list: async (req, res) =>{
        let response = {data:{}}
        try {
           const usuarios  = await Users.findAll()
           response.data.count = usuarios.length
           response.data.users = usuarios.map(usuario => {
                return {
                    id: usuario.id,
                    name: usuario.nombre,
                    email: usuario.email,
                    detail: `api/user/${usuario.id}`
                
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
        const findUser = await Users.findByPk(req.params.id, {attributes:{exclude:["contrasenia", 'rol_id']}});
        response.meta = {
          status: 200,
          total: findUser.length,
          url: `/api/user/${req.params.id}`,
        };
        response.data = findUser;
        response.data.fotoPerfil = `/public/img/${findUser.fotoPerfil}`
        return res.json(response);
      } catch (error) {
        console.error("Error finding user:", error);
        response.meta = {
          status: 500,
          total: null,
          url: `/api/user/${req.params.id}`,
        };
        response.msg = `Error! No encontramos el usuario con id: ${req.params.id}.`;
        return res.status(500).json(response);
      }
    },
  
    /*create: async (req, res) => {
      let response = {};
      try {
        const usuarioCrear = await Users.create({
          name: req.body.name,
          lastname: req.body.lastname,
          user_name: req.body.user,
          email: req.body.email,
          profile_id: req.body.categoria ? req.body.categoria : "2",
          password: bcrypt.hashSync(req.body.password, 10),
          confirm_password: bcrypt.hashSync(req.body.repeatPassword, 10),
          image: req.file ? req.file.filename : "product-default.png",
        });
        response.meta = {
          status: 201,
          url: "/api/user/create",
        };
        response.data = usuarioCrear;
        return res.json(response);
      } catch (error) {
        console.error("Error creating user:", error);
        response.meta = {
          status: 500,
          url: "/api/user/create",
        };
        response.msg =
          "Oops! Something went wrong while creating the user. Please try again later.";
        return res.status(500).json(response);
      }
    },
  
    update: async (req, res) => {
      let response = {};
      let userId = req.params.id;
      try {
        const editUser = await Users.update(
          {
            name: req.body.name,
            lastname: req.body.lastname,
            user_name: req.body.user,
            email: req.body.email,
            profile_id: req.body.profile_id ? req.body.profile_id : "2",
            image: req.file ? req.file.filename : "product-default.png",
          },
  
          {
            where: { id: userId },
          }
        );
  
        if (req.params.id == req.session.userLogged.id) {
          if (req.cookies.userEmail) {
            res.clearCookie("userEmail");
            res.cookie("userEmail", req.body.user, { maxAge: 1000 * 60 * 60 });
          }
          delete editUser.password;
          req.session.userLogged = editUser;
        }

        response.meta = {
          status: 201,
          url: `/api/user/edit/${req.params.id}`,
        };
        response.msg = `User successfully updated!`;
        return res.json(response);
      } catch (error) {
        console.error("Error creating user:", error);
        response.meta = {
          status: 500,
          url: `/api/user/edit/${req.params.id}`,
        };
        response.msg =
          "Oops! Something went wrong while updating the user. Please try again later.";
        return res.status(500).json(response);
      }
    },
  
    destroy: async (req, res) => {
      let response = {};
      try {
        let userId = req.params.id;
        const deleteUser = await Users.destroy({
          where: { id: userId },
          force: false,
        });
        if (deleteUser) {
          response.meta = {
            status: 200,
            url: `/api/user/delete/${userId}`,
          };
          response.msg = "User successfully deleted!";
        } else {
          response.meta = {
            status: 404,
            url: `/api/user/delete/${userId}`,
          };
          response.msg = "User not found for deletion.";
        }
        return res.json(response);
      } catch (error) {
        console.error("Error deleting user:", error);
        response.meta = {
          status: 500,
          url: `/api/user/delete/${userId}`,
        };
        response.msg =
          "Oops! Something went wrong while deleting the user. Please try again later.";
        return res.status(500).json(response);
      }
    },*/
  };