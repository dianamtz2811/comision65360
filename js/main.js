let libros = [];

//Mensajes de Bievenida
const mensajes = [
    "¡Bienvenido! ¿Qué vas a leer hoy?",
    "¡Hola! Comienza la aventura literaria",
    "¡Hola! ¿Qué se te antoja leer hoy?"
];

//Cargar libros del localStorage
document.addEventListener("DOMContentLoaded", () => {
    cargarLibros();
    document.getElementById("mensaje").innerText = mensajes[Math.floor(Math.random() * mensajes.length)];
});

//Función para cargar los libros del localStorage
function cargarLibros() {
    const librosGuardados = localStorage.getItem("libros");
    if (librosGuardados) {
        libros = JSON.parse(librosGuardados);
    } else {
        fetch("libros.json")
            .then(response => response.json())
            .then(data => {
                libros.push(...data);
                guardarLibros();
                mostrarLibros();
            })
            .catch(error => console.error("Error al cargar los libros", error));
    }
    mostrarLibros();
}

//Función para guardar los libros en el localStorag
function guardarLibros() {
    localStorage.setItem("libros", JSON.stringify(libros));
}

//Función para mostrar los libros en la página
function mostrarLibros() {
    let listaLibros = document.getElementById("listaLibros");
    listaLibros.innerHTML = "";

    libros.forEach(libro => {
        let libroElemento = document.createElement("div");
        libroElemento.classList.add("libro");
        libroElemento.innerHTML = `
        <h3>${libro.titulo}</h3>
        <p><strong>Autor:</strong> ${libro.autor}</p>
        <p><strong>Año:</strong> ${libro.año}</p>
        <p><strong>Genero:</strong> ${libro.genero}</p>
        <p><strong>Leido:</strong> ${libro.leido ? "Leído" : "No leído"}</p>
        <button onclick="cambiarStatus(${libro.id})">Cambiar estado </button> 
        `;
        listaLibros.appendChild(libroElemento);
    });
}

//Función para cambiar el status de un libro
function cambiarStatus(id) {
    let libro = libros.find(libro => libro.id === id);
    if (libro) {
        libro.leido = !libro.leido;
        guardarLibros();
        mostrarLibros();
    }
}

//Evento para agregar un libro
document.getElementById("iniciar").addEventListener("click", function() {
    document.getElementById("formularioLibro").style.display = "block";
});

//Manejo del envío del formulario
document.getElementById("formularioLibro").addEventListener("submit", function(event) {
    event.preventDefault();

    //Obtener los datos del formulario
    let titulo = document.getElementById("titulo").value.trim();
    let autor = document.getElementById("autor").value.trim();
    let año = document.getElementById("año").value.trim();
    let genero = document.getElementById("genero").value.trim();
    let leido = document.getElementById("leido").checked;

    //Validar datos
    if (titulo && autor && !isNaN(año) && genero) {
        libros.push({ id:libros.length + 1, titulo, autor, año, genero, leido });
        guardarLibros();
        mostrarLibros();
        document.getElementById("formularioLibro").reset();
        document.getElementById("formularioLibro").style.display = "none";
    } else {
        alert("Por favor, ingresa datos válidos");
    }
});

//Mostrar u ocultar ek formulario
document.getElementById("mostrarFormulario").addEventListener("click", function() {
    let formulario = document.getElementById("formularioLibro");
    formulario.style.display = formulario.style.display === "none" ? "block" : "none";
});




