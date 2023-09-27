if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}
function ready(){

    if (JSON.parse(localStorage.getItem("carrito"))==null){
        localStorage.setItem('carrito', JSON.stringify([]))
    }
    let botonCarrito = document.querySelector('.botonPagar')
    botonCarrito.addEventListener("click", agregarItem)
}
function agregarItem(){
    let regex = /\/products\/detail\/(\d+)/
    let almacenarUrl = window.location.href 
    let productosCarrito = JSON.parse(localStorage.getItem("carrito"))
    console.log(productosCarrito);
    let productoAgregado = {
        id: almacenarUrl.match(regex)[1],
        nombre: document.querySelector(".nombreProdMedia h3").innerText,
        talle: document.querySelector(".talles").innerText,
        precio: document.querySelector(".nombreProdMedia p").innerText.replace("$ ", ""),
        color: document.querySelector(".colores").value,
        cantidad: document.querySelector(".cantidadCarrito").value,
        imagen: document.querySelector(".imagenPrincipal").alt

    }
    console.log(productoAgregado);
    if(productosCarrito.length == 0){
        productoAgregado.cantidad = parseInt(document.querySelector(".cantidadCarrito").value)
        productoAgregado.subTotal = productoAgregado.cantidad*productoAgregado.precio
        productosCarrito.push(productoAgregado)
    }
    else{
        let buscarProducto = productosCarrito.find(producto => producto.id == productoAgregado.id)
        if(buscarProducto){
            buscarProducto.cantidad += parseInt(document.querySelector(".cantidadCarrito").value)
            buscarProducto.subTotal = buscarProducto.cantidad*productoAgregado.precio
        }
        else{
        productoAgregado.cantidad = parseInt(document.querySelector(".cantidadCarrito").value)
        productoAgregado.subTotal = productoAgregado.cantidad*productoAgregado.precio
        productosCarrito.push(productoAgregado)
        }
    }
    console.log(productosCarrito);
    localStorage.setItem("carrito", JSON.stringify(productosCarrito))
    console.log(localStorage.carrito);
}
