/*
===========================================================
RECTABAGS WEB
Archivo: perfil.js

Responsabilidad:
- Gestión del perfil del usuario.
- Visualización de datos personales.
- Edición de información.
- Cambio de contraseña.
- Visualización de la dirección registrada.
- Visualización del historial de pedidos.

Dependencias:
- main.js
- auth.js
- Bootstrap 5

===========================================================
*/


/* =========================================================
    1. INICIALIZACIÓN
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /*
     * Todas estas funciones comprueban internamente si
     * los elementos existen antes de ejecutarse.
     */
    inicializarPerfil();
    inicializarTabsPerfil();

});


/* =========================================================
    2. OBTENER USUARIO ACTUAL
   ========================================================= */

/**
 * Busca dentro de la lista de usuarios al usuario
 * correspondiente a la sesión activa.
 *
 * @returns {Object|null}
 */
function obtenerUsuarioPerfil() {

    const sesion =
        obtenerSesionActiva();

    if (!sesion || !sesion.email) {
        return null;
    }


    const usuarios =
        obtenerUsuarios();


    const usuario =
        usuarios.find(
            usuario =>
                usuario.email &&
                usuario.email.toLowerCase() ===
                sesion.email.toLowerCase()
        );


    return usuario || null;

}


/**
 * Busca el índice del usuario actual dentro
 * del arreglo de usuarios.
 *
 * @returns {number}
 */
function obtenerIndiceUsuarioPerfil() {

    const sesion =
        obtenerSesionActiva();

    if (!sesion || !sesion.email) {
        return -1;
    }


    const usuarios =
        obtenerUsuarios();


    return usuarios.findIndex(
        usuario =>
            usuario.email &&
            usuario.email.toLowerCase() ===
            sesion.email.toLowerCase()
    );

}


/* =========================================================
    3. CARGAR INFORMACIÓN DEL PERFIL
   ========================================================= */

/**
 * Inicializa la página de perfil.
 *
 * Si no existe una sesión válida, el usuario es enviado
 * a la página de inicio de sesión.
 */
function inicializarPerfil() {

    const paginaPerfil =
        document.getElementById("perfil-container") ||
        document.getElementById("texto-bienvenida");

    /*
     * Si la página no contiene elementos de perfil,
     * no hacemos nada.
     */
    if (!paginaPerfil) {
        return;
    }


    const usuario =
        obtenerUsuarioPerfil();


    /*
     * Protección de la página.
     */
    if (!usuario) {

        window.location.href =
            "login.html";

        return;

    }


    cargarDatosPerfil(usuario);
    cargarFormularioEdicion(usuario);
    renderizarDirecciones(usuario);
    renderizarPedidos(usuario);

}

/**
 * Convierte una fecha almacenada como AAAA-MM-DD
 * al formato visual DD-MM-AAAA.
 *
 * @param {string} fecha
 * @returns {string}
 */
function formatearFechaNacimiento(
    fecha
) {

    if (!fecha) {
        return "";
    }


    /*
     * Compatibilidad por si ya estuviera
     * guardada como DD-MM-AAAA.
     */
    if (
        /^\d{2}-\d{2}-\d{4}$/.test(
            fecha
        )
    ) {

        return fecha;

    }


    const partes =
        fecha.match(
            /^(\d{4})-(\d{2})-(\d{2})$/
        );


    if (!partes) {
        return fecha;
    }


    const anio =
        partes[1];

    const mes =
        partes[2];

    const dia =
        partes[3];


    return `${dia}-${mes}-${anio}`;

}

/**
 * Muestra los datos personales del usuario
 * dentro de la interfaz.
 *
 * @param {Object} usuario
 */
function cargarDatosPerfil(usuario) {

    const textoBienvenida =
        document.getElementById(
            "texto-bienvenida"
        );

    if (textoBienvenida) {

        textoBienvenida.textContent =
            `Bienvenido/a, ${usuario.nombre || ""}`;

    }


    const inputNombre =
        document.getElementById(
            "perfil-nombre"
        );

    const inputApellido =
        document.getElementById(
            "perfil-apellido"
        );

    const inputEmail =
        document.getElementById(
            "perfil-email"
        );

    const inputRut =
        document.getElementById(
            "perfil-rut"
        );
    
    const inputFechaNacimiento =
        document.getElementById(
            "perfil-fecha-nacimiento"
        );

    const inputTelefono =
        document.getElementById(
            "perfil-telefono"
        );


    if (inputNombre) {
        inputNombre.value =
            usuario.nombre || "";
    }


    if (inputApellido) {
        inputApellido.value =
            usuario.apellido || "";
    }


    if (inputEmail) {
        inputEmail.value =
            usuario.email || "";
    }


    if (inputRut) {
        inputRut.value =
            usuario.rut || "";
    }

    if (inputFechaNacimiento) {

        inputFechaNacimiento.value =
            formatearFechaNacimiento(
                usuario.fechaNacimiento
            );

    }


    if (inputTelefono) {
        inputTelefono.value =
            usuario.telefono || "";
    }

}


/* =========================================================
    4. EDICIÓN DE PERFIL
   ========================================================= */

/**
 * Inicializa los botones y campos relacionados
 * con la edición del perfil.
 *
 * @param {Object} usuario
 */
function cargarFormularioEdicion(usuario) {

    const btnEditar =
        document.getElementById(
            "btn-editar-perfil"
        );

    const btnGuardar =
        document.getElementById(
            "btn-guardar-perfil"
        );

    const btnCancelar =
        document.getElementById(
            "btn-cancelar-perfil"
        );


    const inputNombre =
        document.getElementById(
            "perfil-nombre"
        );

    const inputApellido =
        document.getElementById(
            "perfil-apellido"
        );

    const inputTelefono =
        document.getElementById(
            "perfil-telefono"
        );

    const inputEmail =
        document.getElementById(
            "perfil-email"
        );

    const inputPasswordNueva =
        document.getElementById(
            "perfil-pass-nueva"
        );

    const inputPasswordConfirmar =
        document.getElementById(
            "perfil-pass-conf"
        );


    /*
     * Si no existe el botón de edición,
     * la función no debe continuar.
     */
    if (!btnEditar) {
        return;
    }


    /*
     * Evitamos registrar múltiples listeners.
     */
    if (
        btnEditar.dataset.initialized === "true"
    ) {
        return;
    }

    btnEditar.dataset.initialized = "true";


    /* -----------------------------------------------------
        ACTIVAR EDICIÓN
       ----------------------------------------------------- */

    btnEditar.addEventListener(
        "click",
        () => {

            cambiarModoEdicion(
                true
            );

        }
    );


    /* -----------------------------------------------------
        CANCELAR EDICIÓN
       ----------------------------------------------------- */

    if (btnCancelar) {

        btnCancelar.addEventListener(
            "click",
            () => {

                /*
                * Recuperamos nuevamente los datos
                * realmente guardados.
                */
                const usuarioActual =
                    obtenerUsuarioPerfil();


                if (usuarioActual) {

                    cargarDatosPerfil(
                        usuarioActual
                    );

                }


                /*
                * Limpiamos posibles contraseñas
                * escritas durante la edición.
                */
                limpiarCamposPassword();


                /*
                * Regresamos al modo visualización.
                */
                cambiarModoEdicion(
                    false
                );

            }
        );

    }


    /* -----------------------------------------------------
        GUARDAR CAMBIOS
       ----------------------------------------------------- */

    if (btnGuardar) {

        btnGuardar.addEventListener(
            "click",
            () => {

                guardarCambiosPerfil(
                    usuario,
                    inputNombre,
                    inputApellido,
                    inputTelefono,
                    inputEmail,
                    inputPasswordNueva,
                    inputPasswordConfirmar
                );

            }
        );

    }

}


/**
 * Activa o desactiva el modo edición
 * del perfil del usuario.
 *
 * @param {boolean} activo
 */
function cambiarModoEdicion(
    activo
) {

    const campos = [
        "perfil-nombre",
        "perfil-apellido",
        "perfil-telefono",
        "perfil-email"
    ];


    /* -----------------------------------------
        CAMPOS EDITABLES
       ----------------------------------------- */

    campos.forEach(
        id => {

            const input =
                document.getElementById(
                    id
                );


            if (!input) {
                return;
            }


            if (activo) {

                input.removeAttribute(
                    "readonly"
                );

            } else {

                input.setAttribute(
                    "readonly",
                    ""
                );

            }

        }
    );


    /* -----------------------------------------
        BOTÓN EDITAR
       ----------------------------------------- */

    const btnEditar =
        document.getElementById(
            "btn-editar-perfil"
        );


    if (btnEditar) {

        btnEditar.classList.toggle(
            "d-none",
            activo
        );

    }


    /* -----------------------------------------
        BOTÓN GUARDAR
       ----------------------------------------- */

    const btnGuardar =
        document.getElementById(
            "btn-guardar-perfil"
        );


    if (btnGuardar) {

        btnGuardar.classList.toggle(
            "d-none",
            !activo
        );

    }


    /* -----------------------------------------
        BOTÓN CANCELAR
       ----------------------------------------- */

    const btnCancelar =
        document.getElementById(
            "btn-cancelar-perfil"
        );


    if (btnCancelar) {

        btnCancelar.classList.toggle(
            "d-none",
            !activo
        );

    }


    /* -----------------------------------------
        CAMPOS DE CONTRASEÑA
       ----------------------------------------- */

    const camposPassword =
        document.querySelector(
            ".campos-password"
        );


    if (camposPassword) {

        camposPassword.classList.toggle(
            "d-none",
            !activo
        );

    }

}


/**
 * Guarda los cambios realizados en el perfil.
 */
function guardarCambiosPerfil(
    usuario,
    inputNombre,
    inputApellido,
    inputTelefono,
    inputEmail,
    inputPasswordNueva,
    inputPasswordConfirmar
) {

    if (!usuario) {
        return;
    }


    const nuevoNombre =
        inputNombre
            ? inputNombre.value.trim()
            : usuario.nombre;


    const nuevoApellido =
        inputApellido
            ? inputApellido.value.trim()
            : usuario.apellido;


    const nuevoTelefono =
        inputTelefono
            ? inputTelefono.value.trim()
            : usuario.telefono;


    const nuevoEmail =
        inputEmail
            ? inputEmail.value.trim().toLowerCase()
            : usuario.email;


    /*
     * Validación básica.
     */
    if (nuevoNombre === "") {

        alert(
            "El nombre no puede estar vacío."
        );

        inputNombre?.focus();

        return;

    }


    if (nuevoEmail === "") {

        alert(
            "El correo no puede estar vacío."
        );

        inputEmail?.focus();

        return;

    }


    /*
     * Validamos el correo usando las funciones
     * definidas en auth.js.
     */
    if (
        typeof validarEmail === "function" &&
        !validarEmail(nuevoEmail)
    ) {

        alert(
            "Ingresa un correo electrónico válido."
        );

        inputEmail?.focus();

        return;

    }


    /*
     * Si se modifica el correo, comprobamos
     * que no pertenezca a otro usuario.
     */
    const usuarios =
        obtenerUsuarios();


    const correoDuplicado =
        usuarios.some(
            usuarioExistente =>
                usuarioExistente.email &&
                usuarioExistente.email.toLowerCase() ===
                nuevoEmail &&
                usuarioExistente.email.toLowerCase() !==
                usuario.email.toLowerCase()
        );


    if (correoDuplicado) {

        alert(
            "El correo ingresado ya pertenece a otro usuario."
        );

        inputEmail?.focus();

        return;

    }


    /*
     * Cambio de contraseña.
     */
    const nuevaPassword =
        inputPasswordNueva
            ? inputPasswordNueva.value
            : "";

    const confirmacionPassword =
        inputPasswordConfirmar
            ? inputPasswordConfirmar.value
            : "";


    if (
        nuevaPassword !== "" ||
        confirmacionPassword !== ""
    ) {

        if (
            typeof validarPassword === "function" &&
            !validarPassword(nuevaPassword)
        ) {

            alert(
                "La contraseña debe tener entre 4 y 10 caracteres."
            );

            inputPasswordNueva?.focus();

            return;

        }


        if (
            nuevaPassword !==
            confirmacionPassword
        ) {

            alert(
                "Las contraseñas no coinciden."
            );

            inputPasswordConfirmar?.focus();

            return;

        }

    }


    /* -----------------------------------------------------
       ACTUALIZAR USUARIO
       ----------------------------------------------------- */

    const indice =
        obtenerIndiceUsuarioPerfil();


    if (indice === -1) {

        alert(
            "No se pudo encontrar el usuario."
        );

        return;

    }


    usuarios[indice].nombre =
        nuevoNombre;

    usuarios[indice].apellido =
        nuevoApellido;

    usuarios[indice].telefono =
        nuevoTelefono;

    usuarios[indice].email =
        nuevoEmail;


    if (nuevaPassword !== "") {

        usuarios[indice].password =
            nuevaPassword;

    }


    guardarUsuarios(
        usuarios
    );


    /*
     * Si cambió el correo, también actualizamos
     * la sesión activa.
     */
    const sesionActual =
        obtenerSesionActiva();


    if (sesionActual) {

        sesionActual.email =
            nuevoEmail;

        sesionActual.nombre =
            nuevoNombre;


        guardarSesion(
            sesionActual
        );

    }


    limpiarCamposPassword();

    cambiarModoEdicion(false);

    cargarDatosPerfil(
        usuarios[indice]
    );


    alert(
        "Los datos del perfil fueron actualizados correctamente."
    );

}


/**
 * Limpia los campos de contraseña.
 */
function limpiarCamposPassword() {

    const nueva =
        document.getElementById(
            "perfil-pass-nueva"
        );

    const confirmacion =
        document.getElementById(
            "perfil-pass-conf"
        );


    if (nueva) {
        nueva.value = "";
    }


    if (confirmacion) {
        confirmacion.value = "";
    }

}


/* =========================================================
   5. PESTAÑAS DEL PERFIL
   ========================================================= */

/**
 * Inicializa las pestañas del perfil.
 */
function inicializarTabsPerfil() {

    const botones =
        document.querySelectorAll(
            ".tab-btn, [data-target]"
        );


    if (botones.length === 0) {
        return;
    }


    botones.forEach(
        boton => {

            boton.addEventListener(
                "click",
                () => {

                    const targetId =
                        boton.getAttribute(
                            "data-target"
                        );


                    if (!targetId) {
                        return;
                    }


                    /*
                     * Desactivar todas las pestañas.
                     */
                    botones.forEach(
                        btn =>
                            btn.classList.remove(
                                "active"
                            )
                    );


                    boton.classList.add(
                        "active"
                    );


                    /*
                     * Ocultar todas las secciones.
                     */
                    document
                        .querySelectorAll(
                            ".tab-content"
                        )
                        .forEach(
                            seccion =>
                                seccion.classList.add(
                                    "d-none"
                                )
                        );


                    /*
                     * Mostrar la sección seleccionada.
                     */
                    const seccion =
                        document.getElementById(
                            targetId
                        );


                    if (seccion) {

                        seccion.classList.remove(
                            "d-none"
                        );

                    }

                }
            );

        }
    );

}


/* =========================================================
    6. DIRECCIONES
   ========================================================= */

/**
 * Renderiza las direcciones almacenadas.
 *
 * @param {Object} usuario
 */
function renderizarDirecciones(usuario) {

    const contenedor =
        document.getElementById(
            "contenedor-direcciones"
        );


    if (!contenedor) {
        return;
    }


    const direcciones =
        Array.isArray(
            usuario.direcciones
        )
            ? usuario.direcciones
            : [];


    if (direcciones.length === 0) {

        contenedor.innerHTML = `
            <p class="text-muted">
                No tienes direcciones guardadas.
            </p>
        `;

        return;

    }


    contenedor.innerHTML =
        direcciones
            .map(
                direccion => {

                    const ubicacion =
                        [
                            direccion.comuna ||
                                direccion.ciudad,

                            direccion.region
                        ]
                        .filter(Boolean)
                        .join(", ");


                    return `
                        <div class="direccion-item mb-3 p-3 border rounded">

                            <h3 class="h6 fw-bold mb-1">
                                ${direccion.nombre || "Dirección"}
                            </h3>

                            <p class="mb-1">
                                ${direccion.calle || ""}
                            </p>

                            <small class="text-muted">
                                ${ubicacion}
                            </small>

                        </div>
                    `;

                }
            )
            .join("");

}


/* =========================================================
   7. HISTORIAL DE PEDIDOS
   ========================================================= */

/**
 * Renderiza el historial de pedidos del usuario.
 *
 * @param {Object} usuario
 */
function renderizarPedidos(usuario) {

    const contenedor =
        document.querySelector(
            "#seccion-pedidos .card-body"
        );


    if (!contenedor) {
        return;
    }


    const pedidos =
        Array.isArray(
            usuario.pedidos
        )
            ? usuario.pedidos
            : [];


    if (pedidos.length === 0) {

        contenedor.innerHTML = `
            <h2 class="h4 fw-bold mb-4">
                Historial de Pedidos
            </h2>

            <p class="text-muted">
                Todavía no tienes pedidos registrados.
            </p>
        `;

        return;

    }


    let htmlPedidos = `
        <h2 class="h4 fw-bold mb-4">
            Historial de Pedidos
        </h2>
    `;


    pedidos.forEach(
        (pedido, indice) => {

            const productos =
                Array.isArray(
                    pedido.productos
                )
                    ? pedido.productos
                    : [];


            const detalleProductos =
                productos
                    .map(
                        producto => `
                            <li>
                                ${producto.nombre}
                                × ${producto.cantidad}
                            </li>
                        `
                    )
                    .join("");


            htmlPedidos += `
                <div class="pedido-item border rounded p-3 mb-3">

                    <div class="d-flex justify-content-between
                                align-items-center mb-2">

                        <strong>
                            Pedido #${indice + 1}
                        </strong>

                        <span class="badge bg-dark">
                            ${pedido.estado || "Confirmado"}
                        </span>

                    </div>


                    <p class="mb-2">
                        <strong>Fecha:</strong>
                        ${pedido.fecha || "Sin fecha"}
                    </p>


                    <p class="mb-2">
                        <strong>Total:</strong>
                        $${Number(
                            pedido.total || 0
                        ).toLocaleString("es-CL")}
                    </p>


                    <details>

                        <summary>
                            Ver productos
                        </summary>

                        <ul class="mt-2 mb-0">
                            ${detalleProductos}
                        </ul>

                    </details>

                </div>
            `;

        }
    );


    contenedor.innerHTML =
        htmlPedidos;

}