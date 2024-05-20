// Obtener elementos del DOM
const abrirMenuBtn = document.getElementById('abrir');
const cerrarMenuBtn = document.getElementById('cerrar');
const navBar = document.getElementById('navBar');

// Función para abrir el menú
function abrirMenu() {
    navBar.classList.add('visible');
}

// Función para cerrar el menú
function cerrarMenu() {
    navBar.classList.remove('visible');
}

// Event listeners para abrir y cerrar el menú
abrirMenuBtn.addEventListener('click', abrirMenu);
cerrarMenuBtn.addEventListener('click', cerrarMenu);




let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })