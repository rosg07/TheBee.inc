document.addEventListener('DOMContentLoaded', () => { // Cuando se carga la página se ejecuta.
    cargarCarrito();

    const botonVaciar = document.getElementById('boton-vaciar'); 
    if (botonVaciar) { // Vacia el carrito.
        botonVaciar.addEventListener('click', () => {
            if(confirm('¿Seguro que quieres vaciar todo el carrito?')) {
                localStorage.removeItem('thebeeinc_carrito');
                cargarCarrito();
                actualizarNumeroCarrito();
            }
        });
    }

    const botonTramitar = document.getElementById('boton-tramitar'); 
    if (botonTramitar) { // Tramita el pedido.
        botonTramitar.addEventListener('click', () => {
            alert('¡Gracias por tu compra! Procederemos con el envío.');
            window.location.href = "index.html";
            localStorage.removeItem('thebeeinc_carrito');
        });
    }
});

function cargarCarrito() { // Función que carga el carrito en la página.
    const lista = document.getElementById('lista-productos-carrito'); 
    const resumen = document.getElementById('resumen-pedido');
    const carrito = JSON.parse(localStorage.getItem('thebeeinc_carrito')) || [];

    lista.innerHTML = '';

    if (carrito.length === 0) { // Si no hay productos.
        
        lista.innerHTML = `
            <div class="mensaje-carrito-vacio">
                <p>Vaya, tu carrito está vacío. :(</p>
                <a href="index.html#productos" class="boton-volver">Ir a Productos</a>
            </div>
        `;
        if (resumen) resumen.style.display = 'none';
        return;
    }

    if (resumen) resumen.style.display = 'block';
    let totalPrecio = 0;

    carrito.forEach((producto, index) => {
        const subtotal = producto.precio * producto.cantidad;
        totalPrecio += subtotal;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-carrito');
        
        itemDiv.innerHTML = `
            <div class="imagen-item">
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </div>
            <div class="info-item">
                <h3>${producto.nombre}</h3>
                <span class="precio-item">${producto.precio.toFixed(2)}€</span>
            </div>
            <div class="controles-item">
                <button onclick="cambiarCantidad(${index}, -1)">-</button>
                <span>${producto.cantidad}</span>
                <button onclick="cambiarCantidad(${index}, 1)">+</button>
            </div>
            <div class="total-item">
                ${subtotal.toFixed(2)}€
            </div>
            <button class="boton-eliminar" onclick="eliminarProducto(${index})">🗑️</button>
        `;

        lista.appendChild(itemDiv);
    });

    const subtotalElem = document.getElementById('subtotal-carrito');
    const totalElem = document.getElementById('total-carrito');
    
    if (subtotalElem) subtotalElem.innerText = totalPrecio.toFixed(2) + '€';
    if (totalElem) totalElem.innerText = totalPrecio.toFixed(2) + '€';
}

window.cambiarCantidad = function(index, delta) { // Función para cambiar el número de productos en el carrito.
    let carrito = JSON.parse(localStorage.getItem('thebeeinc_carrito'));
    
    carrito[index].cantidad += delta;

    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }

    localStorage.setItem('thebeeinc_carrito', JSON.stringify(carrito));
    cargarCarrito();
};

window.eliminarProducto = function(index) { // Funcion para eliminar el producto del carrito.
    let carrito = JSON.parse(localStorage.getItem('thebeeinc_carrito'));
    carrito.splice(index, 1);
    
    localStorage.setItem('thebeeinc_carrito', JSON.stringify(carrito));
    cargarCarrito();
};