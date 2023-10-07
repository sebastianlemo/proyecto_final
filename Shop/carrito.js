const carritoElement = document.getElementById('carrito');
const tbodyElement = document.querySelector('tbody');
const tfootElement = document.querySelector('tfoot');
const vaciarCarritoButton = document.querySelector('#vaciar-carrito');
const listaProductosElement = document.querySelector('#lista-productos');
let carritoItems = [];

cargarEventListeners();

function cargarEventListeners() {
    listaProductosElement.addEventListener('click', agregarProducto);
    carritoElement.addEventListener('click', eliminarItem);
    vaciarCarritoButton.addEventListener('click', confirmarVaciarCarrito);
}

function agregarProducto(event) {
    event.preventDefault();
    if (event.target.classList.contains('agregar-carrito')) {
        const productoSeleccionadoElement = event.target.parentElement.parentElement;
        agregarProductoAlCarrito(productoSeleccionadoElement);
        mostrarMensaje('producto agregado al carrito', 'success');
    }
}

function agregarProductoAlCarrito(productoElement) {
    const producto = {
        precio: productoElement.querySelector('.precio').textContent,
        titulo: productoElement.querySelector('h5').textContent,
        id: productoElement.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    };

    const productoExistente = carritoItems.find((item) => item.id === producto.id);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carritoItems.push(producto);
    }

    actualizarCarrito();
}

function actualizarCarrito() {
    limpiarTabla(tbodyElement);
    let total = 0;

    carritoItems.forEach((producto) => {
        const fila = document.createElement('tr');
        const subTotal = parseFloat(producto.precio.slice(1)) * producto.cantidad;

        fila.innerHTML = `
            
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>$${subTotal.toFixed(2)}</td>
            <td>
                <a href="#" class="borrar-item" data-id="${producto.id}">x</a>
            </td>
        `;

        total += subTotal;
        tbodyElement.appendChild(fila);
    });

    limpiarTabla(tfootElement);
    const filaFoot = document.createElement('tr');
    filaFoot.innerHTML = `
        <td colspan="4">Total del pedido</td>
        <td>$${total.toFixed(2)}</td>
    `;
    tfootElement.appendChild(filaFoot);
}

function limpiarTabla(tabla) {
    while (tabla.firstChild) {
        tabla.removeChild(tabla.firstChild);
    }
}

function eliminarItem(event) {
    if (event.target.classList.contains('borrar-item')) {
        const productoId = event.target.getAttribute('data-id');
        carritoItems = carritoItems.filter((producto) => producto.id !== productoId);
        actualizarCarrito();
    }
}

function confirmarVaciarCarrito(event) {
    event.preventDefault();
    carritoItems.length = 0;
    actualizarCarrito();
}



