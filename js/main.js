let libros = [];

//Mensajes de Bievenida
const mensajes = [
    "¡Bienvenido! ¿Qué vas a leer hoy?",
    "¡Hola! Comienza la aventura literaria",
    "¡Hola! ¿Qué se te antoja leer hoy?"
];

//Mostrar/ocultar calculadora
document.getElementById("mostrarCalculadora").addEventListener("click", function() {
    const calculadora = document.getElementById("calculadoraTiempoLectura");
    calculadora.style.display = calculadora.style.display === "none" ? "block" : "none";
});

//Calcular el tiempo de lectura
document.getElementById("calcularTiempo").addEventListener("click", function() {
    const paginasLibro = parseInt(document.getElementById("paginasLibro").value);
    const paginasDia = parseInt(document.getElementById("paginasDia").value);

    if (isNaN(paginasLibro) || isNaN(paginasDia) || paginasLibro <= 0 || paginasDia <= 0) {
        document.getElementById("resultadoTiempo").textContent = "Por favor, ingresa datos válidos";
        return;
    }

    const diasNecesarios = Math.ceil(paginasLibro / paginasDia);
    document.getElementById("resultadoTiempo").textContent = `Para terminar de leer este libro necesitas ${diasNecesarios} días.`;
});

//Cargar libros del localStorage
document.addEventListener("DOMContentLoaded", () => {
    cargarLibros();
    document.getElementById("mensaje").innerText = mensajes[Math.floor(Math.random() * mensajes.length)];
});

//Función para notificaciones de Toastify
function mostrarNotificacion(mensaje, tipo = "éxito") {
    const backgroundColor = tipo === "éxito"
    ? "linear-gradient(to right, #00b09b, #96c93d)"
    : "linear-gradient(to right, #ff5f6d, #ffc371)";

    Toastify({
        text: mensaje,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
            background: backgroundColor,
        },
        stopOnFocus: true
    }).showToast();
}

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
                mostrarNotificacion("Libros cargados correctamente");
            })
            .catch(error => {
                console.error("Error al cargar los libros", error);
                mostrarNotificacion("Error al cargar los libros", "error");
            });
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

        //Botón para eliminar libro
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "❌";
        botonEliminar.classList.add("btn-eliminar");
        botonEliminar.addEventListener("click", () => eliminarLibro(libro.id));

        let titulo = document.createElement("h3");
        titulo.textContent = libro.titulo;

        let autor = document.createElement("p");
        autor.innerHTML = `<strong>Autor:</strong> ${libro.autor}`;

        let año = document.createElement("p");
        año.innerHTML = `<strong>Año:</strong> ${libro.año}`;

        let genero = document.createElement("p");
        genero.innerHTML = `<strong>Género:</strong> ${libro.genero}`;

        let estado = document.createElement("p");
        estado.innerHTML = `<strong>Estado:</strong> ${libro.leido ? "Leído" : "No leído"}`;

        let botonEstado = document.createElement("button");
        botonEstado.textContent = "Cambiar estado";
        botonEstado.addEventListener("click", () => cambiarStatus(libro.id));


        libroElemento.append(botonEliminar, titulo, autor, año, genero, estado, botonEstado);
        listaLibros.appendChild(libroElemento);
    });
}

//Funcion para eliminar un libro
function eliminarLibro(id) {
    libros = libros.filter(libro => libro.id !== id);
    guardarLibros();
    mostrarLibros();
    mostrarNotificacion("Libro eliminado correctamente.", "error");
}

//Función para cambiar el status de un libro
function cambiarStatus(id) {
    let libro = libros.find(libro => libro.id === id);
    if (libro) {
        libro.leido = !libro.leido;
        guardarLibros();
        mostrarLibros();
        mostrarNotificacion(`El libro: "${libro.titulo}" ha sido marcado como ${libro.leido ? "leído" : "no leído"}`)
    }
}

//Mostrar u ocultar ek formulario
document.getElementById("mostrarFormulario").addEventListener("click", function() {
    let formulario = document.getElementById("formularioLibro");
    formulario.style.display = formulario.style.display === "none" ? "block" : "none";
});

//Manejo del envío del formulario
document.getElementById("formularioLibro").addEventListener("submit", function(event) {
    event.preventDefault();

    //Obtener los datos del formulario
    let titulo = document.getElementById("titulo").value.trim();
    let autor = document.getElementById("autor").value.trim();
    let año = parseInt(document.getElementById("año").value.trim());
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

