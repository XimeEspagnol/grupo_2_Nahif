const path = require('path');
const fs = require('fs');
const bcrypt = require("bcrypt");
let userId = JSON.parse(fs.readFileSync(path.resolve('./src/database/users.json')))

const controller = {

    login: (req,res) =>{
       return res.render('login')
    },
    processLogin: (req, res)=>{
      const usuario = userId.find(row=> row.id==req.body.email)
      if (usuario) {
          if (bycrypt.compareSync(req.body.contrasenia, usuario.contrasenia)){
              delete usuario.contrasenia
              req.session.usuarioLogueado = usuario
              if (req.body.cookie) res.cookie('recordame', req.body.email,{maxAge: 10006060})
              return res.redirect('/user/perfil')
          } else{
              return res.render('login', {errors: {
                  datosMal: {
                      msg:'Datos incorrectos'
                      }
                  }
          })}
      }else{
          return res.render('login', {errors: {
                                          datosMal: {
                                              msg:'Datos incorrectos'
                                              }
                                          }
                                  })
      }
  },
    register: (req,res) =>{
       return res.render ('register')
    },

    processRegister: (req, res) =>{        
         let userNuevo = {
             "id": userId.length + 1,
             "nombreCompleto": req.body.nombreCompleto,
             "email": req.body.usuario,
             "contrasenia": bcrypt.hashSync (req.body.contrasenia, 10),
             "perfilDeUsuario": "comprador",
             "borrado": false
    }

    fs.writeFileSync(path.resolve('./src/database/users.json'), JSON.stringify([...userId, userNuevo], null, 2), "utf-8")
    return res.redirect('/user/'+ userNuevo.id)

   },

    users: (req, res) => {
      userId = JSON.parse(fs.readFileSync(path.resolve('./src/database/users.json')))
      const userFound = userId.find(row=> row.id == req.params.id)
      if (userFound) return res.render('userfound', { users: userFound })
      else return res.send("Para poder ingresar, debe registrarse")
   },
   }


module.exports = controller;