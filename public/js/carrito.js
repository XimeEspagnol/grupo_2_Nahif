if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

function ready(){
    console.log(localStorage.getItem("carrito"));
    if (JSON.parse(localStorage.getItem("carrito")) == null) {
        localStorage.setItem('carrito', JSON.stringify([])
        )
    } 
    let productos=JSON.parse(localStorage.getItem("carrito"))
    mostrarCarrito(productos)
}
    
    function borrarElemento(id) {
        let productos=JSON.parse(localStorage.getItem("carrito"))
        let elemento = productos.filter(row => row.id != id)
        productos=localStorage.setItem('carrito', JSON.stringify(elemento))
        document.querySelector('.mostrarCarrito').innerHTML = ``
            document.querySelector('.mostrarTotal').innerHTML = ``
        mostrarCarrito(elemento)
    }
    function vaciarCarrito(){
        localStorage.setItem('carrito', JSON.stringify([]))
        mostrarCarrito([])
    }async function finalizarCompra(){
        let data = {
            total: productos.reduce((acum,current) => acum +current.precio, 0),
            productos: productos
        }
        let finalizarFetch = await fetch('/carrito/finalizar',{
            method: 'POST',
            headers: {'Content-Type': 'application/json' }, 
            body: JSON.stringify(data)})
        let response = await finalizarFetch.json()
    }

    function mostrarCarrito(productosCarrito) {
        const carritoProd = document.querySelector(".mostrarCarrito")
        const mensajeVacio = document.querySelector(".mensajeVacio")
        if (productosCarrito.length == 0) {
            mensajeVacio.innerHTML = `<h2 class="mensajeCarritoVacio"> El carrito esta vacío <a href=/>Compra ahora</a></h2>`
            document.querySelector('.mostrarCarrito').innerHTML = ``
            document.querySelector('.mostrarTotal').innerHTML = ``
        } else {
            let subtotal =0
            let cantProd=0
            //carritoProd.innerHTML = ``
            productosCarrito.forEach(element => {
                subtotal += parseInt(element.precio*element.cantidad)
                cantProd += parseInt(element.cantidad)
                carritoProd.innerHTML += `
                <div class="prodCarrito">
                <div class="divFotoCarrito">
                    <img class="imagenCarrito" src="../img/${element.imagen}" alt="${element.nombre}">
                </div>
                <div class="detalleProdCarrito">
                    <h4 class="nombreCarrito">${element.nombre}</h4>
                    <p class="precioCarrito">$${element.precio}</p>
                    <div>
                        <p class="tallesCarrito"> ${element.talle}</p>
                        <p class="colorCarrito">Color: ${element.color}</p>
                    </div>
                    <div>
                        <p class="cantidadCarrito">Cantidad: ${element.cantidad}
                        <button type=submit onClick=borrarElemento(${element.id})>Eliminar</button>
                    </div>
                </div>
                `
            
            document.querySelector('.mostrarTotal').innerHTML =
            `
            <h3>Resumen del pedido</h3>
            <div class="detalleCarrito">
            
                <div class="total">
                        <h4>Cantidad de Productos:</h4>
                        <p >${cantProd}</p>
                </div>
                <div class="total">
                        <h4>Total</h4>
                        <p>$ ${subtotal}</p>
                </div>
            </div>
                <div class="botonesCarrito">
                    <form action="/products/compra" method="get">
                        <button class="botonPagar onClick=crearCompra" type="submit">Ir a pagar</button>
                    </form>
                    <form action="/products" method="get">
                        <button class="botonSeguir " type="submit">Seguir comprando</button>
                    </form>
                    <button class="botonSeguir" onClick=vaciarCarrito()>Vaciar Carrito</button>
                </div>
            `
            })
        }
    }

  