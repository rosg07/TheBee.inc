document.addEventListener('DOMContentLoaded', () => { // Cuando se carga la página se ejecuta.

    const inputCantidad = document.getElementById('cantidad');
    const btnAnadir = document.querySelector('.añadir');

    if (btnAnadir && inputCantidad) {
        
        btnAnadir.addEventListener('click', () => {

            let rutaImagen = btnAnadir.getAttribute('data-imagen');

            if (rutaImagen.includes('../IMG/')) {
                rutaImagen = rutaImagen.replace('../IMG/', 'IMG/');
            }
            if (rutaImagen.includes('../../IMG/')) {
                rutaImagen = rutaImagen.replace('../../IMG/', 'IMG/');
            }

            const producto = {
                nombre: btnAnadir.getAttribute('data-nombre'),
                precio: parseFloat(btnAnadir.getAttribute('data-precio')),
                imagen: rutaImagen, 
                cantidad: parseInt(inputCantidad.value) || 1
            };

            agregarAlCarrito(producto);
        });
    }
});

function agregarAlCarrito(productoNuevo) { // Función para agregar X producto al carrito.

    let carrito = JSON.parse(localStorage.getItem('thebeeinc_carrito')) || [];
    
    const existe = carrito.find(item => item.nombre === productoNuevo.nombre);

    if (existe) { // Si el producto se ha añadido antes, se le suma la nueva cantidad, si no, se introduce el producto con la cantidad definida en origen.
        existe.cantidad += productoNuevo.cantidad;
    } else {
        carrito.push(productoNuevo);
    }

    localStorage.setItem('thebeeinc_carrito', JSON.stringify(carrito));
    
    alert(`¡Producto añadido! Tienes ${productoNuevo.cantidad}x ${productoNuevo.nombre} en la cesta.`);
    
}