document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // COMPONENTES MODULARES (MODO OFFLINE)
    // ==========================================

    const componenteHeader = `
    <!-- ================= HEADER / NAVBAR ================= -->
    <header class="header-principal fixed-top bg-black text-white py-3">
        <div class="container-fluid px-4 d-flex justify-content-between align-items-center">

            <!-- Bloque izquierdo: Menú y Buscador -->
            <div class="header-left d-flex align-items-center gap-3">
                <button class="btn btn-link p-0" aria-label="Menú" data-bs-toggle="offcanvas" data-bs-target="#menuLateral" aria-controls="menuLateral">
                    <img src="img/HEADER/icons8-menu-50.png" alt="Menú" class="icono-nav" />
                </button>
                <form id="form-buscar" class="d-flex align-items-center m-0" role="search">
                    <input id="input-buscar" class="form-control form-control-sm me-2 bg-dark border-secondary text-white d-none d-md-block" type="search" placeholder="Buscar..." aria-label="Search"/>
                    <button id="btn-buscar" class="btn btn-link p-0" aria-label="Buscar" type="submit">
                        <img src="img/HEADER/icons8-search-50.png" alt="Buscar" class="icono-nav"/>
                    </button>
                </form>
            </div>

            <!-- Bloque central: Logo y Eslogan -->
            <div class="header-center text-center">
                <a href="home.html">
                    <img src="img/HEADER/Logo R.jpg" alt="Recta" class="logo-img"/>
                </a>
                <p class="eslogan m-0 small mt-1">“De ciclista para ciclistas”</p>
            </div>

            <!-- Bloque derecho: Usuario y Carrito -->
            <div class="header-right d-flex gap-3">
                <!-- Se agregó el ID "enlace-usuario-header" -->
                <a id="enlace-usuario-header" class="btn btn-link p-0" aria-label="Usuario" href="login.html">
                    <img src="img/HEADER/icons8-user-50.png" alt="Usuario" class="icono-nav"/>
                </a>
                <a class="btn btn-link p-0" aria-label="Carrito" href="carrito.html">
                    <img src="img/HEADER/icons8-shopping-cart-50.png" alt="Carrito" class="icono-nav"/>
                </a>
            </div>

            <!-- EL MENÚ LATERAL OCULTO -->
            <div class="offcanvas offcanvas-start bg-dark text-white" tabindex="-1" id="menuLateral" aria-labelledby="menuLateralLabel">
                <div class="offcanvas-header border-bottom border-secondary">
                    <h5 class="offcanvas-title fw-bold" id="menuLateralLabel">RectaBags</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
                </div>
                
                <div class="offcanvas-body d-flex flex-column">
                    <ul class="nav nav-pills flex-column mb-auto">
                        <li class="nav-item"><a href="home.html" class="nav-link active bg-secondary text-white">Inicio</a></li>
                        <li class="nav-item"><a href="catalogo.html" class="nav-link text-white">Catálogo</a></li>
                        <li class="nav-item"><a href="blog.html" class="nav-link text-white">Blog</a></li>
                        <li class="nav-item"><a href="contacto.html" class="nav-link text-white">Contacto</a></li>
                        <li class="nav-item"><a href="impacto_ambiental.html" class="nav-link text-white">Impacto Ambiental</a></li>
                        <li class="nav-item"><a href="quienes_somos.html" class="nav-link text-white">Quiénes Somos</a></li>
                    </ul>

                    <hr class="border-secondary">

                    <!-- ENLACES DINÁMICOS DE SESIÓN -->
                    <div id="menu-visitante">
                        <ul class="nav nav-pills flex-column">
                            <li class="nav-item"><a href="login.html" class="nav-link text-white">Log in</a></li>
                            <li class="nav-item"><a href="registro.html" class="nav-link text-white">Registro</a></li>
                        </ul>
                    </div>

                    <div id="menu-usuario" class="d-none">
                        <ul class="nav nav-pills flex-column">
                            <li class="nav-item"><a href="perfil_usuario.html" class="nav-link text-white fw-bold">Mi Perfil</a></li>
                            <li class="nav-item"><a href="#" id="btn-logout" class="nav-link text-danger fw-bold">Cerrar Sesión</a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </header>
    `;

    const componenteFooter = `
    <!-- ================= FOOTER ================= -->
    <footer class="bg-black text-white py-5 border-top border-secondary">
        <div class="container">
            <div class="row">
                
                <div class="col-md-4 columna-logo">
                <img src="img/FOOTER/Logo footer.png" alt="Logo Recta" class="logo-footer"/>
                </div>

                <div class="col-md-4 mb-4 mb-md-0">
                <h4 class="fw-bold mb-3">INFORMACIÓN</h4>
                <ul class="list-unstyled lh-lg">
                    <li><a href="quienes_somos.html" class="text-white text-decoration-none">Sobre Nosotros</a></li>
                    <li><a href="blog.html" class="text-white text-decoration-none">Blog</a></li>
                    <li><a href="contacto.html" class="text-white text-decoration-none">Contáctanos</a></li>
                </ul>
                </div>

                <div class="col-md-4">
                    <h4 class="fw-bold mb-3">RETIRO EN TIENDA</h4>
                    <p class="text-white text-decoration-none">Monseñor Miller 22-B, Providencia, Chile</p>
                    <div class="bg-secondary">
                        <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d832.3676318605725!2d-70.63000433043375!3d-33.43704579833717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5847589b685%3A0xec7382a19710d0cb!2sFrutas%20%26%20Verduras%20Minimarket!5e0!3m2!1ses-419!2scl!4v1788302948622!5m2!1ses-419!2scl"
                        width="100%"
                        height="300"
                        style="border: 0"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="strict-origin-when-cross-origin">
                        </iframe>
                    </div>
                </div>
                
            </div>
        </div>
    </footer>
    `;
    
    // ==========================================
    // 0. CREAR USUARIO ADMIN Y FUNCIÓN DE DOMINIOS
    // ==========================================
    let usuarios = JSON.parse(localStorage.getItem('usuarios_rectabags')) || [];
    
    // Si no existe el admin, lo inyectamos por defecto
    if (!usuarios.some(u => u.email === 'admin')) {
        usuarios.push({ 
            email: 'admin', 
            password: 'admin', 
            nombre: 'Administrador', 
            apellido: 'Sistema', 
            rut: '11.111.111-1', 
            telefono: '+56900000000', 
            direcciones: [] 
        });
        localStorage.setItem('usuarios_rectabags', JSON.stringify(usuarios));
    }

    // Validador de dominios permitidos
    function correoValido(email) {
        if (email === 'admin') return true; // Excepción para el login de admin
        const dominios = ['@duocuc.cl', '@gmail.com', '@profesor.duoc.cl'];
        return dominios.some(dominio => email.toLowerCase().endsWith(dominio));
    }

    // ==========================================
    // 1. CARGA DE HEADER/FOOTER Y SESIÓN
    // ==========================================
    // 1. INYECTAR COMPONENTES (Reemplazo del Fetch)
    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer-container');

    if (headerContainer) headerContainer.innerHTML = componenteHeader;
    if (footerContainer) footerContainer.innerHTML = componenteFooter;

    // 2. VALIDAR SESIÓN ACTIVA (Igual que antes)
    const sesionActiva = localStorage.getItem('sesion_rectabags');
    const enlaceUsuario = document.getElementById('enlace-usuario-header');

    if (sesionActiva) {
        document.getElementById('menu-visitante')?.classList.add('d-none');
        document.getElementById('menu-usuario')?.classList.remove('d-none');
        if (enlaceUsuario) enlaceUsuario.href = 'perfil_usuario.html';
    } else {
        if (enlaceUsuario) enlaceUsuario.href = 'login.html';
    }

    // Activar la lupa del buscador
    activarBuscador();

    // ==========================================
    // 2. LÓGICA DE REGISTRO
    // ==========================================
    const formRegistro = document.getElementById('form-registro');
    if (formRegistro) {
        formRegistro.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const nombre = document.getElementById('nombre').value.trim();
            const apellido = document.getElementById('apellido').value.trim();
            const rut = document.getElementById('rut').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            
            // Validar Dominio de Correo
            if (!correoValido(email)) {
                alert('Solo se permiten correos @duocuc.cl, @profesor.duoc.cl o @gmail.com');
                return;
            }

            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            // Recargar usuarios por si hubo cambios
            usuarios = JSON.parse(localStorage.getItem('usuarios_rectabags')) || [];
            if (usuarios.some(u => u.email === email)) {
                alert('Este correo ya está registrado.');
                return;
            }

            let direcciones = [];
            const direccionCalle = document.getElementById('direccion')?.value.trim();
            if (direccionCalle) {
                const regionSelect = document.getElementById('region');
                const ciudadSelect = document.getElementById('ciudad');
                direcciones.push({
                    nombre: "Principal",
                    region: regionSelect.options[regionSelect.selectedIndex]?.text || "",
                    ciudad: ciudadSelect.options[ciudadSelect.selectedIndex]?.text || "",
                    calle: direccionCalle
                });
            }

            usuarios.push({ email, password, nombre, apellido, rut, telefono, direcciones });
            localStorage.setItem('usuarios_rectabags', JSON.stringify(usuarios));

            alert('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.');
            window.location.href = 'login.html';
        });
    }

    // ==========================================
    // 3. LÓGICA DE LOGIN
    // ==========================================
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = document.getElementById('email').value.trim();
            const passwordInput = document.getElementById('password').value;

            usuarios = JSON.parse(localStorage.getItem('usuarios_rectabags')) || [];
            const usuarioValido = usuarios.find(u => u.email === emailInput && u.password === passwordInput);

            if (usuarioValido) {
                localStorage.setItem('sesion_rectabags', JSON.stringify({ email: usuarioValido.email }));
                alert(`¡Bienvenido/a ${usuarioValido.nombre}!`);
                window.location.href = 'home.html';
            } else {
                alert('Correo o contraseña incorrectos.');
            }
        });
    }

    // ==========================================
    // 4. LÓGICA DE CERRAR SESIÓN GLOBAL
    // ==========================================
    document.body.addEventListener('click', (e) => {
        if (e.target && (e.target.id === 'btn-logout' || e.target.id === 'btn-logout-perfil')) {
            e.preventDefault();
            localStorage.removeItem('sesion_rectabags'); 
            window.location.href = 'login.html'; 
        }
    });

    // ==========================================
    // 5. CARGA, PROTECCIÓN Y EDICIÓN DEL PERFIL
    // ==========================================
    const textoBienvenida = document.getElementById('texto-bienvenida');
    if (textoBienvenida) {
        
        const sesionActiva = JSON.parse(localStorage.getItem('sesion_rectabags'));
        if (!sesionActiva) {
            window.location.href = 'login.html';
            return; 
        }

        usuarios = JSON.parse(localStorage.getItem('usuarios_rectabags')) || [];
        const indexUsuario = usuarios.findIndex(u => u.email === sesionActiva.email);
        const datosUsuario = usuarios[indexUsuario];

        if (datosUsuario) {
            textoBienvenida.textContent = `Bienvenido de vuelta, ${datosUsuario.nombre} ${datosUsuario.apellido}.`;
            document.getElementById('perfil-nombre').value = datosUsuario.nombre;
            document.getElementById('perfil-apellido').value = datosUsuario.apellido;
            document.getElementById('perfil-email').value = datosUsuario.email;
            document.getElementById('perfil-rut').value = datosUsuario.rut || "Sin registrar";
            document.getElementById('perfil-telefono').value = datosUsuario.telefono || "";
            
            renderizarDirecciones(datosUsuario);
            renderizarPedidos(datosUsuario); // <-- RENDERIZA LOS PEDIDOS
        }

        inicializarTabsPerfil();

        // --- LÓGICA DE EDICIÓN ---
        const btnEditar = document.getElementById('btn-editar-perfil');
        const btnGuardar = document.getElementById('btn-guardar-perfil');
        const btnCancelar = document.getElementById('btn-cancelar-perfil');
        
        const inputNombre = document.getElementById('perfil-nombre');
        const inputApellido = document.getElementById('perfil-apellido');
        const inputTelefono = document.getElementById('perfil-telefono');
        const inputEmail = document.getElementById('perfil-email');
        const divPassword = document.querySelector('.campos-password');

        if (btnEditar) {
            btnEditar.addEventListener('click', () => {
                [inputNombre, inputApellido, inputTelefono, inputEmail].forEach(input => {
                    input.removeAttribute('readonly');
                    input.classList.remove('bg-light', 'border-0');
                    input.classList.add('border-dark', 'bg-white'); 
                });
                divPassword.classList.remove('d-none'); // Mostrar campos de password
                inputNombre.focus();

                btnEditar.classList.add('d-none');
                btnGuardar.classList.remove('d-none');
                btnCancelar.classList.remove('d-none');
            });

            btnCancelar.addEventListener('click', () => {
                // Restaurar
                inputNombre.value = datosUsuario.nombre;
                inputApellido.value = datosUsuario.apellido;
                inputTelefono.value = datosUsuario.telefono || "";
                inputEmail.value = datosUsuario.email;
                document.getElementById('perfil-pass-nueva').value = "";
                document.getElementById('perfil-pass-conf').value = "";

                // Bloquear
                [inputNombre, inputApellido, inputTelefono, inputEmail].forEach(input => {
                    input.setAttribute('readonly', true);
                    input.classList.add('bg-light', 'border-0');
                    input.classList.remove('border-dark', 'bg-white');
                });
                divPassword.classList.add('d-none');

                btnEditar.classList.remove('d-none');
                btnGuardar.classList.add('d-none');
                btnCancelar.classList.add('d-none');
            });

            btnGuardar.addEventListener('click', () => {
                const nuevoEmail = inputEmail.value.trim();
                const nuevaPass = document.getElementById('perfil-pass-nueva').value;
                const confPass = document.getElementById('perfil-pass-conf').value;

                if (!correoValido(nuevoEmail)) {
                    alert('El correo debe ser @duocuc.cl, @profesor.duoc.cl o @gmail.com');
                    return;
                }

                // Verificar si cambió el correo y si ya existe en otro usuario
                if (nuevoEmail !== datosUsuario.email && usuarios.some(u => u.email === nuevoEmail)) {
                    alert('Este correo ya está en uso por otra cuenta.');
                    return;
                }

                if (nuevaPass !== "" || confPass !== "") {
                    if (nuevaPass !== confPass) {
                        alert('Las nuevas contraseñas no coinciden.');
                        return;
                    }
                    datosUsuario.password = nuevaPass;
                }

                datosUsuario.nombre = inputNombre.value.trim();
                datosUsuario.apellido = inputApellido.value.trim();
                datosUsuario.telefono = inputTelefono.value.trim();
                datosUsuario.email = nuevoEmail;

                usuarios[indexUsuario] = datosUsuario;
                localStorage.setItem('usuarios_rectabags', JSON.stringify(usuarios));
                
                // Actualizar la sesión si cambió el email
                localStorage.setItem('sesion_rectabags', JSON.stringify({ email: nuevoEmail }));
                
                textoBienvenida.textContent = `Bienvenido de vuelta, ${datosUsuario.nombre} ${datosUsuario.apellido}.`;
                btnCancelar.click(); // Simula cancelar para bloquear los inputs
                alert("Tus datos han sido actualizados exitosamente.");
            });
        }

        // --- LÓGICA PARA AGREGAR DIRECCIÓN ---
        const formNuevaDir = document.getElementById('form-nueva-direccion');
        if (formNuevaDir) {
            formNuevaDir.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const nombreDir = document.getElementById('nueva-dir-nombre').value.trim();
                const regionDir = document.getElementById('nueva-dir-region').value;
                const ciudadDir = document.getElementById('nueva-dir-ciudad').value.trim();
                const calleDir = document.getElementById('nueva-dir-calle').value.trim();

                if (!usuarios[indexUsuario].direcciones) usuarios[indexUsuario].direcciones = [];
                
                usuarios[indexUsuario].direcciones.push({
                    nombre: nombreDir,
                    region: regionDir,
                    ciudad: ciudadDir,
                    calle: calleDir
                });

                localStorage.setItem('usuarios_rectabags', JSON.stringify(usuarios));
                renderizarDirecciones(usuarios[indexUsuario]);
                
                // Cerrar modal
                const modalElement = document.getElementById('modalDireccion');
                const modalInstancia = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
                modalInstancia.hide();
                formNuevaDir.reset();
            });
        }
    }
});

// ==========================================
// 6. FUNCIONES AUXILIARES GLOBALES
// ==========================================
function activarBuscador() {
    const btnBuscar = document.getElementById('btn-buscar');
    const inputBuscar = document.getElementById('input-buscar');
    if (btnBuscar && inputBuscar) {
        btnBuscar.addEventListener('click', function(evento) {
            const estiloInput = window.getComputedStyle(inputBuscar);
            if (estiloInput.display === 'none') {
                evento.preventDefault();
                inputBuscar.classList.remove('d-none');
                inputBuscar.classList.add('d-block');
                inputBuscar.focus();
            } else if (inputBuscar.value.trim() === '') {
                evento.preventDefault();
                if (window.innerWidth < 768) {
                    inputBuscar.classList.add('d-none');
                    inputBuscar.classList.remove('d-block');
                } else inputBuscar.focus();
            }
        });
    }
}

function inicializarTabsPerfil() {
    const botonesTab = document.querySelectorAll('.tab-btn');
    const seccionesTab = document.querySelectorAll('.tab-content');
    botonesTab.forEach(boton => {
        boton.addEventListener('click', function() {
            botonesTab.forEach(btn => btn.classList.remove('active', 'bg-dark', 'text-white', 'border-dark', 'fw-bold'));
            seccionesTab.forEach(seccion => seccion.classList.add('d-none'));
            this.classList.add('active', 'bg-dark', 'text-white', 'border-dark', 'fw-bold');
            document.getElementById(this.getAttribute('data-target')).classList.remove('d-none');
        });
    });
}

function renderizarDirecciones(usuario) {
    const contenedor = document.getElementById('contenedor-direcciones');
    if (!contenedor) return;

    contenedor.innerHTML = ''; 

    if (!usuario.direcciones || usuario.direcciones.length === 0) {
        contenedor.innerHTML = '<p class="text-secondary small">No tienes direcciones guardadas.</p>';
        return;
    }

    usuario.direcciones.forEach((dir, index) => {
        contenedor.innerHTML += `
            <div class="border p-3 rounded-4 mb-3 position-relative border-dark d-flex justify-content-between align-items-center">
                <div>
                    <h3 class="h6 fw-bold mt-2">${dir.nombre}</h3>
                    <p class="small text-secondary m-0">${dir.calle}<br>${dir.ciudad}, ${dir.region}</p>
                </div>
                <button onclick="eliminarDireccion(${index})" class="btn btn-sm btn-outline-danger rounded-pill px-3">Eliminar</button>
            </div>
        `;
    });
}

function renderizarPedidos(usuario) {
    const contenedor = document.querySelector('#seccion-pedidos .card-body');
    if (!contenedor) return;

    if (!usuario.pedidos || usuario.pedidos.length === 0) {
        contenedor.innerHTML = `
            <h2 class="h4 fw-bold mb-4">Historial de Pedidos</h2>
            <p class="text-secondary">Aún no tienes pedidos registrados en tu cuenta.</p>
        `;
        return;
    }

    let htmlPedidos = `<h2 class="h4 fw-bold mb-4">Historial de Pedidos</h2>`;

    usuario.pedidos.forEach(pedido => {
        let detalleProductos = pedido.productos.map(p => 
            `<li class="small text-secondary">${p.nombre} (x${p.cantidad || 1}) - $${p.precio}</li>`
        ).join('');

        htmlPedidos += `
            <div class="border p-3 rounded-4 mb-3 border-dark">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="fw-bold">${pedido.id}</span>
                    <span class="badge bg-dark">${pedido.fecha}</span>
                </div>
                <ul class="mb-2 ps-3">
                    ${detalleProductos}
                </ul>
                <div class="fw-bold text-end">
                    Total: $${pedido.total}
                </div>
            </div>
        `;
    });

    contenedor.innerHTML = htmlPedidos;
}

// Función global para eliminar una dirección
window.eliminarDireccion = function(index) {
    if(!confirm("¿Estás seguro de eliminar esta dirección?")) return;

    const sesionActiva = JSON.parse(localStorage.getItem('sesion_rectabags'));
    let usuarios = JSON.parse(localStorage.getItem('usuarios_rectabags'));
    let indexUsuario = usuarios.findIndex(u => u.email === sesionActiva.email);

    usuarios[indexUsuario].direcciones.splice(index, 1);
    
    localStorage.setItem('usuarios_rectabags', JSON.stringify(usuarios));
    renderizarDirecciones(usuarios[indexUsuario]);
};