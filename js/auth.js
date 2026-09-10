/*
===========================================================
RECTABAGS WEB
Archivo: auth.js

Responsabilidad:
- Registro de usuarios.
- Inicio de sesión.
- Cierre de sesión.
- Recuperación de contraseña.
- Gestión de sesión mediante localStorage.
- Gestión básica de usuarios.
- Protección de páginas relacionadas con autenticación.
- Migración del carrito invitado después del inicio de sesión.

NO contiene:
- Gestión general del carrito.
- Catálogo.
- Perfil.
- Direcciones.
- Pedidos.
- Header/Footer.

===========================================================
*/


/* =========================================================
    1. CONFIGURACIÓN
   ========================================================= */

/*
 * Claves utilizadas para almacenar información en localStorage.
 *
 * Se utiliza una sola clave para cada tipo de información.
 * Esto evita mantener información duplicada entre distintas
 * claves utilizadas durante versiones anteriores del proyecto.
 */
const CLAVE_USUARIOS = "rectabags_usuarios";
const CLAVE_SESION = "rectabags_sesion";


/* =========================================================
    2. GESTIÓN DE USUARIOS
   ========================================================= */

/**
 * Obtiene todos los usuarios registrados.
 *
 * @returns {Array} Lista de usuarios.
 */
function obtenerUsuarios() {

    const datos = localStorage.getItem(CLAVE_USUARIOS);

    if (!datos) {
        return [];
    }

    try {

        const usuarios = JSON.parse(datos);

        return Array.isArray(usuarios)
            ? usuarios
            : [];

    } catch (error) {

        console.error(
            "No fue posible leer los usuarios almacenados."
        );

        return [];

    }

}


/**
 * Guarda la lista de usuarios en localStorage.
 *
 * @param {Array} usuarios - Lista de usuarios.
 */
function guardarUsuarios(usuarios) {

    localStorage.setItem(
        CLAVE_USUARIOS,
        JSON.stringify(usuarios)
    );

}


/* =========================================================
    3. GESTIÓN DE SESIÓN
   ========================================================= */

/**
 * Obtiene la sesión actualmente activa.
 *
 * @returns {Object|null} Datos de la sesión o null.
 */
function obtenerSesionActiva() {

    const datos =
        localStorage.getItem(CLAVE_SESION);

    if (!datos) {
        return null;
    }

    try {

        return JSON.parse(datos);

    } catch (error) {

        console.error(
            "La sesión almacenada no es válida."
        );

        eliminarSesion();

        return null;

    }

}


/**
 * Guarda la sesión del usuario actual.
 *
 * @param {Object} sesion - Información de la sesión.
 */
function guardarSesion(sesion) {

    localStorage.setItem(
        CLAVE_SESION,
        JSON.stringify(sesion)
    );

}


/**
 * Elimina la sesión actual.
 */
function eliminarSesion() {

    localStorage.removeItem(CLAVE_SESION);

}


/**
 * Comprueba si existe una sesión activa.
 *
 * @returns {boolean}
 */
function usuarioAutenticado() {

    return obtenerSesionActiva() !== null;

}

/**
 * Migra los productos agregados como invitado al carrito
 * del usuario que acaba de iniciar sesión.
 *
 * Si el usuario ya tenía productos guardados, ambos carritos
 * se combinan sin duplicar productos.
 *
 * @param {string} email - Correo del usuario autenticado.
 */
function migrarCarritoInvitadoAUsuario(email) {

    if (!email) {
        return;
    }

    const claveInvitado =
        "recta_carrito_invitado";

    const claveUsuario =
        `recta_carrito_${email.toLowerCase()}`;

    const datosInvitado =
        localStorage.getItem(claveInvitado);

    if (!datosInvitado) {
        return;
    }

    try {

        const carritoInvitado =
            JSON.parse(datosInvitado);

        const datosUsuario =
            localStorage.getItem(claveUsuario);

        const carritoUsuario =
            datosUsuario
                ? JSON.parse(datosUsuario)
                : [];

        const invitadoValido =
            Array.isArray(carritoInvitado)
                ? carritoInvitado
                : [];

        const usuarioValido =
            Array.isArray(carritoUsuario)
                ? carritoUsuario
                : [];

        invitadoValido.forEach(producto => {

            const productoExistente =
                usuarioValido.find(
                    item => item.id === producto.id
                );

            if (productoExistente) {

                productoExistente.cantidad =
                    Number(productoExistente.cantidad || 0) +
                    Number(producto.cantidad || 0);

            } else {

                usuarioValido.push(producto);

            }

        });

        localStorage.setItem(
            claveUsuario,
            JSON.stringify(usuarioValido)
        );

        localStorage.removeItem(claveInvitado);

    } catch (error) {

        console.error(
            "No fue posible migrar el carrito de invitado."
        );

    }

}


/* =========================================================
    4. VALIDACIONES BÁSICAS
   ========================================================= */

/**
 * Valida el formato básico de un correo electrónico.
 *
 * @param {string} email
 * @returns {boolean}
 */
function validarEmail(email) {

    const patron =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return patron.test(email);

}


/**
 * Valida que el correo pertenezca a uno de los dominios
 * definidos para el proyecto.
 *
 * Dominios permitidos:
 * - gmail.com
 * - profesor.duoc.cl
 * - duocuc.cl
 *
 * @param {string} email
 * @returns {boolean}
 */
function validarDominioEmail(email) {

    const dominiosPermitidos = [
        "@gmail.com",
        "@profesor.duoc.cl",
        "@duocuc.cl"
    ];

    const correoNormalizado =
        email.toLowerCase();

    return dominiosPermitidos.some(
        dominio =>
            correoNormalizado.endsWith(dominio)
    );

}


/**
 * Comprueba que una contraseña tenga una longitud
 * entre 4 y 10 caracteres.
 *
 * @param {string} password
 * @returns {boolean}
 */
function validarPassword(password) {

    return (
        password.length >= 4 &&
        password.length <= 10
    );

}


/* =========================================================
    5. REGISTRO
   ========================================================= */

/**
 * Registra un nuevo usuario.
 *
 * La dirección se almacena inicialmente como "Principal"
 * cuando el formulario de registro proporciona una dirección.
 */
function inicializarRegistro() {

    const formulario =
        document.getElementById("form-registro");

    if (!formulario) {
        return;
    }

    if (formulario.dataset.initialized === "true") {
        return;
    }

    formulario.dataset.initialized = "true";


    formulario.addEventListener("submit", (evento) => {

        evento.preventDefault();


        /* ---------------------------------------------
            Obtener elementos del formulario
           --------------------------------------------- */

        const inputEmail =
            document.getElementById("email");

        const inputPassword =
            document.getElementById("password");

        const inputNombre =
            document.getElementById("nombre");

        const inputApellido =
            document.getElementById("apellido");

        const inputRut =
            document.getElementById("rut");

        const inputTelefono =
            document.getElementById("telefono");


        if (!inputEmail || !inputPassword) {
            return;
        }


        /* ---------------------------------------------
            Obtener valores
           --------------------------------------------- */

        const email =
            inputEmail.value.trim().toLowerCase();

        const password =
            inputPassword.value.trim();

        const nombre =
            inputNombre
                ? inputNombre.value.trim()
                : "";

        const apellido =
            inputApellido
                ? inputApellido.value.trim()
                : "";

        const rut =
            inputRut
                ? inputRut.value.trim()
                : "";

        const telefono =
            inputTelefono
                ? inputTelefono.value.trim()
                : "";


        /* ---------------------------------------------
            Validación de correo
           --------------------------------------------- */

        if (!validarEmail(email)) {

            alert(
                "Ingresa un correo electrónico válido."
            );

            inputEmail.focus();

            return;
        }


        if (!validarDominioEmail(email)) {

            alert(
                "El correo debe pertenecer a un dominio permitido: " +
                "gmail.com, profesor.duoc.cl o duocuc.cl."
            );

            inputEmail.focus();

            return;
        }


        /* ---------------------------------------------
            Validación de contraseña
           --------------------------------------------- */

        if (!validarPassword(password)) {

            alert(
                "La contraseña debe tener entre 4 y 10 caracteres."
            );

            inputPassword.focus();

            return;
        }


        /* ---------------------------------------------
            Obtener usuarios existentes
           --------------------------------------------- */

        const usuarios =
            obtenerUsuarios();


        /* ---------------------------------------------
            Comprobar correo duplicado
           --------------------------------------------- */

        const usuarioExistente =
            usuarios.some(
                usuario =>
                    usuario.email &&
                    usuario.email.toLowerCase() === email
            );


        if (usuarioExistente) {

            alert(
                "Este correo ya está registrado."
            );

            inputEmail.focus();

            return;
        }


        /* ---------------------------------------------
            Dirección inicial
           --------------------------------------------- */

        const direcciones = [];

        const inputDireccion =
            document.getElementById("direccion");

        const selectRegion =
            document.getElementById("region");

        const selectComuna =
            document.getElementById("comuna");


        const direccion =
            inputDireccion
                ? inputDireccion.value.trim()
                : "";


        if (direccion !== "") {

            const region =
                selectRegion &&
                selectRegion.selectedIndex > 0
                    ? selectRegion.options[
                        selectRegion.selectedIndex
                    ].text
                    : "";

            const comuna =
                selectComuna &&
                selectComuna.selectedIndex > 0
                    ? selectComuna.options[
                        selectComuna.selectedIndex
                    ].text
                    : "";

        if (
            direccion !== "" &&
            (
                region === "" ||
                comuna === ""
            )
        ) {

            alert(
                "Si ingresas una dirección, debes seleccionar también la región y comuna."
            );

            return;

        }

            direcciones.push({
                nombre: "Principal",
                region: region,
                comuna: comuna,
                calle: direccion
            });

        }


        /* ---------------------------------------------
            Crear nuevo usuario
           --------------------------------------------- */

        const nuevoUsuario = {

            email: email,

            password: password,

            nombre:
                nombre ||
                email.split("@")[0],

            apellido: apellido,

            rut: rut,

            telefono: telefono,

            rol: "cliente",

            direcciones: direcciones,

            pedidos: []

        };


        /* ---------------------------------------------
            Guardar usuario
           --------------------------------------------- */

        usuarios.push(nuevoUsuario);

        guardarUsuarios(usuarios);


        alert(
            "Cuenta creada con éxito. " +
            "Ahora puedes iniciar sesión."
        );


        window.location.href =
            "login.html";

    });

}


/* =========================================================
    6. INICIO DE SESIÓN
   ========================================================= */

/**
 * Inicializa el formulario de inicio de sesión.
 */
function inicializarLogin() {

    const formulario =
        document.getElementById("form-login");

    if (!formulario) {
        return;
    }

    if (formulario.dataset.initialized === "true") {
        return;
    }

    formulario.dataset.initialized = "true";


    formulario.addEventListener("submit", (evento) => {

        evento.preventDefault();


        /* ---------------------------------------------
            Obtener campos
           --------------------------------------------- */

        const inputEmail =
            document.getElementById("email-login") ||
            document.getElementById("email");

        const inputPassword =
            document.getElementById("pass-login") ||
            document.getElementById("password");


        if (!inputEmail || !inputPassword) {
            return;
        }


        const email =
            inputEmail.value.trim().toLowerCase();

        const password =
            inputPassword.value.trim();


        /* ---------------------------------------------
            Cuenta administrativa de demostración
           --------------------------------------------- */

        if (
            (
                email === "admin" ||
                email === "admin@rectabags.com"
            ) &&
            password === "admin"
        ) {

            const sesionAdministrador = {

                email: email,

                nombre: "Administrador",

                rol: "admin"

            };


            guardarSesion(
                sesionAdministrador
            );


            /*
             * Actualmente el proyecto utiliza
             * perfil_usuario.html como entrada posterior
             * al login.
             */
            window.location.href =
                "perfil_usuario.html";

            return;
        }


        /* ---------------------------------------------
            Buscar usuario
           --------------------------------------------- */

        const usuarios =
            obtenerUsuarios();


        const usuarioEncontrado =
            usuarios.find(
                usuario =>
                    usuario.email &&
                    usuario.email.toLowerCase() === email
            );


        /* ---------------------------------------------
            Validar credenciales
           --------------------------------------------- */

        if (
            !usuarioEncontrado ||
            usuarioEncontrado.password !== password
        ) {

            alert(
                "Correo o contraseña incorrectos."
            );

            return;
        }


        /* ---------------------------------------------
            Crear sesión
           --------------------------------------------- */

        const sesionCliente = {

            email:
                usuarioEncontrado.email,

            nombre:
                usuarioEncontrado.nombre ||
                usuarioEncontrado.email.split("@")[0],

            rol:
                usuarioEncontrado.rol || "cliente"

        };


        guardarSesion(
            sesionCliente
        );

        
        /*
        * Si el usuario agregó productos antes de iniciar
        * sesión, los trasladamos a su carrito personal.
        */
        migrarCarritoInvitadoAUsuario(
            sesionCliente.email
        );


        /* ---------------------------------------------
            Redirección
           --------------------------------------------- */

        const destinoDespuesLogin =
            sessionStorage.getItem(
                "rectabags_redireccion_login"
            ) || "perfil_usuario.html";

        sessionStorage.removeItem(
            "rectabags_redireccion_login"
        );

        window.location.href =
            destinoDespuesLogin;

    });

}


/* =========================================================
    7. CERRAR SESIÓN
   ========================================================= */

/**
 * Inicializa los botones de cierre de sesión.
 *
 * Se utiliza delegación de eventos porque algunos botones
 * pueden pertenecer al header cargado dinámicamente.
 */
function inicializarLogout() {

    document.body.addEventListener(
        "click",
        (evento) => {

            const boton =
                evento.target.closest(
                    "#btn-logout, #btn-logout-perfil"
                );


            if (!boton) {
                return;
            }


            evento.preventDefault();


            eliminarSesion();


            window.location.href =
                "login.html";

        }
    );

}

/* =========================================================
    8. RECUPERACIÓN DE CONTRASEÑA
   ========================================================= */

/**
 * Normaliza un RUT para poder compararlo
 * sin importar puntos, espacios o K minúscula.
 *
 * @param {string} rut
 * @returns {string}
 */
function normalizarRut(rut) {

    return String(rut || "")
        .replace(/\./g, "")
        .replace(/\s/g, "")
        .toUpperCase();

}


/**
 * Inicializa el formulario de recuperación de contraseña.
 */
function inicializarRecuperacionContrasena() {

    const formulario =
        document.getElementById(
            "form-recuperar"
        );

    /*
     * Si estamos en otra página,
     * el formulario no existirá.
     */
    if (!formulario) {
        return;
    }

    /*
     * Evitar inicialización duplicada.
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
        (evento) => {

            evento.preventDefault();


            const inputEmail =
                document.getElementById(
                    "recuperar-email"
                );

            const inputRut =
                document.getElementById(
                    "recuperar-rut"
                );

            const inputNuevaPassword =
                document.getElementById(
                    "nueva-pass"
                );

            const inputConfirmacion =
                document.getElementById(
                    "confirm-nueva-pass"
                );


            if (
                !inputEmail ||
                !inputRut ||
                !inputNuevaPassword ||
                !inputConfirmacion
            ) {

                console.error(
                    "No se encontraron todos los campos de recuperación."
                );

                return;
            }


            const email =
                inputEmail.value
                    .trim()
                    .toLowerCase();

            const rut =
                normalizarRut(
                    inputRut.value
                );

            const nuevaPassword =
                inputNuevaPassword.value.trim();

            const confirmacion =
                inputConfirmacion.value.trim();


            /* VALIDAR EMAIL */

            if (
                !validarEmail(email)
            ) {

                alert(
                    "Ingresa un correo electrónico válido."
                );

                inputEmail.focus();

                return;
            }


            /* VALIDAR RUT */

            if (
                rut === ""
            ) {

                alert(
                    "Ingresa el RUT asociado a tu cuenta."
                );

                inputRut.focus();

                return;
            }


            /* VALIDAR CONTRASEÑA */

            if (
                !validarPassword(
                    nuevaPassword
                )
            ) {

                alert(
                    "La nueva contraseña debe tener entre 4 y 10 caracteres."
                );

                inputNuevaPassword.focus();

                return;
            }


            /* COMPARAR CONTRASEÑAS */

            if (
                nuevaPassword !==
                confirmacion
            ) {

                alert(
                    "Las contraseñas no coinciden."
                );

                inputConfirmacion.focus();

                return;
            }


            /* BUSCAR USUARIO */

            const usuarios =
                obtenerUsuarios();


            const indiceUsuario =
                usuarios.findIndex(
                    (usuario) => {

                        const mismoEmail =
                            usuario.email &&
                            usuario.email
                                .toLowerCase() ===
                            email;

                        const mismoRut =
                            normalizarRut(
                                usuario.rut
                            ) === rut;

                        return (
                            mismoEmail &&
                            mismoRut
                        );

                    }
                );


            if (
                indiceUsuario === -1
            ) {

                alert(
                    "Los datos ingresados no coinciden con una cuenta registrada."
                );

                return;
            }


            /* ACTUALIZAR CONTRASEÑA */

            usuarios[
                indiceUsuario
            ].password =
                nuevaPassword;


            guardarUsuarios(
                usuarios
            );


            /*
             * Si casualmente existía una sesión de
             * ese mismo usuario, la cerramos.
             */
            const sesion =
                obtenerSesionActiva();


            if (
                sesion &&
                sesion.email &&
                sesion.email
                    .toLowerCase() ===
                email
            ) {

                eliminarSesion();

            }


            alert(
                "Contraseña actualizada correctamente. Ahora puedes iniciar sesión."
            );


            window.location.href =
                "login.html";

        }
    );

}


/* =========================================================
    9. PROTECCIÓN DE PÁGINAS
   ========================================================= */

/**
 * Evita que un usuario con sesión activa vuelva
 * innecesariamente a login o registro.
 */
function protegerPaginasAuth() {

    const paginaActual =
        obtenerPaginaActual();


    const sesion =
        obtenerSesionActiva();


    /*
     * Si ya inició sesión, no debería volver
     * a las páginas de login o registro.
     */
    if (
        sesion &&
        (
            paginaActual === "login.html" ||
            paginaActual === "registro.html"
        )
    ) {

        window.location.href =
            "perfil_usuario.html";

        return;

    }

}


/**
 * Obtiene el nombre del archivo HTML actual.
 *
 * @returns {string}
 */
function obtenerPaginaActual() {

    const ruta =
        window.location.pathname;

    return (
        ruta.split("/").pop()
    ) || "home.html";

}


/* =========================================================
    10. INICIALIZACIÓN
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        protegerPaginasAuth();

        inicializarRegistro();

        inicializarLogin();

        inicializarRecuperacionContrasena();

        inicializarLogout();

    }
);