window.addEventListener("load",function(){ 
    
    const formulario = document.querySelector(".formularioUser") //capturmamos el formulario
    formulario.addEventListener("submit", function(event){

    event.preventDefault();
        
    const email = document.querySelector("#email")
    const contraseña = document.querySelector("#Contraseña")
    const confirmarContr = document.querySelector("#confirmarContraseña")
    
    const errores = [];
    const msjError = document.getElementById("errores")

    if(email.value == ""){
        errores.push("debe completar el campo email")
    }else if(email.value.length){
        errores.push("debe indicar un emal validoo")
    }
    if(contrasenia.value == ""){
        errores.push("debe comppletar el campo contraseña")
    }else if(contraseña.value.length < 8){
        errores.push("debe completar con al menos 8 digitos, una mayuscula y un numero")
    }
    if(confirmarContr.value.length == ""){
        errores.push("debe completar el campo confirmar contraseña")
    }else if(confirmarContr.value.length != confirmarContr.value.length){
        errores.push("deben coincidir las contraceñas")
    }
    
        if (errores.length > 0){

            msjError.innerHTML = ` `
            for ( let error of errores){
                msjError.innerHTML += `<li>${error}</li>`
            }
        } else {
            formulario.submit()
        }
    })

});

