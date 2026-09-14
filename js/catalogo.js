/*
===========================================================
RECTABAGS WEB
Archivo: catalogo.js

Responsabilidad:
- Filtrar productos por categoría.
- Buscar productos por nombre o descripción.
- Mostrar y ocultar tarjetas.
- Actualizar el estado visual de los filtros.
- Mostrar mensaje cuando no existen resultados.

Dependencias:
- main.js
- Bootstrap 5

Página principal:
- catalogo.html

===========================================================
*/


/* =========================================================
   1. VARIABLES
   ========================================================= */

let tarjetasProductos = [];
let enlacesFiltros = [];
let terminoBusqueda = "";
let categoriaSeleccionada = "all";


/* =========================================================
   2. INICIALIZACIÓN
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        inicializarCatalogo();

    }
);


/**
 * Inicializa todas las funciones del catálogo.
 */
function inicializarCatalogo() {

    const catalogo =
        document.querySelector(
            ".catalog-grid"
        );


    /*
     * Si la página actual no posee catálogo,
     * no ejecutamos este módulo.
     */
    if (!catalogo) {
        return;
    }


    obtenerElementosCatalogo();

    inicializarFiltros();

    inicializarBusqueda();

    mostrarProductos();

}


/* =========================================================
   3. OBTENER ELEMENTOS
   ========================================================= */

/**
 * Obtiene los filtros y tarjetas presentes
 * en la página de catálogo.
 */
function obtenerElementosCatalogo() {

    enlacesFiltros =
        Array.from(
            document.querySelectorAll(
                ".filter-link"
            )
        );


    tarjetasProductos =
        Array.from(
            document.querySelectorAll(
                ".catalog-grid .card"
            )
        );

}


/* =========================================================
   4. FILTROS POR CATEGORÍA
   ========================================================= */

/**
 * Inicializa los botones de categorías.
 */
function inicializarFiltros() {

    enlacesFiltros.forEach(
        enlace => {

            enlace.addEventListener(
                "click",
                evento => {

                    evento.preventDefault();


                    const categoria =
                        enlace.getAttribute(
                            "data-filter"
                        );


                    if (!categoria) {
                        return;
                    }


                    categoriaSeleccionada =
                        categoria;


                    actualizarEstadoFiltro(
                        enlace
                    );


                    mostrarProductos();

                }
            );

        }
    );

}


/**
 * Actualiza visualmente el filtro seleccionado.
 *
 * @param {HTMLElement} filtroActivo
 */
function actualizarEstadoFiltro(
    filtroActivo
) {

    enlacesFiltros.forEach(
        enlace => {

            enlace.classList.remove(
                "active"
            );

        }
    );


    filtroActivo.classList.add(
        "active"
    );

}


/* =========================================================
   5. BÚSQUEDA
   ========================================================= */

/**
 * Inicializa el buscador del header.
 *
 * El header se carga dinámicamente desde main.js,
 * por lo que se utiliza un MutationObserver para
 * esperar a que el formulario exista.
 */
function inicializarBusqueda() {

    configurarFormularioBusqueda();


    const contenedorHeader =
        document.getElementById(
            "header-container"
        );


    if (!contenedorHeader) {
        return;
    }


    /*
     * Observamos los cambios realizados dentro
     * del contenedor del header.
     */
    const observador =
        new MutationObserver(
            () => {

                configurarFormularioBusqueda();

            }
        );


    observador.observe(
        contenedorHeader,
        {
            childList: true,
            subtree: true
        }
    );

}


/**
 * Configura el formulario de búsqueda si todavía
 * no ha sido inicializado.
 */
function configurarFormularioBusqueda() {

    const formulario =
        document.getElementById(
            "form-buscar"
        );


    const input =
        document.getElementById(
            "input-buscar"
        );


    if (!formulario || !input) {
        return;
    }


    /*
     * Evitamos registrar el mismo evento varias veces.
     */
    if (
        formulario.dataset.catalogoInicializado ===
        "true"
    ) {

        return;

    }


    formulario.dataset.catalogoInicializado =
        "true";


    formulario.addEventListener(
        "submit",
        evento => {

            evento.preventDefault();


            terminoBusqueda =
                input.value
                    .trim()
                    .toLowerCase();


            /*
             * Si el usuario elimina el texto,
             * se muestran nuevamente todos los productos
             * respetando el filtro actual.
             */
            mostrarProductos();

        }
    );


    /*
     * Búsqueda dinámica mientras el usuario escribe.
     */
    input.addEventListener(
        "input",
        () => {

            terminoBusqueda =
                input.value
                    .trim()
                    .toLowerCase();


            mostrarProductos();

        }
    );

}


/* =========================================================
   6. FILTRAR PRODUCTOS
   ========================================================= */

/**
 * Determina si una tarjeta corresponde
 * a la categoría seleccionada.
 *
 * @param {HTMLElement} tarjeta
 * @returns {boolean}
 */
function coincideCategoria(
    tarjeta
) {

    if (
        categoriaSeleccionada ===
        "all"
    ) {

        return true;

    }


    const categoria =
        tarjeta.getAttribute(
            "data-category"
        );


    return (
        categoria ===
        categoriaSeleccionada
    );

}


/**
 * Determina si una tarjeta coincide
 * con el texto de búsqueda.
 *
 * Se revisan:
 * - Nombre
 * - Descripción
 *
 * @param {HTMLElement} tarjeta
 * @returns {boolean}
 */
function coincideBusqueda(
    tarjeta
) {

    /*
     * Si no hay búsqueda,
     * todos los productos coinciden.
     */
    if (
        terminoBusqueda === ""
    ) {

        return true;

    }


    const nombre =
        tarjeta
            .querySelector("h3")
            ?.textContent
            .toLowerCase() || "";


    const descripcion =
        tarjeta
            .querySelector("p")
            ?.textContent
            .toLowerCase() || "";


    return (
        nombre.includes(
            terminoBusqueda
        ) ||
        descripcion.includes(
            terminoBusqueda
        )
    );

}


/* =========================================================
   7. MOSTRAR PRODUCTOS
   ========================================================= */

/**
 * Aplica simultáneamente:
 *
 * - Filtro por categoría.
 * - Búsqueda por texto.
 *
 * También actualiza el mensaje de resultados.
 */
function mostrarProductos() {

    if (
        tarjetasProductos.length ===
        0
    ) {

        return;

    }


    let productosVisibles = 0;


    tarjetasProductos.forEach(
        tarjeta => {

            const perteneceCategoria =
                coincideCategoria(
                    tarjeta
                );


            const coincideTexto =
                coincideBusqueda(
                    tarjeta
                );


            const mostrar =
                perteneceCategoria &&
                coincideTexto;


            if (mostrar) {

                tarjeta.style.display =
                    "";

                productosVisibles++;

            } else {

                tarjeta.style.display =
                    "none";

            }

        }
    );


    mostrarMensajeSinResultados(
        productosVisibles
    );

}


/* =========================================================
   8. MENSAJE SIN RESULTADOS
   ========================================================= */

/**
 * Crea o actualiza el mensaje que se muestra
 * cuando no existen productos que coincidan
 * con la búsqueda y/o categoría.
 *
 * @param {number} cantidad
 */
function mostrarMensajeSinResultados(
    cantidad
) {

    const catalogo =
        document.querySelector(
            ".catalog-grid"
        );


    if (!catalogo) {
        return;
    }


    let mensaje =
        document.getElementById(
            "mensaje-sin-resultados"
        );


    /*
     * Crear el mensaje la primera vez.
     */
    if (!mensaje) {

        mensaje =
            document.createElement(
                "div"
            );


        mensaje.id =
            "mensaje-sin-resultados";


        mensaje.className =
            "text-center py-5";


        /*
         * Lo colocamos después del grid.
         */
        catalogo.insertAdjacentElement(
            "afterend",
            mensaje
        );

    }


    if (
        cantidad === 0
    ) {

        mensaje.innerHTML = `
            <h2 class="h5 fw-bold">
                No encontramos productos
            </h2>

            <p class="text-secondary mb-3">
                Prueba con otra categoría
                o modifica tu búsqueda.
            </p>

            <button
                type="button"
                class="btn btn-dark rounded-pill px-4"
                id="btn-limpiar-filtros"
            >
                Ver todos los productos
            </button>
        `;


        mensaje.classList.remove(
            "d-none"
        );


        const btnLimpiar =
            document.getElementById(
                "btn-limpiar-filtros"
            );


        if (btnLimpiar) {

            btnLimpiar.addEventListener(
                "click",
                limpiarFiltros
            );

        }

    } else {

        mensaje.classList.add(
            "d-none"
        );

    }

}


/* =========================================================
   9. LIMPIAR FILTROS
   ========================================================= */

/**
 * Restablece el catálogo a su estado inicial.
 */
function limpiarFiltros() {

    categoriaSeleccionada =
        "all";


    terminoBusqueda =
        "";


    const input =
        document.getElementById(
            "input-buscar"
        );


    if (input) {

        input.value =
            "";

    }


    const filtroTodos =
        enlacesFiltros.find(
            enlace =>
                enlace.getAttribute(
                    "data-filter"
                ) === "all"
        );


    if (filtroTodos) {

        actualizarEstadoFiltro(
            filtroTodos
        );

    }


    mostrarProductos();

}


/* =========================================================
   10. FUNCIONES PÚBLICAS
   ========================================================= */

/*
 * Se exponen únicamente las funciones que podrían
 * necesitarse desde HTML u otros módulos.
 */
window.mostrarProductos =
    mostrarProductos;

window.limpiarFiltros =
    limpiarFiltros;