const path = require('path');

const detalleProd = [
    {
        id: 1,
        foto: "polera-combinada.png",
        fotosExtra: ["polera-c2.png","polera-c3.png","polera-c4.png"],
        nombre: "Polera Combinada",
        detalle: "Polera combinada manga campana Odesa",
        precio: 8290,
        colores: ['Negro', 'Azul', 'Rosa'],
        talles: ['S', 'M'],
        tU: 0,
        tS: 3,
        tM: 2,
        tL: 0,
    },
    {
        id: 2,
        foto: "polera-Lanilla.png",
        fotosExtra: ["polera-c2.png","polera-c3.png","polera-c4.png"],
        nombre: "Polera lanilla",
        detalle: "Polera lanilla brush con recorte tipo corset Bellrose",
        precio: 5490,
        colores: ['Crema', 'Blanca', 'Rosa'],
        talles: ['S', 'M', 'L'],
        tU: 0,
        tS: 2,
        tM: 1,
        tL: 4,
    },
    {
        id: 3,
        foto: "polera-Trenzas.png",
        fotosExtra: ["polera-c2.png","polera-c3.png","polera-c4.png"],
        nombre: "Polera con diseño Trenza",
        detalle: "Polera trenzas gruesas y finas Linette",
        precio: 6990,
        colores: ['Crema', 'Blanco', 'Verde', 'Azul'],
        talles: ['L', 'M'],
        tU: 0,
        tS: 0,
        tM: 5,
        tL: 2,
    },
    {
        id: 4,
        foto: 'Poleron-Largo2.png',
        fotosExtra: ["polera-c2.png","polera-c3.png","polera-c4.png"],
        nombre: "Polera Trenzas Black",
        detalle: "Polera punto morley con trenza lateral",
        precio: 7690,
        colores: ['Negro', 'Azul', 'Blanco', 'Crema', 'Verde'],
        talles: ['Talle único'],
        tU: 8,
        tS: 0,
        tM: 0,
        tL: 0,
    },
    {
        id: 5,
        foto: "polera-c2.png",
        fotosExtra: ["polera-c2.png","polera-c3.png","polera-c4.png"],
        nombre: "Polera Combinada Marrón",
        detalle: "Polera combinada manga campana Odesa",
        precio: 8290,
        colores: ['Negro', 'Verde', 'Blanco'],
        talles: ['S', 'L'],
        tU: 0,
        tS: 3,
        tM: 0,
        tL: 2,
    },
    {
        id: 6,
        foto: "remera-algodon.png",
        fotosExtra: ["polera-c2.png","polera-c3.png","polera-c4.png"],
        nombre: "Remera algodón",
        detalle: "Polera lanilla brush con recorte tipo corset Bellrose",
        precio: 5490,
        colores: ['Negro', 'Blanco'],
        talles: ['S', 'M', 'L'],
        tU: 0,
        tS: 5,
        tM: 3,
        tL: 4,
    },
    {
        id: 7,
        foto: "remera-amplia.png",
        fotosExtra: ["polera-c2.png","polera-c3.png","polera-c4.png"],
        nombre: "Remera oversize",
        detalle: "Polera trenzas gruesas y finas Linette",
        precio: 6990,
        colores: ['Negro', 'Azul', 'Rosa', 'Verde'],
        talles: ['Talle único'],
        tU: 11,
        tS: 0,
        tM: 0,
        tL: 0,
    },
    {
        id: 8,
        foto: 'remera-corta.png',
        fotosExtra: ["polera-c2.png","polera-c3.png","polera-c4.png"],
        nombre: "Remera Corta",
        detalle: "Polera punto morley con trenza lateral",
        precio: 7690,
        colores: ['Negro', 'Azul', 'Blanca'],
        talles: ['S', 'M', 'L'],
        tU: 0,
        tS: 7,
        tM: 3,
        tL: 4,
    },
    {
        id: 9,
        foto: "remera-lanilla.png",
        fotosExtra: ["polera-c2.png","polera-c3.png","polera-c4.png"],
        nombre: "Remera lanilla",
        detalle: "Polera trenzas gruesas y finas Linette",
        precio: 6990,
        colores: ['Verde', 'Azul', 'Rosa', 'Crema'],
        talles: ['M', 'L'],
        tU: 0,
        tS: 0,
        tM: 3,
        tL: 5,
    },
    {
        id: 10,
        foto: 'remera-manga-larga.png',
        fotosExtra: ["polera-c2.png","polera-c3.png","polera-c4.png"],
        nombre: "Remera manga larga",
        detalle: "Polera punto morley con trenza lateral",
        precio: 7690,
        colores: ['Negro', 'Blanca', 'Crema'],
        talles: ['S', 'M', 'L'],
        tU: 0,
        tS: 3,
        tM: 2,
        tL: 1,
    }
];

const controller = {

    product: (req, res) => {
        const prodEncontrado = detalleProd.find(row => row.id == req.params.id)
        if (prodEncontrado) return res.render('productDetail', { detalle: prodEncontrado })
        else return res.send("ERROR 404 NOT FOUND")
    },
    categorias: (req, res) => {
        res.sendFile(path.resolve('./views/categorias.html'))
    },
    probador: (req, res) => {
        res.sendFile(path.resolve('./views/probador.html'))
    },
    altaProducto: (req, res) => {
        return res.render('altaProducto')
    },
    modifProducto: (req, res) => {
        const prodEncontrado = detalleProd.find(row => row.id == req.params.id)
        if (prodEncontrado) return res.render('modifProducto', {detalle: prodEncontrado})
        else return res.send("ERROR 404 NOT FOUND")
    }

};

module.exports = controller;