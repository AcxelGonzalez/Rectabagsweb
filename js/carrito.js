// js/carrito.js - Gestión del Carrito de Compras en LocalStorage

let productoIdAEliminar = null;

// 1. Leer el carrito desde LocalStorage
function obtenerCarrito() {
    const carrito = localStorage.getItem('recta_carrito');
    return carrito ? JSON.parse(carrito) : [];
}

// 2. Guardar el carrito en LocalStorage
function guardarCarrito(carrito) {
    localStorage.setItem('recta_carrito', JSON.stringify(carrito));
}

// 3. Agregar un producto al carrito (usado desde las fichas de producto)
function agregarAlCarrito(producto) {
    let carrito = obtenerCarrito();
    
    const index = carrito.findIndex(item => item.id === producto.id);
    
    if (index !== -1) {
        carrito[index].cantidad += producto.cantidad;
    } else {
        carrito.push(producto);
    }
    
    guardarCarrito(carrito);
    alert(`¡${producto.nombre} añadido al carrito!`);
}

// 4. Formatear valores numéricos a pesos chilenos ($15.000)
function formatearPrecio(precio) {
    return '$' + precio.toLocaleString('es-CL');
}

// 5. Cambiar la cantidad (+ / -) desde la vista del carrito
function cambiarCantidad(id, cambio) {
    let carrito = obtenerCarrito();
    const index = carrito.findIndex(item => item.id === id);
    
    if (index !== -1) {
        carrito[index].cantidad += cambio;
        
        // Evita que la cantidad sea menor a 1
        if (carrito[index].cantidad < 1) {
            carrito[index].cantidad = 1;
        }
        
        guardarCarrito(carrito);
        renderizarCarrito();
    }
}

// 6. Confirmar eliminación mediante Modal Pop-up
function solicitarEliminación(id, nombreProducto) {
    productoIdAEliminar = id;
    
    const textoModal = document.getElementById('textoModalEliminar');
    if (textoModal) {
        textoModal.innerText = `¿Desea eliminar "${nombreProducto}" del carrito?`;
    }
    
    const modalElement = document.getElementById('modalEliminar');
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
}

// 7. Dibujar y actualizar los elementos dinámicamente en carrito.html
function renderizarCarrito() {
    const contenedorLista = document.getElementById('lista-productos-carrito');
    const badgeContador = document.getElementById('contador-productos-titulo');
    const elSubtotal = document.getElementById('resumen-subtotal');
    const elTotal = document.getElementById('resumen-total');
    
    if (!contenedorLista) return;

    const carrito = obtenerCarrito();
    
    if (carrito.length === 0) {
        if (badgeContador) badgeContador.innerText = '( 0 productos )';
        if (elSubtotal) elSubtotal.innerText = '$0';
        if (elTotal) elTotal.innerText = '$0';
        
        contenedorLista.innerHTML = `
            <div class="bg-white rounded-4 p-5 text-center shadow-sm">
                <p class="h5 fw-bold text-dark mb-2">Tu carrito está vacío</p>
                <p class="text-secondary small mb-4">Parece que aún no has añadido productos a tu compra.</p>
                <a href="catalogo.html" class="btn btn-dark px-4 py-2 rounded-4 fw-bold">Descubrir productos</a>
            </div>
        `;
        return;
    }

    const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    if (badgeContador) {
        badgeContador.innerText = `( ${totalUnidades} ${totalUnidades === 1 ? 'producto' : 'productos'} )`;
    }

    let htmlProductos = '';
    let sumaSubtotal = 0;

    carrito.forEach(item => {
        const subtotalItem = item.precio * item.cantidad;
        sumaSubtotal += subtotalItem;

        // Solo mostrar el botón (-) si la cantidad es mayor a 1
        const botonMenos = item.cantidad > 1 
            ? `<button class="btn btn-light border-0 fw-bold px-2 py-0" type="button" onclick="cambiarCantidad('${item.id}', -1)">-</button>` 
            : `<div style="width: 28px;"></div>`;

        // Alineación, precio corrido a la izquierda y botón "Eliminar" en texto a la derecha
        htmlProductos += `
            <div class="bg-white rounded-4 p-3 shadow-sm mb-3">
                <div class="row g-3 align-items-center">
                    <!-- Imagen -->
                    <div class="col-4 col-sm-3">
                        <img src="${item.imagen}" alt="${item.nombre}" class="img-fluid rounded-3 object-fit-cover w-100" style="height: 100px;">
                    </div>

                    <!-- Detalles -->
                    <div class="col-8 col-sm-4">
                        <h2 class="h6 fw-bold mb-1 text-dark">${item.nombre}</h2>
                        <span class="badge bg-light text-secondary border mb-1">${item.categoria}</span>
                        <div class="small text-secondary lh-sm" style="font-size: 0.8rem;">
                            <p class="m-0"><strong>Detalles:</strong> ${item.medidas}</p>
                        </div>
                    </div>

                    <!-- Selector de Cantidad, Precio y Botón Eliminar -->
                    <div class="col-12 col-sm-5 d-flex align-items-center justify-content-end gap-3 mt-2 mt-sm-0 ms-auto">
                        
                        <!-- Selector de Cantidad -->
                        <div class="input-group rounded-3 overflow-hidden border border-secondary-subtle align-items-center" style="width: 105px; height: 38px;">
                            ${botonMenos}
                            <input type="number" class="form-control border-0 text-center fw-bold p-0 bg-white" value="${item.cantidad}" readonly>
                            <button class="btn btn-light border-0 fw-bold px-2 py-0" type="button" onclick="cambiarCantidad('${item.id}', 1)">+</button>
                        </div>

                        <!-- Precio corrido a la izquierda -->
                        <p class="h6 fw-bold text-dark m-0 text-end" style="min-width: 85px;">
                            ${formatearPrecio(subtotalItem)}
                        </p>

                        <!-- Botón de Eliminar en Texto -->
                        <button class="btn btn-outline-danger btn-sm rounded-pill px-3 fw-bold" 
                                onclick="solicitarEliminación('${item.id}', '${item.nombre}')">
                            Eliminar
                        </button>

                    </div>
                </div>
            </div>
        `;
    });

    contenedorLista.innerHTML = htmlProductos;

    if (elSubtotal) elSubtotal.innerText = formatearPrecio(sumaSubtotal);
    if (elTotal) elTotal.innerText = formatearPrecio(sumaSubtotal);
}

// 8. Confirmación para eliminación desde el Pop Up
document.addEventListener('DOMContentLoaded', () => {
    const btnConfirmar = document.getElementById('btnConfirmarEliminar');
    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', () => {
            if (productoIdAEliminar) {
                let carrito = obtenerCarrito();
                carrito = carrito.filter(item => item.id !== productoIdAEliminar);
                guardarCarrito(carrito);

                const modalElement = document.getElementById('modalEliminar');
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) modal.hide();

                productoIdAEliminar = null;
                renderizarCarrito();
            }
        });
    }

    renderizarCarrito();
});