let libros = [
    {
        id: 1,
        titulo: "Estas ruinas que ves",
        autor: "Jorge Ibargüengoitia",
        año: 1975,
        genero: "Novela",
        leido: false
    },

    {
        id: 2,
        titulo: "El laberinto de la soledad",
        autor: "Octavio Paz",
        año: 1950,
        genero: "Ensayo",
        leido: false
    },

    {
        id: 3,
        titulo: "El amor en los tiempos del cólera",
        autor: "Gabriel García Márquez",
        año: 1985,
        genero: "Novela",
        leido: true
    },

    {
        id: 4,
        titulo: "La casa de los espíritus",
        autor: "Isabel Allende",
        año: 1982,
        genero: "Novela",
        leido: false
    },

    {
        id: 5,
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        año: 1967,
        genero: "Novela",
        leido: true
    }
];

//Mensajes de Bievenida
const mensajes = [
    "¡Bienvendo! ¿Qué vas a leer hoy?",
    "¡Hola! Comienza la aventura literaria",
    "¡Hola! ¿Qué se te antoja leer hoy?"
];

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("mensaje").innerText = mensajes[Math.floor(Math.random() * mensajes.length)];
    mostrarLibros();
});

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

function agregarLibro() {
    let titulo = prompt("Ingresa el título del libro:").trim();
    let autor = prompt("Ingresa el autor del libro:").trim();
    let año = parseInt(prompt("Ingresa el año del libro:").trim());
    let genero = prompt("Ingresa el género del libro:").trim();
    let leido = confirm("¿Ya lo leíste?");

    if (titulo && autor && !isNaN(año) && genero) {
        libros.push({ id:libros.length + 1, titulo, autor, año, genero, leido });
        mostrarLibros();
    } else {
        alert("Por favor, ingresa los datos válidos.")
    }
}

function cambiarStatus(id) {
    let libro = libros.find(libro => libro.id === id);
    if (libro) {
        libro.leido = !libro.leido;
        mostrarLibros();
    }
}

document.getElementById("iniciar").addEventListener("click", agregarLibro);
