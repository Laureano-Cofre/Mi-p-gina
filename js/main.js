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




document.addEventListener('DOMContentLoaded', () => {
    fetch('./js/productos.json')
        .then(response => response.json())
        .then(data => {
            const containerProductos = document.querySelector('.containerProductos');
            data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('producto');
                
                productDiv.innerHTML = `
                    <img src="${product.imagen}" alt="${product.titulo}">
                    <h2>${product.titulo}</h2>
                    <p>${product.banda}</p>
                    <p>Precio: $${product.precio}</p>
                `;
                
                containerProductos.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

/* 
let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    }) */


/* function cargarProductos(productosElegidos) {
    containerProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
        <h3 class="producto-titulo">${producto.titulo}</h3>
                <h4 class="producto-banda">${producto.banda}</h4>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}
 */
/* 
    const renderProducts = (products) => {
        const gallery = document.getElementById('product-gallery');
        
        const bands = [...new Set(products.map(product => product.banda))];

        bands.forEach(band => {
            const categoryTitle = document.createElement('div');
            categoryTitle.className = 'category-title';
            categoryTitle.textContent = band;
            gallery.appendChild(categoryTitle);

            const bandProducts = products.filter(product => product.banda === band);
            
            bandProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';

                productCard.innerHTML = `
                    <img src="${product.imagen}" alt="${product.titulo}">
                    <div class="product-details">
                        <div class="product-title">${product.titulo}</div>
                        <div class="product-price">$${product.precio}</div>
                    </div>
                `;
                
                gallery.appendChild(productCard);
            });
        });
    };

    renderProducts(products); */