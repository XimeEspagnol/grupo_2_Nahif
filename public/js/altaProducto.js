window.addEventListener("load", function(){
    let formulario = document.querySelector('.altaProducto')

    formulario.addEventListener("submit", function(e){
        e.preventDefault();

        const errores = [];
        const erroresLista = document.querySelector('#errores');

        const campoNombre = document.querySelector("#nombreProdAlta");
        if (campoNombre.value == ""){
            errores.push('Debe completar con un nombre de producto')
        } else if (campoNombre.value.length < 5){
            errores.push('Debe tener al menos 5 caracteres')
        }

        const campoDetalle = document.querySelector("#descProdAlta");
        if (campoDetalle.value == ""){
            errores.push('Debe completar con una descripción de producto')
        } else if (campoNombre.value.length < 20){
            errores.push('Debe tener al menos 20 caracteres')
        }

        const campoColores = document.querySelector('#coloresProdAlta');
        if (campoColores.value == ""){
            errores.push('Debe seleccionar al menos 1 color')
        }

        const campoStock = document.querySelector('#stock');
        if (campoStock.value < 0){
            errores.push('El stock tiene que ser 0 o más')
        }

        const campoPrecio = document.querySelector('#precioProdAlta');
        if (campoPrecio.value <= 0){
            errores.push('Debe ingresar un precio para el producto')
        }

        if (errores.length > 0){

            erroresLista.innerHTML = ` `
            for ( let error of errores){
                erroresLista.innerHTML += `<li>${error}</li>`
            }
        } else {
            erroresLista.innerHTML = ` `
            Swal.fire (
                'Producto creado con éxito!',
                'success'
            )
            .then (()=>{formulario.submit()})
        }
    })
})