const path = require('path');

const controller = {

    login: (req,res) =>{
        res.render('login')
    },
    register: (req,res) =>{
        res.sendFile(path.resolve('./views/register.html'))
    }
};

module.exports = controller;