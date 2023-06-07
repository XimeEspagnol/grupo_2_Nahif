const path = require ('path')
const express = require("express")

const app = express()

/*const publicPath = path.resolve(__dirname, "./public")*/
app.use(express.static('public'))

app.set('views', path.join(__dirname, 'views'));
app.set ('view engine', 'ejs')

const mainRouter = require ('./routes/mainRouter');
const productRouter = require ('./routes/productRouter');
const userRouter = require ('./routes/userRouter');
/*fijarse de llamar a la carpeta router*/

app.listen(3002, () =>{
    console.log("Servidor corriendo en el puerto 3002")
})

app.use('/', mainRouter);
app.use('/', productRouter);
app.use('/', userRouter);