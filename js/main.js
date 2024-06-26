document.addEventListener('DOMContentLoaded', function() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let productos = [];

    function mostrarNotificacion(mensaje) {
        const contenedor = document.getElementById('notification-container');
        const notificacion = document.createElement('div');
        notificacion.className = 'notification';
        notificacion.textContent = mensaje;

        contenedor.appendChild(notificacion);

        // Mostrar la notificación
        setTimeout(() => {
            notificacion.classList.add('show');
        }, 10);

        // Ocultar y eliminar la notificación después de 3 segundos
        setTimeout(() => {
            notificacion.classList.remove('show');
            notificacion.addEventListener('transitionend', () => {
                notificacion.remove();
            });
        }, 3000);
    }

    function actualizarCarrito() {
        const carritoContainer = document.querySelector('.carritoProductos');
        if (carritoContainer) {
            carritoContainer.innerHTML = '';

            let total = 0;

            carrito.forEach(producto => {
                const carritoProducto = document.createElement('div');
                carritoProducto.classList.add('productoCarrito');

                carritoProducto.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.titulo}">
                    <p>${producto.titulo}</p>
                    <p>Precio: $${producto.precio}</p>
                    <p>Cantidad: ${producto.cantidad}</p>
                    <button class="btn btn-danger eliminarBtn" data-id="${producto.id}">Eliminar</button>
                `;

                carritoContainer.appendChild(carritoProducto);
                total += producto.precio * producto.cantidad;
            });

            document.getElementById('totalCarrito').textContent = total.toFixed(2);
        }
        actualizarContadorCarrito();
    }

    function actualizarContadorCarrito() {
        const carritoCounter = document.getElementById('carrito-counter');
        const carritoLength = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        if (carritoLength > 0) {
            carritoCounter.textContent = carritoLength;
            carritoCounter.style.display = 'inline-block';
        } else {
            carritoCounter.style.display = 'none';
        }
    }

    function mostrarProductos(productosFiltrados) {
        const containerProductos = document.querySelector('.containerProductos');
        containerProductos.innerHTML = '';
        productosFiltrados.forEach(product => {
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

        document.querySelectorAll('.agregarProducto').forEach(button => {
            button.addEventListener('click', event => {
                const productId = event.target.dataset.id;
                const selectedProduct = productos.find(product => product.id == productId);
                if (selectedProduct) {
                    const existingProduct = carrito.find(product => product.id == selectedProduct.id);
                    if (existingProduct) {
                        existingProduct.cantidad += 1;
                    } else {
                        selectedProduct.cantidad = 1;
                        carrito.push(selectedProduct);
                    }
                    console.log('Producto agregado al carrito:', selectedProduct);
                    console.log('Contenido del carrito:', carrito);
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    actualizarCarrito();
                    mostrarNotificacion('Producto agregado al carrito');
                } else {
                    console.error('Producto no encontrado con ID:', productId);
                }
            });
        });
    }

    fetch('./js/productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            productos = data;
            mostrarProductos(productos);
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

    const opciones = document.querySelectorAll('.opcion');

    opciones.forEach(opcion => {
        opcion.addEventListener('click', () => {
            const filter = opcion.getAttribute('data-band');
            const productosFiltrados = productos.filter(product => product.banda === filter);
            mostrarProductos(productosFiltrados);
        });
    });

    const mostrarTodos = document.getElementById('mostrarTodos');
    mostrarTodos.addEventListener('click', () => {
        mostrarProductos(productos);
    });

    // Código del carrusel
    const slides = document.querySelectorAll('.carousel-slide img');
    let currentIndex = 0;

    function showSlide(index) {
        const totalSlides = slides.length;
        if (index >= totalSlides) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = totalSlides - 1;
        } else {
            currentIndex = index;
        }
        const offset = -currentIndex * 100;
        document.querySelector('.carousel-slide').style.transform = `translateX(${offset}%)`;
    }

    setInterval(() => {
        showSlide(currentIndex + 1);
    }, 4000);

    showSlide(currentIndex);
});
