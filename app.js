const express = require("express")
const path = require("path")

const app = express()

const publicPath = path.resolve(__dirname, "./public")
app.use (express.static(publicPath))

app.listen(3002, () =>{
    console.log("Servidor corriendo en el puerto 3002")
})

app.get("/login", (req, res) =>{
    res.sendFile(path.resolve(__dirname, "./views/login.html"))
})

app.get("/carrito", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/productCart.html"))
})

app.get("/register", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/register.html"))
})

<<<<<<< HEAD
app.get("/product", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/productDetail.html"))
})
=======
app.get("/reCaptcha", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/reCaptcha.html"))
})
app.get("/product", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/productDetail.html"))
})
app.get("/categorias", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/categorias.html"))
})
>>>>>>> 00776636a5ef77fb3936abf20d6952673c167e7e
