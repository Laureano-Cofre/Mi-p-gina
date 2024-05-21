document.addEventListener("DOMContentLoaded", () => {
    const carritoProductos = document.querySelector('.carritoProductos');
    const totalCarrito = document.getElementById('totalCarrito');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // Obtener el carrito del localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Función para actualizar el carrito en la interfaz
    function actualizarCarrito() {
        carritoProductos.innerHTML = '';
        let total = 0;
        
        carrito.forEach(producto => {
            const productoElemento = document.createElement('div');
            productoElemento.classList.add('productoCarrito');
            productoElemento.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div>
                    <h3>${producto.nombre}</h3>
                    <p>Precio: $${producto.precio}</p>
                    <p>Cantidad: ${producto.cantidad}</p>
                </div>
            `;
            carritoProductos.appendChild(productoElemento);
            total += producto.precio * producto.cantidad;
        });

        totalCarrito.textContent = total.toFixed(2);
    }

    // Inicializar el carrito
    actualizarCarrito();
});
