/*
===========================================================
RECTABAGS WEB
Archivo: contacto.js

Responsabilidad:
- Gestión del formulario de contacto.
- Validación de datos básicos.
- Mostrar confirmación de envío.
- Limpieza del formulario.

Dependencias:
- main.js
- Bootstrap 5

Página:
- contacto.html

===========================================================
*/


/* =========================================================
   1. INICIALIZACIÓN
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        inicializarFormularioContacto();

    }
);


/* =========================================================
   2. FORMULARIO DE CONTACTO
   ========================================================= */

/**
 * Inicializa el formulario de contacto.
 */
function inicializarFormularioContacto() {

    const formulario =
        document.getElementById(
            "form-contacto"
        );


    /*
     * Si no estamos en contacto.html,
     * simplemente no hacemos nada.
     */
    if (!formulario) {
        return;
    }


    /*
     * Evitamos registrar el evento más de una vez.
     */
    if (
        formulario.dataset.initialized ===
        "true"
    ) {

        return;

    }


    formulario.dataset.initialized =
        "true";


    formulario.addEventListener(
        "submit",
        manejarEnvioContacto
    );

}


/* =========================================================
   3. ENVÍO DEL FORMULARIO
   ========================================================= */

/**
 * Procesa el envío del formulario de contacto.
 *
 * Actualmente el proyecto corresponde a un frontend,
 * por lo que el mensaje se simula como enviado.
 *
 * @param {SubmitEvent} evento
 */
function manejarEnvioContacto(
    evento
) {

    evento.preventDefault();


    /* -----------------------------------------------------
       OBTENER CAMPOS
       ----------------------------------------------------- */

    const nombre =
        document
            .getElementById(
                "nombre-contacto"
            );


    const email =
        document
            .getElementById(
                "email-contacto"
            );


    const mensaje =
        document
            .getElementById(
                "mensaje-contacto"
            );


    /* -----------------------------------------------------
       VALIDACIÓN DE ELEMENTOS
       ----------------------------------------------------- */

    if (
        !nombre ||
        !email ||
        !mensaje
    ) {

        console.error(
            "No se encontraron todos los campos del formulario."
        );

        return;

    }


    /* -----------------------------------------------------
       OBTENER VALORES
       ----------------------------------------------------- */

    const nombreValor =
        nombre.value.trim();


    const emailValor =
        email.value
            .trim()
            .toLowerCase();


    const mensajeValor =
        mensaje.value.trim();


    /* -----------------------------------------------------
       VALIDAR NOMBRE
       ----------------------------------------------------- */

    if (
        nombreValor === ""
    ) {

        alert(
            "Por favor, ingresa tu nombre."
        );

        nombre.focus();

        return;

    }


    /* -----------------------------------------------------
       VALIDAR EMAIL
       ----------------------------------------------------- */

    if (
        emailValor === ""
    ) {

        alert(
            "Por favor, ingresa tu correo electrónico."
        );

        email.focus();

        return;

    }


    /*
     * Reutilizamos la función de main.js si existe.
     * Si no existe, utilizamos una validación local.
     */
    if (
        typeof validarEmail ===
        "function"
    ) {

        if (
            !validarEmail(
                emailValor
            )
        ) {

            alert(
                "Ingresa un correo electrónico válido."
            );

            email.focus();

            return;

        }

    } else {

        const patronEmail =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !patronEmail.test(
                emailValor
            )
        ) {

            alert(
                "Ingresa un correo electrónico válido."
            );

            email.focus();

            return;

        }

    }


    /* -----------------------------------------------------
       VALIDAR MENSAJE
       ----------------------------------------------------- */

    if (
        mensajeValor === ""
    ) {

        alert(
            "Por favor, escribe un mensaje."
        );

        mensaje.focus();

        return;

    }


    /*
     * Máximo definido para el formulario.
     */
    if (
        mensajeValor.length > 500
    ) {

        alert(
            "El mensaje no puede superar los 500 caracteres."
        );

        mensaje.focus();

        return;

    }


    /* -----------------------------------------------------
       MOSTRAR CONFIRMACIÓN
       ----------------------------------------------------- */

    mostrarConfirmacionContacto();


    /* -----------------------------------------------------
       LIMPIAR FORMULARIO
       ----------------------------------------------------- */

    formularioResetContacto(
        nombre,
        email,
        mensaje
    );

}


/* =========================================================
   4. CONFIRMACIÓN
   ========================================================= */

/**
 * Muestra el mensaje de confirmación de envío.
 */
function mostrarConfirmacionContacto() {

    const alerta =
        document.getElementById(
            "alerta-contacto"
        );


    const formulario =
        document.getElementById(
            "form-contacto"
        );


    /*
     * Si existe un mensaje Bootstrap,
     * lo mostramos.
     */
    if (alerta) {

        alerta.classList.remove(
            "d-none"
        );


        alerta.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }


    /*
     * Si el diseño utiliza una sección
     * independiente para el formulario,
     * podemos ocultarlo después del envío.
     *
     * Esta parte solo se ejecuta si el elemento
     * correspondiente existe.
     */
    const contenedorFormulario =
        document.getElementById(
            "contenedor-formulario-contacto"
        );


    if (
        contenedorFormulario
    ) {

        contenedorFormulario.classList.add(
            "d-none"
        );

    }

}


/* =========================================================
   5. LIMPIEZA DEL FORMULARIO
   ========================================================= */

/**
 * Limpia los campos del formulario.
 *
 * @param {HTMLElement} nombre
 * @param {HTMLElement} email
 * @param {HTMLElement} mensaje
 */
function formularioResetContacto(
    nombre,
    email,
    mensaje
) {

    nombre.value =
        "";

    email.value =
        "";

    mensaje.value =
        "";


    /*
     * El formulario HTML5 puede restaurarse
     * completamente si se agregan nuevos campos.
     */
    const formulario =
        document.getElementById(
            "form-contacto"
        );


    if (formulario) {

        /*
         * No utilizamos formulario.reset()
         * directamente antes de mostrar la confirmación
         * para evitar alterar otros controles de la interfaz.
         */

    }

}