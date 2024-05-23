document.addEventListener("DOMContentLoaded", function() {
    const carritoProductos = document.querySelector('.carritoProductos');
    const totalCarrito = document.getElementById('totalCarrito');
    const checkoutBtn = document.getElementById('checkoutBtn');

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function mostrarNotificacion(mensaje) {
        const contenedor = document.getElementById('notification-container');
        const notificacion = document.createElement('div');
        notificacion.className = 'notification';
        notificacion.textContent = mensaje;

        contenedor.appendChild(notificacion);

        setTimeout(() => {
            notificacion.classList.add('show');
        }, 10);

        setTimeout(() => {
            notificacion.classList.remove('show');
            notificacion.addEventListener('transitionend', () => {
                notificacion.remove();
            });
        }, 3000);
    }

    function actualizarCarrito() {
        carritoProductos.innerHTML = '';
        let total = 0;

        carrito.forEach((producto, index) => {
            if (typeof producto.cantidad === 'undefined') {
                producto.cantidad = 1;
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

    function eliminarProducto(id) {
        const index = carrito.findIndex(product => product.id == id);
        if (index > -1) {
            carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCarrito();
            mostrarNotificacion('Producto eliminado del carrito');
        }
    }

    carritoProductos.addEventListener('click', (e) => {
        if (e.target.classList.contains('eliminarBtn')) {
            const id = e.target.dataset.id;
            eliminarProducto(id);
        }
    });

    checkoutBtn.addEventListener('click', () => {
        alert('¡Gracias por tu compra!');
        carrito.length = 0;
        localStorage.removeItem('carrito');
        actualizarCarrito();
    });

    actualizarCarrito();
});
