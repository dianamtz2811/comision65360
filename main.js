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
]

function mostrarLibrosLeidos() {
    let librosLeidos = libros.filter(libro => libro.leido);
    console.log('Libros ya leídos:');
    console.log('-------------------------');

    librosLeidos.forEach(libro => {
        console.log(`Título: ${libro.titulo}`);
        console.log(`Autor: ${libro.autor}`);
        console.log(`Año: ${libro.año}`);
        console.log(`Género: ${libro.genero}`);
        console.log('-------------------------');
    });
}

function mostrarLibrosNoLeidos() {
    let librosNoLeidos = libros.filter(libro => !libro.leido);
    console.log('Libros pendientes por leer:');
    console.log('-------------------------');

    librosNoLeidos.forEach(libro => {
        console.log(`Título: ${libro.titulo}`);
        console.log(`Autor: ${libro.autor}`);
        console.log(`Año: ${libro.año}`);
        console.log(`Género: ${libro.genero}`);
        console.log('-------------------------');
    });
}

function agregarLibro() {
    let titulo = prompt("Ingrese el título del libro:");
    let autor = prompt("Ingrese el autor del libro:");
    let año = prompt("Ingrese el año de publicación del libro:");
    let genero = prompt("Ingrese el género del libro:");
    let leido = confirm("¿Ya lo ha leído?");
    libros.push({
        id: libros.length + 1,
        titulo,
        autor,
        año: parseInt(año),
        genero,
        leido
    })
}

function cambiarStatus () {
    let titulo = prompt("Ingrese el titulo del libro ya leíste:");
    let libro = libros.find(libro => libro.titulo === titulo);
    if (libro) {
        libro.leido = !libro.leido;
        console.log(`El estado de "${titulo}" ha cambiado a ${libro.leido ? 'leído' : 'no leído'}.`);
        } else {
            alert("No existe el libro");
            }
}

function menu() {
    let opcion;
    do {
        opcion = prompt(
            "Bienvenido a mi biblioteca\n" +
            "¿Qué deseas hacer?\n" +
            "1. Mostrar libros leídos\n" +
            "2. Mostrar libros no leídos\n" +
            "3. Agregar un libro\n" +
            "4. Cambiar el status de un libro\n" +
            "5. Salir"
            );

    switch (opcion) {
        case "1":
            mostrarLibrosLeidos();
            break;
        case "2":
            mostrarLibrosNoLeidos();
            break;
        case "3":
            agregarLibro();
            break;
        case "4":
            cambiarStatus();
            break;
        case "5":
            console.log("Adiós");
            break;
        default:
            alert("Por favor, selecciona una opción válida.");
        }
    } while (opcion !== "5");
}

document.getElementById("iniciar").addEventListener("click", function() {
    menu();
});