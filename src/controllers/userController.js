const path = require('path');
const fs = require('fs');
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
let userId = JSON.parse(fs.readFileSync(path.resolve('./src/database/users.json')));
let db = require ('../database/models');

const controller = {

    login: (req,res) =>{
       return res.render('login')
    },
    processLogin: (req, res)=>{
      const usuario = userId.find(row=> row.email==req.body.loginEmail)
      if (usuario) {
        if (bcrypt.compareSync(req.body.loginPassword, usuario.contrasenia)){
              //delete usuario.contrasenia
              req.session.usuarioLogueado = usuario.email
              req.session.fotoPerfil = usuario.fotoPerfil
              req.session.nombre = usuario.nombreCompleto
              if (req.body.cookie) res.cookie('recordame', req.body.loginEmail,{maxAge: 10006060})
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
        let userExists={msg:""}
       return res.render ('register', { userExists : userExists})
    },

    processRegister: (req, res) =>{  
        const rdoValidacion = validationResult(req)
        let userExists = {msg:""}
        if (rdoValidacion.errors.length > 0) return res.render('register', {errors: rdoValidacion.mapped(), oldData: req.body,userExists: userExists})
        userId = JSON.parse(fs.readFileSync(path.resolve('./src/database/users.json')))
        const userFound = userId.find(row=> row.email == req.body.usuario)
        if(!userFound){
            let fotoPerfilNueva= "default-user.jpg"
            
            if (req.file) {
                if (req.body.fotoRegistro != "") fotoPerfilNueva = req.file.filename                
            }      
            let userNuevo = {
                "id": userId.length + 1,
                "nombreCompleto": req.body.nombreCompleto,
                "email": req.body.usuario,
                "fotoPerfil": fotoPerfilNueva,
                "contrasenia": bcrypt.hashSync (req.body.contrasenia, 10),
                "perfilDeUsuario": "comprador",
                "borrado": false
            }
            fs.writeFileSync(path.resolve('./src/database/users.json'), JSON.stringify([...userId, userNuevo], null, 2), "utf-8")
            req.session.usuarioLogueado = userNuevo.email
            return res.redirect('/user/perfil')

        } else{
            let userExists={ msg:"mail ya existente"}
            return res.render('register', {userExists: userExists})
        }

   },
   
    users: (req, res) => {
      userId = JSON.parse(fs.readFileSync(path.resolve('./src/database/users.json')))
      const userFound = userId.find(row=> row.email == req.session.usuarioLogueado)
      if (userFound) return res.render('userfound', { users: userFound })
      else return res.render("login")
   },

    logout:(req, res) => {
        req.session.destroy()
        res.clearCookie("recordame")
        return res.redirect('/')
    }
}


module.exports = controller;