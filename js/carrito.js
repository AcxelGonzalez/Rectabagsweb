// js/carrito.js - Gestión del Carrito de Compras en LocalStorage

let productoIdAEliminar = null;

// Buscar la sesión activa alineada con main.js
function obtenerUsuarioActivo() {
    const item = localStorage.getItem('sesion_rectabags');
    if (item) {
        try {
            const sesion = JSON.parse(item);
            if (sesion && sesion.email) {
                return sesion;
            }
        } catch (e) {
            console.error("Error al parsear sesion_rectabags:", e);
        }
    }
    return null;
}

// Generar una clave de carrito única por usuario
function obtenerClaveCarrito() {
    const usuario = obtenerUsuarioActivo();
    if (usuario && usuario.email) {
        return `recta_carrito_${usuario.email}`;
    }
    return 'recta_carrito_invitado';
}

// 1. Leer el carrito
function obtenerCarrito() {
    const clave = obtenerClaveCarrito();
    const carrito = localStorage.getItem(clave);
    try {
        return carrito ? JSON.parse(carrito) : [];
    } catch (e) {
        console.error("Error al leer el carrito:", e);
        return [];
    }
}

// 2. Guardar el carrito
function guardarCarrito(carrito) {
    const clave = obtenerClaveCarrito();
    localStorage.setItem(clave, JSON.stringify(carrito));
}

// 3. Agregar producto
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

// 4. Formatear precio
function formatearPrecio(precio) {
    return '$' + Number(precio).toLocaleString('es-CL');
}

// 5. Cambiar cantidad desde carrito
function cambiarCantidad(id, cambio) {
    let carrito = obtenerCarrito();
    const index = carrito.findIndex(item => item.id === id);
    
    if (index !== -1) {
        carrito[index].cantidad += cambio;
        if (carrito[index].cantidad < 1) {
            carrito[index].cantidad = 1;
        }
        guardarCarrito(carrito);
        renderizarCarrito();
    }
}

// 6. Borrar producto del carrito (Si-No)
function solicitarEliminación(id, nombreProducto) {
    productoIdAEliminar = id;
    
    const textoModal = document.getElementById('textoModalEliminar');
    if (textoModal) {
        textoModal.innerText = `¿Desea eliminar "${nombreProducto}" del carrito?`;
    }
    
    const modalElement = document.getElementById('modalEliminar');
    if (modalElement) {
        const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
        modal.show();
    }
}

// 7. Renderizar vista del carrito
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

        const botonMenos = item.cantidad > 1 
            ? `<button class="btn btn-light border-0 fw-bold px-2 py-0" type="button" onclick="cambiarCantidad('${item.id}', -1)">-</button>` 
            : `<div style="width: 28px;"></div>`;

        htmlProductos += `
            <div class="bg-white rounded-4 p-3 shadow-sm mb-3">
                <div class="row g-3 align-items-center">
                    <div class="col-4 col-sm-3">
                        <img src="${item.imagen}" alt="${item.nombre}" class="img-fluid rounded-3 object-fit-cover w-100" style="height: 100px;">
                    </div>
                    <div class="col-8 col-sm-4">
                        <h2 class="h6 fw-bold mb-1 text-dark">${item.nombre}</h2>
                        <span class="badge bg-light text-secondary border mb-1">${item.categoria || 'Producto'}</span>
                        <div class="small text-secondary lh-sm" style="font-size: 0.8rem;">
                            <p class="m-0"><strong>Detalles:</strong> ${item.medidas || 'Estándar'}</p>
                        </div>
                    </div>
                    <div class="col-12 col-sm-5 d-flex align-items-center justify-content-end gap-3 mt-2 mt-sm-0 ms-auto">
                        <div class="input-group rounded-3 overflow-hidden border border-secondary-subtle align-items-center" style="width: 105px; height: 38px;">
                            ${botonMenos}
                            <input type="number" class="form-control border-0 text-center fw-bold p-0 bg-white" value="${item.cantidad}" readonly>
                            <button class="btn btn-light border-0 fw-bold px-2 py-0" type="button" onclick="cambiarCantidad('${item.id}', 1)">+</button>
                        </div>
                        <p class="h6 fw-bold text-dark m-0 text-end" style="min-width: 85px;">
                            ${formatearPrecio(subtotalItem)}
                        </p>
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

// 8. Registra la orden en el usuario activo dentro de LocalStorage
function procesarRegistroPedido() {
    const sesion = obtenerUsuarioActivo();
    if (!sesion) return false;

    let usuarios = JSON.parse(localStorage.getItem('usuarios_rectabags')) || [];
    let indexUsuario = usuarios.findIndex(u => u.email === sesion.email);

    if (indexUsuario === -1) return false;

    const carrito = obtenerCarrito();
    if (carrito.length === 0) return false;

    const totalCompra = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    const nuevoPedido = {
        id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        fecha: new Date().toLocaleDateString('es-CL'),
        total: formatearPrecio(totalCompra),
        productos: carrito.map(p => ({
            nombre: p.nombre,
            cantidad: p.cantidad,
            precio: formatearPrecio(p.precio)
        }))
    };

    if (!usuarios[indexUsuario].pedidos) {
        usuarios[indexUsuario].pedidos = [];
    }

    usuarios[indexUsuario].pedidos.push(nuevoPedido);
    localStorage.setItem('usuarios_rectabags', JSON.stringify(usuarios));

    // Vaciar el carrito actual
    const clave = obtenerClaveCarrito();
    localStorage.removeItem(clave);

    return true;
}

// 9. Inicialización de eventos
document.addEventListener('DOMContentLoaded', () => {
    
    // Confirmar eliminación
    const btnConfirmar = document.getElementById('btnConfirmarEliminar');
    if (btnConfirmar) {
        btnConfirmar.onclick = () => {
            if (productoIdAEliminar) {
                let carrito = obtenerCarrito();
                carrito = carrito.filter(item => item.id !== productoIdAEliminar);
                guardarCarrito(carrito);

                const modalElement = document.getElementById('modalEliminar');
                if (modalElement) {
                    const modal = bootstrap.Modal.getInstance(modalElement);
                    if (modal) modal.hide();
                }

                productoIdAEliminar = null;
                renderizarCarrito();
            }
        };
    }

    // Botón "Proceder al Pago"
    const btnProcederPago = document.getElementById('btnProcederPago');
    const aceptoTerminos = document.getElementById('aceptoTerminos');

    if (btnProcederPago) {
        btnProcederPago.onclick = () => {
            const carrito = obtenerCarrito();
            const usuarioActivo = obtenerUsuarioActivo();

            if (carrito.length === 0) {
                alert('Tu carrito está vacío. Agrega productos para continuar.');
                return;
            }

            if (!usuarioActivo) {
                alert('Debes iniciar sesión para poder realizar una compra.');
                window.location.href = 'login.html';
                return;
            }

            if (!aceptoTerminos || !aceptoTerminos.checked) {
                alert('Debes aceptar los Términos y Condiciones para proceder al pago.');
                return;
            }

            const modalPagoElement = document.getElementById('modalConfirmarPago');
            if (modalPagoElement) {
                const modalPago = bootstrap.Modal.getOrCreateInstance(modalPagoElement);
                modalPago.show();
            }
        };
    }

    // Botón "SÍ" de confirmación final
    const btnConfirmarPagoFinal = document.getElementById('btnConfirmarPagoFinal');
    if (btnConfirmarPagoFinal) {
        btnConfirmarPagoFinal.onclick = () => {
            const exito = procesarRegistroPedido();

            const modalPagoElement = document.getElementById('modalConfirmarPago');
            if (modalPagoElement) {
                const modalPago = bootstrap.Modal.getInstance(modalPagoElement);
                if (modalPago) modalPago.hide();
            }

            if (exito) {
                alert('¡Gracias por tu compra! Tu pedido ha sido procesado exitosamente.');
                window.location.href = 'perfil_usuario.html';
            } else {
                alert('Hubo un error al procesar tu compra. Por favor reintenta.');
            }
        };
    }

    renderizarCarrito();
});