/*
===========================================================
RECTABAGS WEB
Archivo: main.js

Responsabilidad:
- Inicialización general de la aplicación.
- Carga de componentes comunes.
- Configuración de navegación.
- Actualización visual según la sesión.
- Funciones y utilidades generales.

IMPORTANTE:
Las funcionalidades específicas se separan en otros archivos:

- auth.js       → autenticación y usuarios
- perfil.js     → perfil, direcciones y pedidos
- carrito.js    → carrito de compras
- catalogo.js   → catálogo y filtros
- contacto.js   → formulario de contacto
- componentes.js → header y footer

===========================================================
*/


/* =========================================================
   1. INICIALIZACIÓN GENERAL
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    migrarAlmacenamientoLegacy();
    inicializarComponentes();
    inicializarNavegacion();
    actualizarSesionHeader();
    activarBuscador();

});


/* =========================================================
   2. CARGA DE COMPONENTES
   ========================================================= */

/**
 * Carga los componentes comunes de la página.
 *
 * Actualmente se utilizan:
 * - header.html
 * - footer.html
 *
 * Se utiliza fetch() para evitar repetir el mismo código HTML
 * en todas las páginas del proyecto.
 */
function inicializarComponentes() {

    cargarComponente("header.html", "header-container");
    cargarComponente("footer.html", "footer-container");

}


/**
 * Carga un archivo HTML dentro de un contenedor.
 *
 * @param {string} archivo - Nombre del archivo HTML.
 * @param {string} idContenedor - ID del elemento destino.
 */
async function cargarComponente(archivo, idContenedor) {

    const contenedor = document.getElementById(idContenedor);

    if (!contenedor) {
        return;
    }

    try {

        const respuesta = await fetch(archivo);

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const html = await respuesta.text();

        contenedor.innerHTML = html;

        /*
        El header se crea dinámicamente, por lo que una vez cargado
        debemos actualizar nuevamente los elementos relacionados
        con la sesión.
        */
        if (idContenedor === "header-container") {

            actualizarSesionHeader();
            inicializarNavegacion();
            activarBuscador();

        }

    } catch (error) {

        console.error(
            `No se pudo cargar el componente ${archivo}:`,
            error
        );

    }

}


/* =========================================================
   3. SESIÓN Y NAVEGACIÓN
   ========================================================= */

/**
 * Obtiene la sesión actualmente almacenada.
 *
 * @returns {Object|null}
 */
function obtenerSesion() {

    const sesion = localStorage.getItem("rectabags_sesion");

    if (!sesion) {
        return null;
    }

    try {

        return JSON.parse(sesion);

    } catch (error) {

        console.error("La sesión almacenada no es válida.");

        localStorage.removeItem("rectabags_sesion");

        return null;

    }

}


/**
 * Actualiza los elementos del header según el estado
 * de autenticación del usuario.
 *
 * Usuario no autenticado:
 * - Login
 * - Registro
 *
 * Usuario autenticado:
 * - Mi perfil
 * - Cerrar sesión
 */
function actualizarSesionHeader() {

    const sesion = obtenerSesion();

    const menuVisitante =
        document.getElementById("menu-visitante");

    const menuUsuario =
        document.getElementById("menu-usuario");

    const enlaceUsuario =
        document.getElementById("enlace-usuario-header");

    if (sesion) {

        if (menuVisitante) {
            menuVisitante.classList.add("d-none");
        }

        if (menuUsuario) {
            menuUsuario.classList.remove("d-none");
        }

        if (enlaceUsuario) {
            enlaceUsuario.href = "perfil_usuario.html";
        }

    } else {

        if (menuVisitante) {
            menuVisitante.classList.remove("d-none");
        }

        if (menuUsuario) {
            menuUsuario.classList.add("d-none");
        }

        if (enlaceUsuario) {
            enlaceUsuario.href = "login.html";
        }

    }

}


/**
 * Inicializa la navegación relacionada con la sesión.
 *
 * El cierre de sesión se maneja mediante delegación de eventos,
 * ya que el botón pertenece al header cargado dinámicamente.
 */
function inicializarNavegacion() {

    document.body.addEventListener("click", (evento) => {

        const elemento = evento.target.closest("#btn-logout");

        if (!elemento) {
            return;
        }

        evento.preventDefault();

        cerrarSesion();

    });

}


/**
 * Cierra la sesión actual.
 */
function cerrarSesion() {

    localStorage.removeItem("rectabags_sesion");

    window.location.href = "login.html";

}


/* =========================================================
   4. BUSCADOR GENERAL
   ========================================================= */

/**
 * Activa el buscador del header.
 *
 * En escritorio el campo de búsqueda permanece visible.
 * En resoluciones pequeñas se muestra al presionar el icono.
 */
function activarBuscador() {

    const botonBuscar =
        document.getElementById("btn-buscar");

    const inputBuscar =
        document.getElementById("input-buscar");

    const formularioBuscar =
        document.getElementById("form-buscar");

    if (!botonBuscar || !inputBuscar) {
        return;
    }

    /*
    Evitamos registrar múltiples eventos si el componente
    se vuelve a cargar.
    */
    if (botonBuscar.dataset.inicializado === "true") {
        return;
    }

    botonBuscar.dataset.inicializado = "true";

    botonBuscar.addEventListener("click", (evento) => {

        const estaOculto =
            inputBuscar.classList.contains("d-none");

        /*
        En dispositivos móviles:
        primer clic → mostrar buscador.
        */
        if (estaOculto) {

            evento.preventDefault();

            inputBuscar.classList.remove("d-none");
            inputBuscar.classList.add("d-block");

            inputBuscar.focus();

            return;
        }

        /*
        Si el usuario no ingresó texto, evitamos
        realizar una búsqueda vacía.
        */
        if (inputBuscar.value.trim() === "") {

            evento.preventDefault();

            if (window.innerWidth < 768) {

                inputBuscar.classList.add("d-none");
                inputBuscar.classList.remove("d-block");

            } else {

                inputBuscar.focus();

            }

        }

    });


    /*
    El formulario se mantiene preparado para que
    catalogo.js pueda utilizar el texto ingresado.
    */
    if (formularioBuscar &&
        formularioBuscar.dataset.inicializado !== "true") {

        formularioBuscar.dataset.inicializado = "true";

        formularioBuscar.addEventListener(
            "submit",
            (evento) => {

                const termino =
                    inputBuscar.value.trim();

                if (termino === "") {

                    evento.preventDefault();

                    return;

                }

            }
        );

    }

}


/* =========================================================
   5. UTILIDADES GENERALES
   ========================================================= */

/**
 * Obtiene el nombre de la página actual.
 *
 * @returns {string}
 */
function obtenerPaginaActual() {

    const ruta =
        window.location.pathname;

    return ruta
        .split("/")
        .pop();

}


/**
 * Comprueba si existe una sesión activa.
 *
 * @returns {boolean}
 */
function usuarioAutenticado() {

    return obtenerSesion() !== null;

}


/**
 * Redirige al login cuando el usuario no posee
 * una sesión activa.
 */
function protegerPagina() {

    if (!usuarioAutenticado()) {

        window.location.href =
            "login.html";

        return false;

    }

    return true;

}


/**
 * Obtiene los usuarios almacenados en localStorage.
 *
 * @returns {Array}
 */
function obtenerUsuarios() {

    const usuarios =
        localStorage.getItem(
            "rectabags_usuarios"
        );

    if (!usuarios) {
        return [];
    }

    try {

        return JSON.parse(usuarios);

    } catch (error) {

        console.error(
            "No fue posible leer los usuarios."
        );

        return [];

    }

}


/**
 * Guarda la lista de usuarios en localStorage.
 *
 * @param {Array} usuarios
 */
function guardarUsuarios(usuarios) {

    localStorage.setItem(
        "rectabags_usuarios",
        JSON.stringify(usuarios)
    );

}

function migrarAlmacenamientoLegacy() {

    const migraciones = [
        { antigua: "usuarios_rectabags", actual: "rectabags_usuarios" },
        { antigua: "sesion_rectabags", actual: "rectabags_sesion" }
    ];

    migraciones.forEach(({ antigua, actual }) => {

        const valorAntiguo = localStorage.getItem(antigua);
        const valorActual = localStorage.getItem(actual);

        if (valorAntiguo !== null && valorActual === null) {
            localStorage.setItem(actual, valorAntiguo);
        }

        if (valorAntiguo !== null) {
            localStorage.removeItem(antigua);
        }

    });

}