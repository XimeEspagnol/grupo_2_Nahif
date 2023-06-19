const path = require('path');
const fs = require('fs');
const userId = JSON.parse(fs.readFileSync(path.resolve('./src/database/users.json')))

const controller = {

    login: (req,res) =>{
       return res.render('login')
    },
    register: (req,res) =>{
       return res.render ('register')
    },

    users: (req, res) => {
      const userFound = userId.find(row => row.id == req.params.id)
      if (userFound) return res.render('userFound', { users: userFound })
      else return res.send("Para poder ingresar, debe registrarse")
    },
   }


module.exports = controller;