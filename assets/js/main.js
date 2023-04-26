//DECLARACION DE CONSTANTES

const   receta = document.querySelector("#receta"),
        autor = document.querySelector("#autor"),
        ingredientes = document.querySelector("#ingredientes"),
        pasos = document.querySelector("#pasos"),
        search = document.querySelector("#search"),
        contenidoDinamico =  document.querySelector("#contDinamic"),
        formReceta = document.querySelector("#formRecetas"), 
        boton = document.querySelector("#btnSubmit");
        console.log(formReceta);      
        console.log(receta);
        console.log(autor);
        console.log(ingredientes);
        console.log(pasos);
        console.log(search);
        console.log(contenidoDinamico);
        console.log(boton);
let recetasActuales = [
    {
        receta: "Torta",
        autor: "Ignacio",
        ingredientes: "leche, huevos, harina, royal",
        pasos: "mezclar todo",
    },
    {
        receta: "Pasta",
        autor: "Matias",
        ingredientes: "huevos, harina, royal",
        pasos: "mezclar",
    }
];
let recetas = JSON.parse(localStorage.getItem("recetasActuales")) || recetasActuales;

//DECLARACION DE FUNCIONES

//Función constructora 

function recetaNueva (receta, autor, ingredientes, pasos){
  this.receta = receta;
  this.ingredientes = ingredientes;
  this.pasos = pasos;
  autor == "" ? (this.autor = "Anónimo") :  (this.autor = autor)
}

// Función agregar al LocalStorage

function AddLocSto(arr) {
    localStorage.setItem("recetasActuales", JSON.stringify(arr));
}

// Función filtrar

function filtrar(arr, filtro) {
    return arr.filter((el)=>{
      return el.includes(filtro.toLowerCase()) 
    })
}

// Función crear tarjetas en el DOM

function crearTarjeta (arr){
    console.log(arr);
    contenidoDinamico.innerHTML = "";
    let card = "";
    for (let obj of arr) {
        console.log(obj);
        //const {receta,autor,ingredientes,pasos} = obj;
        //const receta = obj[0];
        //const autor = obj[1];
        //const ingredientes = obj[2];
        //const pasos = obj[3];
        
        card = `<div class="tarjeta">
                    <h3 class="tarjetaTitle">${receta}</h3>
                    <p class="tarjetaAutor">${autor}</p><br>
                    <p class="tarjetaIngre">${ingredientes}</p><br>
                    <p class="tarjetaPasos">${pasos}</p><br>
                    <button type="button" class="tarjeta-btn">Ver Completo</button>
                </div>`;
        contenidoDinamico.innerHTML += card;
    }
}

// Función agregar receta

function agregar(arr, recetasNew) {
    arr.push(recetasNew);
  }

//FUNCIONALIDADES DEL SISTEMA

// Invoco crear tarjeta

crearTarjeta(recetas);

// Escucho botón submit
console.log(formReceta); 
formReceta.addEventListener("submit", (e) => {
    e.preventDefault();
    let newRecet = new recetaNueva(
        receta.value,
        autor.value,
        ingredientes.value,
        pasos.value,
    );
    agregar(recetas, newRecet);
    AddLocSto(recetas);
    crearTarjeta(recetas);
    formReceta.reset();
});

//Escucho campo de busqueda

search.addEventListener("input", () => {
    let filtro = filtrar(recetas, search.value);
    crearTarjeta(filtro);
}); 