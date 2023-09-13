if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}
else {
    ready()
}

function ready(){
    if (JSON.parse(localStorage.getItem("carrito")) == null) {
        localStorage.setItem('carrito', JSON.stringify([])
        )
    } 
    mostrarCarrito(localStorage("carrito"))
}
    
    function borrarElemento(id) {
        //necesito traer los prod del localstorage
        let elemento = productos.filter(row => row.id != id)
        //tengo q setear los prod en localStorage
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
        const carritoProd = document.querySelector(".prodCarrito")
        if (productosCarrito.length == 0) {
            carritoProd.innerHTML = `<h2> El carrito esta vacío <a href=/>Compra ahora</a></h2>`
            document.querySelector('detalleCarrito').innerHTML = ``
        } else {
            let subtotal =0
            subtotal +=element.precio
            carritoProd.innerHTML = ``
            carritoProd.forEach(element => {
                carritoProd.innerHTML += `
                <div class="prodCarrito">
                <div class="divFotoCarrito">
                    <img src="/img/${element.foto}" alt="${element.nombre}">
                </div>
                <div class="detalleProdCarrito">
                    <h4>${element.nombre}</h4>
                    <p>$${element.precio}</p>
                    <div>
                        <p>Talle: ${element.talle}</p>
                        <p>Color: ${element.color}</p>
                    </div>
                    <div>
                        <select name="cantidadCarrito" id="cantidadCarrito">
                            <option value=1 selected>Cantidad: 1</option>
                            <option value=2>Cantidad: 2</option>
                            <option value=3>Cantidad: 3</option>
                        </select>
                        <p onClick=borrarElemento(${element.id})>Eliminar</p>
                    </div>
                </div>
            </div>`
            
            });
            /*document.querySelector('detalleCarrito').innerHTML =
            `<div class="preciosCarrito">
                        <h4>${element.nombre}</h4>
                        <p class="preciosResumenCarrito">Precio</p>
                        <p class="pesosResumenCarritos">$ ${element.precio}</p>
                    </div>
                    <div class="total">
                        <h4>Total</h4>
                        <p>$ ${subtotal}</p>
                    </div>
                </div>
                <div class="botonesCarrito">
                    <form action="#" method="get">
                        <button class="botonPagar onClick=crearCompra" type="submit">Ir a pagar</button>
                    </form>
                    <form action="/products" method="get">
                        <button class="botonSeguir " type="submit">Seguir comprando</button>
                    </form>
                    <button class="botonSeguir" onClick=vaciarCarrito()>Vaciar Carrito</button>
                </div>`*/
        }
    }

  