document.addEventListener('DOMContentLoaded', function() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function actualizarCarrito() {
        const carritoContainer = document.querySelector('.carritoProductos');
        if (carritoContainer) {
            carritoContainer.innerHTML = '';

            let total = 0;

            carrito.forEach(producto => {
                const carritoProducto = document.createElement('div');
                carritoProducto.classList.add('carritoProducto');

                carritoProducto.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.titulo}">
                    <p>${producto.titulo}</p>
                    <p>$${producto.precio}</p>
                `;

                carritoContainer.appendChild(carritoProducto);
                total += producto.precio;
            });

            document.getElementById('totalCarrito').textContent = total.toFixed(2);
        }
        actualizarContadorCarrito(); // Asegúrate de llamar esta función aquí también
    }

    function actualizarContadorCarrito() {
        const carritoCounter = document.getElementById('carrito-counter');
        const carritoLength = carrito.length;
        if (carritoLength > 0) {
            carritoCounter.textContent = carritoLength;
            carritoCounter.style.display = 'inline-block';
        } else {
            carritoCounter.style.display = 'none';
        }
    }

    fetch('./js/productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
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
                    <button class="agregarProducto" data-id="${product.id}">Agregar al carrito</button>
                `;
                
                containerProductos.appendChild(productDiv);
            });

            // Adding event listeners to the buttons
            document.querySelectorAll('.agregarProducto').forEach(button => {
                button.addEventListener('click', event => {
                    const productId = event.target.dataset.id;
                    const selectedProduct = data.find(product => product.id == productId);
                    if (selectedProduct) {
                        carrito.push(selectedProduct);
                        console.log('Producto agregado al carrito:', selectedProduct);
                        console.log('Contenido del carrito:', carrito);
                        localStorage.setItem('carrito', JSON.stringify(carrito));
                        actualizarCarrito(); // Llamamos a la función para actualizar el carrito
                    } else {
                        console.error('Producto no encontrado con ID:', productId);
                    }
                });
            });

            actualizarCarrito();
        })
        .catch(error => console.error('Error fetching data:', error));

    const abrirMenu = document.getElementById('abrir');
    const cerrarMenu = document.getElementById('cerrar');
    const navBar = document.getElementById('navBar');

    abrirMenu.addEventListener('click', () => {
        navBar.classList.add('visible');
    });

    cerrarMenu.addEventListener('click', () => {
        navBar.classList.remove('visible');
    });

    actualizarCarrito();
});

    // Filtrado de productos basado en clic en las imágenes
    const opciones = document.querySelectorAll('.opcion');

    opciones.forEach(opcion => {
        opcion.addEventListener('click', () => {
            const filter = opcion.getAttribute('data-band');

            opciones.forEach(op => {
                if (op.getAttribute('data-band') === filter) {
                    op.style.display = 'flex';
                } else {
                    op.style.display = 'none';
                }
            });
        });
    });
