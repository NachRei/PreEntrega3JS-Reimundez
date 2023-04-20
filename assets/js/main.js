//DECLARACION DE CONSTANTES

const   receta = document.querySelector("#receta"),
        autor = document.querySelector("#autor"),
        ingredientes = document.querySelector("#ingredientes"),
        pasos = document.querySelector("#pasos"),
        search = document.querySelector("#search"),
        contenidoDinamico =  document.querySelector("#contDinamic"),
        formReceta = document.querySelector("#formReceta");       
const recetasActuales = [
    {
        receta: "Torta",
        autor: "Ignacio",
        ingredientes: "leche, huevos, harina, royal",
        pasos: "mezclar todo",
    }
];
let recetas = JSON.parse(localStorage.getItem("recetasActuales")) || recetasActuales;

//DECLARACION DE FUNCIONES

//Función constructora 

function recetaNueva (nombre, autor, ingredientes, pasos){
  this.nombre = nombre;
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
    contenidoDinamico.innerHTML = "";
    const card = "";
    for (const obj of arr) {
        const {newReceta, newAutor, newIngre, newPasos} = obj;
        card = `<div class="tarjeta">
                    <h3 class="tarjetaTitle">${newReceta}</h3>
                    <p class="tarjetaAutor">${newAutor}</p><br>
                    <p class="tarjetaIngre">${newIngre}</p><br>
                    <p class="tarjetaPasos">${newPasos}</p><br>
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

formInventario.addEventListener("submit", (e) => {
    e.preventDefault();
    const newRecet = new recetaNueva(
        receta.value,
        autor.value,
        ingredientes.value,
        pasos.value,
    );
    agregar(recetas, recetaNueva);
    AddLocSto(recetas);
    crearTarjeta(recetas);
    formInventario.reset()
});

//Escucho campo de busqueda

search.addEventListener("input", () => {
    let filtro = filtrar(recetas, search.value);
    crearTarjeta(filtro);
});