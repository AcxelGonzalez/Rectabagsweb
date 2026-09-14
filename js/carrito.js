/*
===========================================================
RECTABAGS WEB
Archivo: carrito.js

Responsabilidad:
- Gestión del carrito de compras.
- Persistencia del carrito mediante localStorage.
- Agregar, modificar y eliminar productos.
- Cálculo de subtotales y totales.
- Registro de pedidos.
- Flujo de finalización de compra.

Dependencias:
- main.js
- auth.js
- Bootstrap 5

===========================================================
*/


/* =========================================================
    1. VARIABLES GLOBALES
   ========================================================= */

/*
 * Guarda temporalmente el ID del producto seleccionado
 * para eliminar desde el modal de confirmación.
 */
let productoIdAEliminar = null;


/* =========================================================
    2. GESTIÓN DEL CARRITO
   ========================================================= */

/**
 * Obtiene la clave de localStorage correspondiente
 * al carrito actual.
 *
 * Cada usuario posee un carrito independiente.
 * Si no existe sesión, se utiliza el carrito de invitado.
 *
 * @returns {string}
 */
function obtenerClaveCarrito() {

    const sesion =
        typeof obtenerSesionActiva === "function"
            ? obtenerSesionActiva()
            : null;


    if (sesion && sesion.email) {

        return `recta_carrito_${sesion.email}`;

    }


    return "recta_carrito_invitado";

}


/**
 * Obtiene el carrito almacenado.
 *
 * @returns {Array}
 */
function obtenerCarrito() {

    const clave =
        obtenerClaveCarrito();


    const carrito =
        localStorage.getItem(clave);


    if (!carrito) {
        return [];
    }


    try {

        const datos =
            JSON.parse(carrito);


        return Array.isArray(datos)
            ? datos
            : [];


    } catch (error) {

        console.error(
            "Error al leer el carrito:",
            error
        );


        return [];

    }

}


/**
 * Guarda el carrito actual en localStorage.
 *
 * @param {Array} carrito
 */
function guardarCarrito(carrito) {

    const clave =
        obtenerClaveCarrito();


    localStorage.setItem(
        clave,
        JSON.stringify(carrito)
    );

}


/* =========================================================
   3. AGREGAR PRODUCTOS
   ========================================================= */

/**
 * Agrega un producto al carrito.
 *
 * Si el producto ya existe, aumenta su cantidad.
 *
 * @param {Object} producto
 */
function agregarAlCarrito(producto) {

    if (!producto || !producto.id) {

        console.error(
            "Producto inválido."
        );

        return;

    }


    let carrito =
        obtenerCarrito();


    const indice =
        carrito.findIndex(
            item =>
                item.id === producto.id
        );


    if (indice !== -1) {

        carrito[indice].cantidad +=
            producto.cantidad;

    } else {

        carrito.push(producto);

    }


    guardarCarrito(
        carrito
    );


    alert(
        `¡${producto.nombre} añadido al carrito!`
    );

}


/* =========================================================
   4. FORMATO DE PRECIOS
   ========================================================= */

/**
 * Convierte un número a formato monetario chileno.
 *
 * Ejemplo:
 * 35000 → $35.000
 *
 * @param {number} precio
 * @returns {string}
 */
function formatearPrecio(precio) {

    return (
        "$" +
        Number(precio || 0)
            .toLocaleString("es-CL")
    );

}


/* =========================================================
   5. MODIFICAR CANTIDADES
   ========================================================= */

/**
 * Modifica la cantidad de un producto mediante
 * un incremento o decremento.
 *
 * @param {string} id
 * @param {number} cambio
 */
function cambiarCantidad(id, cambio) {

    const carrito =
        obtenerCarrito();


    const indice =
        carrito.findIndex(
            item =>
                item.id === id
        );


    if (indice === -1) {
        return;
    }


    carrito[indice].cantidad +=
        Number(cambio);


    /*
     * Nunca permitimos una cantidad inferior a 1.
     */
    if (
        carrito[indice].cantidad < 1
    ) {

        carrito[indice].cantidad = 1;

    }


    guardarCarrito(
        carrito
    );


    renderizarCarrito();

}


/**
 * Actualiza una cantidad introducida directamente
 * desde el input numérico.
 *
 * @param {string} id
 * @param {number|string} nuevoValor
 */
function actualizarCantidadInput(
    id,
    nuevoValor
) {

    let cantidad =
        parseInt(
            nuevoValor,
            10
        );


    if (
        isNaN(cantidad) ||
        cantidad < 1
    ) {

        cantidad = 1;

    }


    const carrito =
        obtenerCarrito();


    const indice =
        carrito.findIndex(
            item =>
                item.id === id
        );


    if (indice === -1) {
        return;
    }


    carrito[indice].cantidad =
        cantidad;


    guardarCarrito(
        carrito
    );


    renderizarCarrito();

}


/* =========================================================
   6. ELIMINAR PRODUCTOS
   ========================================================= */

/**
 * Solicita confirmación antes de eliminar un producto.
 *
 * @param {string} id
 * @param {string} nombreProducto
 */
function solicitarEliminacion(
    id,
    nombreProducto
) {

    productoIdAEliminar =
        id;


    const textoModal =
        document.getElementById(
            "textoModalEliminar"
        );


    if (textoModal) {

        textoModal.textContent =
            `¿Desea eliminar "${nombreProducto}" del carrito?`;

    }


    const modalElement =
        document.getElementById(
            "modalEliminar"
        );


    if (modalElement) {

        const modal =
            bootstrap.Modal
                .getOrCreateInstance(
                    modalElement
                );


        modal.show();

    }

}


/**
 * Elimina definitivamente el producto
 * seleccionado después de la confirmación.
 */
function confirmarEliminacion() {

    if (
        productoIdAEliminar === null
    ) {

        return;

    }


    let carrito =
        obtenerCarrito();


    carrito =
        carrito.filter(
            item =>
                item.id !==
                productoIdAEliminar
        );


    guardarCarrito(
        carrito
    );


    const modalElement =
        document.getElementById(
            "modalEliminar"
        );


    if (modalElement) {

        const modal =
            bootstrap.Modal
                .getInstance(
                    modalElement
                );


        if (modal) {
            modal.hide();
        }

    }


    productoIdAEliminar =
        null;


    renderizarCarrito();

}


/* =========================================================
   7. RENDERIZAR CARRITO
   ========================================================= */

/**
 * Renderiza todos los productos almacenados
 * en el carrito actual.
 */
function renderizarCarrito() {

    const contenedorLista =
        document.getElementById(
            "lista-productos-carrito"
        );


    const badgeContador =
        document.getElementById(
            "contador-productos-titulo"
        );


    const elSubtotal =
        document.getElementById(
            "resumen-subtotal"
        );


    const elTotal =
        document.getElementById(
            "resumen-total"
        );


    /*
     * Si la página actual no contiene carrito,
     * no hacemos nada.
     */
    if (!contenedorLista) {
        return;
    }


    const carrito =
        obtenerCarrito();


    /* -----------------------------------------------------
       CARRITO VACÍO
       ----------------------------------------------------- */

    if (carrito.length === 0) {

        if (badgeContador) {

            badgeContador.textContent =
                "( 0 productos )";

        }


        if (elSubtotal) {
            elSubtotal.textContent =
                "$0";
        }


        if (elTotal) {
            elTotal.textContent =
                "$0";
        }


        contenedorLista.innerHTML = `
            <div class="bg-white rounded-4 p-5 text-center shadow-sm">

                <p class="h5 fw-bold text-dark mb-2">
                    Tu carrito está vacío
                </p>

                <p class="text-secondary small mb-4">
                    Parece que aún no has añadido productos
                    a tu compra.
                </p>

                <a
                    href="catalogo.html"
                    class="btn btn-dark px-4 py-2 rounded-4 fw-bold"
                >
                    Descubrir productos
                </a>

            </div>
        `;

        return;

    }


    /* -----------------------------------------------------
       CALCULAR CANTIDADES
       ----------------------------------------------------- */

    const totalUnidades =
        carrito.reduce(
            (acumulador, item) =>
                acumulador +
                Number(item.cantidad || 0),
            0
        );


    if (badgeContador) {

        badgeContador.textContent =
            `(
                ${totalUnidades}
                ${
                    totalUnidades === 1
                        ? "producto"
                        : "productos"
                }
            )`;

    }


    /* -----------------------------------------------------
       GENERAR HTML
       ----------------------------------------------------- */

    let htmlProductos = "";

    let sumaSubtotal = 0;


    carrito.forEach(
        item => {

            const cantidad =
                Number(
                    item.cantidad || 1
                );


            const precio =
                Number(
                    item.precio || 0
                );


            const subtotalItem =
                precio *
                cantidad;


            sumaSubtotal +=
                subtotalItem;


            const botonMenos =
                cantidad > 1
                    ? `
                        <button
                            class="btn btn-light border-0 fw-bold px-2 py-0"
                            type="button"
                            onclick="cambiarCantidad('${item.id}', -1)"
                            aria-label="Disminuir cantidad"
                        >
                            -
                        </button>
                    `
                    : `
                        <div
                            style="width: 28px;"
                            aria-hidden="true"
                        ></div>
                    `;


            htmlProductos += `
                <div
                    class="bg-white rounded-4 p-3 shadow-sm mb-3"
                >

                    <div class="row g-3 align-items-center">

                        <div class="col-4 col-sm-3">

                            <img
                                src="${item.imagen}"
                                alt="${item.nombre}"
                                class="img-fluid rounded-3 object-fit-cover w-100"
                                style="height: 100px;"
                            >

                        </div>


                        <div class="col-8 col-sm-4">

                            <h2 class="h6 fw-bold mb-1 text-dark">
                                ${item.nombre}
                            </h2>

                            <span class="badge bg-light text-secondary border mb-1">
                                ${item.categoria || "Producto"}
                            </span>

                            <div
                                class="small text-secondary lh-sm"
                                style="font-size: 0.8rem;"
                            >

                                <p class="m-0">
                                    <strong>Detalles:</strong>
                                    ${item.medidas || "Estándar"}
                                </p>

                            </div>

                        </div>


                        <div
                            class="col-12 col-sm-5 d-flex
                                   align-items-center
                                   justify-content-end
                                   gap-3 mt-2 mt-sm-0 ms-auto"
                        >

                            <div
                                class="input-group rounded-3 overflow-hidden
                                       border border-secondary-subtle
                                       align-items-center"
                                style="width: 105px; height: 38px;"
                            >

                                ${botonMenos}


                                <input
                                    type="number"
                                    min="1"
                                    class="form-control border-0
                                           text-center fw-bold p-0 bg-white"
                                    value="${cantidad}"
                                    aria-label="Cantidad de ${item.nombre}"
                                    onchange="actualizarCantidadInput(
                                        '${item.id}',
                                        this.value
                                    )"
                                >


                                <button
                                    class="btn btn-light border-0 fw-bold px-2 py-0"
                                    type="button"
                                    onclick="cambiarCantidad('${item.id}', 1)"
                                    aria-label="Aumentar cantidad"
                                >
                                    +
                                </button>

                            </div>


                            <p
                                class="h6 fw-bold text-dark m-0 text-end"
                                style="min-width: 85px;"
                            >
                                ${formatearPrecio(subtotalItem)}
                            </p>


                            <button
                                class="btn btn-outline-danger btn-sm
                                       rounded-pill px-3 fw-bold"
                                type="button"
                                onclick="solicitarEliminacion(
                                    '${item.id}',
                                    '${item.nombre}'
                                )"
                            >
                                Eliminar
                            </button>

                        </div>

                    </div>

                </div>
            `;

        }
    );


    contenedorLista.innerHTML =
        htmlProductos;


    if (elSubtotal) {

        elSubtotal.textContent =
            formatearPrecio(
                sumaSubtotal
            );

    }


    if (elTotal) {

        elTotal.textContent =
            formatearPrecio(
                sumaSubtotal
            );

    }

}


/* =========================================================
   8. REGISTRAR PEDIDO
   ========================================================= */

/**
 * Registra el contenido del carrito como un pedido
 * asociado al usuario autenticado.
 *
 * @returns {boolean}
 */
function procesarRegistroPedido() {

    /*
     * La sesión ahora se obtiene desde auth.js.
     */
    const sesion =
        obtenerSesionActiva();


    if (!sesion) {
        return false;
    }


    const usuarios =
        obtenerUsuarios();


    const indiceUsuario =
        usuarios.findIndex(
            usuario =>
                usuario.email &&
                usuario.email.toLowerCase() ===
                sesion.email.toLowerCase()
        );


    if (indiceUsuario === -1) {
        return false;
    }


    const carrito =
        obtenerCarrito();


    if (carrito.length === 0) {
        return false;
    }


    const totalCompra =
        carrito.reduce(
            (acumulador, item) =>
                acumulador +
                (
                    Number(item.precio || 0) *
                    Number(item.cantidad || 0)
                ),
            0
        );


    /*
     * Guardamos el total como número.
     *
     * La presentación del precio se realiza
     * mediante formatearPrecio().
     */
    const nuevoPedido = {

        id:
            "ORD-" +
            Math.floor(
                100000 +
                Math.random() *
                900000
            ),

        fecha:
            new Date()
                .toLocaleDateString(
                    "es-CL"
                ),

        total:
            totalCompra,

        estado:
            "Confirmado",

        productos:
            carrito.map(
                producto => ({

                    nombre:
                        producto.nombre,

                    cantidad:
                        Number(
                            producto.cantidad
                        ),

                    precio:
                        Number(
                            producto.precio
                        )

                })
            )

    };


    /*
     * Crear arreglo de pedidos si el usuario
     * todavía no posee uno.
     */
    if (
        !Array.isArray(
            usuarios[indiceUsuario].pedidos
        )
    ) {

        usuarios[indiceUsuario].pedidos = [];

    }


    usuarios[indiceUsuario]
        .pedidos
        .push(
            nuevoPedido
        );


    guardarUsuarios(
        usuarios
    );


    /*
     * Vaciar el carrito correspondiente
     * al usuario actual.
     */
    const claveCarrito =
        obtenerClaveCarrito();


    localStorage.removeItem(
        claveCarrito
    );


    return true;

}


/* =========================================================
   9. FINALIZAR COMPRA
   ========================================================= */

/**
 * Inicia el flujo de compra.
 *
 * Se comprueba:
 * 1. Carrito con productos.
 * 2. Usuario autenticado.
 * 3. Términos aceptados.
 */
function iniciarProcesoCompra() {

    const carrito =
        obtenerCarrito();


    const usuario =
        obtenerSesionActiva();


    const aceptoTerminos =
        document.getElementById(
            "aceptoTerminos"
        );


    /* -----------------------------------------------------
       VALIDAR CARRITO
       ----------------------------------------------------- */

    if (carrito.length === 0) {

        alert(
            "Tu carrito está vacío. " +
            "Agrega productos para continuar."
        );

        return;

    }


    /* -----------------------------------------------------
       VALIDAR SESIÓN
       ----------------------------------------------------- */

    if (!usuario) {

        alert(
            "Debes iniciar sesión para poder realizar una compra."
        );

        /*
        * Guardamos el destino para regresar automáticamente
        * al carrito después de un login exitoso.
        */
        sessionStorage.setItem(
            "rectabags_redireccion_login",
            "carrito.html"
        );

        window.location.href =
            "login.html";

        return;

    }


    /* -----------------------------------------------------
       VALIDAR TÉRMINOS
       ----------------------------------------------------- */

    if (
        !aceptoTerminos ||
        !aceptoTerminos.checked
    ) {

        alert(
            "Debes aceptar los Términos y Condiciones " +
            "para proceder al pago."
        );

        return;

    }


    /* -----------------------------------------------------
       MOSTRAR CONFIRMACIÓN
       ----------------------------------------------------- */

    const modalPagoElement =
        document.getElementById(
            "modalConfirmarPago"
        );


    if (modalPagoElement) {

        const modalPago =
            bootstrap.Modal
                .getOrCreateInstance(
                    modalPagoElement
                );


        modalPago.show();

    }

}


/* =========================================================
   10. INICIALIZACIÓN
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* -------------------------------------------------
           CONFIRMAR ELIMINACIÓN
           ------------------------------------------------- */

        const btnConfirmar =
            document.getElementById(
                "btnConfirmarEliminar"
            );


        if (btnConfirmar) {

            btnConfirmar.addEventListener(
                "click",
                confirmarEliminacion
            );

        }


        /* -------------------------------------------------
           PROCEDER AL PAGO
           ------------------------------------------------- */

        const btnProcederPago =
            document.getElementById(
                "btnProcederPago"
            );


        if (btnProcederPago) {

            btnProcederPago.addEventListener(
                "click",
                iniciarProcesoCompra
            );

        }


        /* -------------------------------------------------
           CONFIRMACIÓN FINAL
           ------------------------------------------------- */

        const btnConfirmarPagoFinal =
            document.getElementById(
                "btnConfirmarPagoFinal"
            );


        if (btnConfirmarPagoFinal) {

            btnConfirmarPagoFinal.addEventListener(
                "click",
                () => {

                    const exito =
                        procesarRegistroPedido();


                    const modalPagoElement =
                        document.getElementById(
                            "modalConfirmarPago"
                        );


                    if (modalPagoElement) {

                        const modalPago =
                            bootstrap.Modal
                                .getInstance(
                                    modalPagoElement
                                );


                        if (modalPago) {

                            modalPago.hide();

                        }

                    }


                    if (exito) {

                        alert(
                            "¡Gracias por tu compra! " +
                            "Tu pedido ha sido procesado exitosamente."
                        );


                        window.location.href =
                            "perfil_usuario.html";


                    } else {

                        alert(
                            "Hubo un error al procesar tu compra. " +
                            "Por favor reintenta."
                        );

                    }

                }
            );

        }


        /*
         * Renderizar el carrito si estamos dentro
         * de carrito.html.
         */
        renderizarCarrito();

    }
);