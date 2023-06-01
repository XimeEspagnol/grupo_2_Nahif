const path = require('path');

const controller = {

    login: (req,res) =>{
        res.sendFile(path.resolve('./views/login.html'))
    },
    register: (req,res) =>{
        res.sendFile(path.resolve('./views/register.html'))
    }
};

module.exports = controller;