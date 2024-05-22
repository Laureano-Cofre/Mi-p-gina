document.addEventListener("DOMContentLoaded", function() {
    const carritoProductos = document.querySelector('.carritoProductos');
    const totalCarrito = document.getElementById('totalCarrito');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // Obtener el carrito del localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Función para actualizar el carrito en la interfaz
    function actualizarCarrito() {
        carritoProductos.innerHTML = '';
        let total = 0;

        carrito.forEach((producto, index) => {
            // Verificar si la propiedad cantidad está definida
            if (typeof producto.cantidad === 'undefined') {
                producto.cantidad = 1; // Asignar un valor por defecto si no está definida
            }

            const productoElemento = document.createElement('div');
            productoElemento.classList.add('productoCarrito');
            productoElemento.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.titulo}">
                <div>
                    <h3>${producto.titulo}</h3>
                    <p>${producto.banda}</p>
                    <p>Precio: $${producto.precio.toFixed(2)}</p>
                    <p>Cantidad: ${producto.cantidad}</p>
                    <button class="btn btn-danger eliminarBtn" data-id="${producto.id}">Eliminar</button>
                </div>
            `;
            carritoProductos.appendChild(productoElemento);
            total += producto.precio * producto.cantidad;
        });

        totalCarrito.textContent = total.toFixed(2);
        actualizarContadorCarrito();
    }

    function actualizarContadorCarrito() {
        const carritoCounter = document.getElementById('carrito-counter');
        const totalCantidad = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        if (totalCantidad > 0) {
            carritoCounter.textContent = totalCantidad;
            carritoCounter.style.display = 'inline-block';
        } else {
            carritoCounter.style.display = 'none';
        }
    }

    // Función para eliminar un producto del carrito
    function eliminarProducto(id) {
        const index = carrito.findIndex(product => product.id == id);
        if (index > -1) {
            carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCarrito();
        }
    }

    // Event listener para los botones de eliminar
    carritoProductos.addEventListener('click', (e) => {
        if (e.target.classList.contains('eliminarBtn')) {
            const id = e.target.getAttribute('data-id');
            eliminarProducto(id);
        }
    });

    // Event listener para el botón de finalizar compra
    checkoutBtn.addEventListener('click', () => {
        alert('Compra finalizada');
        localStorage.removeItem('carrito');
        carrito.length = 0; // Vaciar el array del carrito
        actualizarCarrito();
    });

    // Inicializar el carrito
    actualizarCarrito();
});
