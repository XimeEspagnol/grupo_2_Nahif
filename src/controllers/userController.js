const path = require('path');
const userId = JSON.parse(fs.readFileSync(path.resolve('./src/database/users.json')))

const controller = {

    login: (req,res) =>{
       return res.render('login')
    },
    register: (req,res) =>{
       return res.render ('register')
    },

    users: (req, res) => {
      const userFinded = userId.find(row => row.id == req.params.id)
      if (userFinded) return res.render('userFinded', { users: userFinded })
      else return res.send("Para poder ingresar, debe registrarse")
    },
   }


module.exports = controller;