const path = require ('path')
const express = require("express")
const app = express()

const mainRouter = require ('./routes/mainRouter');
const productRouter = require ('./routes/productRouter');
const userRouter = require ('./routes/userRouter');
const methodOverride = require('method-override')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, '../views'));
app.set ('view engine', 'ejs')


app.listen(3002, () =>{
    console.log("Servidor corriendo en el puerto 3002")
})

app.use('/', mainRouter);
app.use('/', productRouter);
app.use('/', userRouter);