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