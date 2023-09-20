window.addEventListener("load",function(){ // sincronizamos el register.js con la vista register.ejs
    
    const titulo = document.querySelector(".tituloCategoria") //capturamos el titulo
    const totalCategorias = document.querySelector(".totalCategorias")
    
    for (i=0;i<=totalCategorias.value;i++){
    const categoria = document.querySelector(".itemsCategorias"+i) //capturamos botones
    
    categoria.addEventListener("click", function(event){
        event.preventDefault();
        categoria.style.backgoundcolor = "red"
        titulo.innerHTML = categoria.innerHTML
        })
    }    
})
    