window.addEventListener("load",function(){ // sincronizamos el register.js con la vista register.ejs
    
    const formulario = document.querySelector(".formularioUser") //capturmamos el formulario
    formulario.addEventListener("submit", function(event){

    event.preventDefault();
        
    const nombre = document.querySelector("#nombre")
    const apellido = document.querySelector("#apellido")
    const email = document.querySelector("#email")
    const fotoRegis = document.querySelector("#fotoRegistro")
    const contraseña = document.querySelector("#Contraseña")
    const confirmarContr = document.querySelector("#confirmarContraseña")
    const noSoyRobot = document.querySelector("#noSoyUnRobot")
    
    const errores = [];
    const msjError = document.getElementById("errores")

    if(nombre.value == ""){
        errores.push("debe completar el campo nombre")
    }else if (nombre.value.length < 2){
        errores.push("debe tener al menos 2 caracteres")
    }
    if(apellido.value == ""){
        errores.push("debe completar el campo apellido")
    }else if(apellido.value.length < 2){
        errores.push("debe tener al menos 2 caracteres")
    }
    if(email.value == ""){
        errores.push("debe completar el campo email")
    }else if(email.value.length){
        errores.push("debe indicar un emal validoo")
    }
    if(contraseña.value == ""){
        errores.push("debe comppletar el campo contraseña")
    }else if(contraseña.value.length < 8){
        errores.push("debe completar con al menos 8 digitos, una mayuscula y un numero")
    }
    if(confirmarContr.value.length == ""){
        errores.push("debe completar el campo confirmar contraseña")
    }else if(confirmarContr.value.length != confirmarContr.value.length){
        errores.push("deben coincidir las contraceñas")
    }
    if(noSoyRobot == ""){
        errores.push("debe marcar la opcion")
    }

        if (errores.length > 0){

            msjError.innerHTML = ` `
            for ( let error of errores){
                msjError.innerHTML += `<li>${error}</li>`
            }
        } else {
            form.submit()
        }
    })

});

