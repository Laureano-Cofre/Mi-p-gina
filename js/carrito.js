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
            const productoElemento = document.createElement('div');
            productoElemento.classList.add('productoCarrito');
            productoElemento.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div>
                    <h3>${producto.nombre}</h3>
                    <p>Precio: $${producto.precio}</p>
                    <p>Cantidad: ${producto.cantidad}</p>
                    <button class="btn btn-danger eliminarBtn" data-index="${index}">Eliminar</button>
                </div>
            `;
            carritoProductos.appendChild(productoElemento);
            total += producto.precio * producto.cantidad;
        });

        totalCarrito.textContent = total.toFixed(2);
        actualizarContadorCarrito(); // Asegúrate de llamar esta función aquí
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

    // Función para eliminar un producto del carrito
    function eliminarProducto(index) {
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    }

    // Event listener para los botones de eliminar
    carritoProductos.addEventListener('click', (e) => {
        if (e.target.classList.contains('eliminarBtn')) {
            const index = e.target.getAttribute('data-index');
            eliminarProducto(index);
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
