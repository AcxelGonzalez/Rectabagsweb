document.addEventListener("DOMContentLoaded", () => {

    // Función auxiliar para obtener la sesión activa independientemente de la clave guardada
    function obtenerSesionActiva() {
        const item = localStorage.getItem('rectabags_sesion') || localStorage.getItem('sesion_rectabags');
        if (!item) return null;
        try {
            return JSON.parse(item);
        } catch (e) {
            return null;
        }
    }

    // Función auxiliar para obtener la lista global de usuarios
    function obtenerUsuarios() {
        return JSON.parse(localStorage.getItem('rectabags_usuarios')) || JSON.parse(localStorage.getItem('usuarios_rectabags')) || [];
    }

    // Guardar cambios de usuarios en ambas llaves para mantener sincronía
    function guardarUsuarios(usuarios) {
        localStorage.setItem('rectabags_usuarios', JSON.stringify(usuarios));
        localStorage.setItem('usuarios_rectabags', JSON.stringify(usuarios));
    }

    const sesion = obtenerSesionActiva();
    const path = window.location.pathname;
    const paginaActual = path.substring(path.lastIndexOf('/') + 1) || 'home.html';

    // HTML del Footer de respaldo
    const componenteFooter = `
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
                        <li><a href="contacto.html" class="text-white text-decoration-none">Contacto</a></li>
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
    // 1. PROTECCIÓN DE RUTAS
    // ==========================================
    if (sesion && (paginaActual === 'login.html' || paginaActual === 'registro.html')) {
        window.location.href = 'perfil_usuario.html';
        return;
    }

    if (!sesion && paginaActual === 'perfil_usuario.html') {
        window.location.href = 'login.html';
        return;
    }

    // ==========================================
    // 2. CARGA DINÁMICA DE HEADER Y FOOTER
    // ==========================================
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        fetch('header.html')
            .then(response => {
                if (!response.ok) throw new Error("No se pudo cargar header.html");
                return response.text();
            })
            .then(data => {
                headerContainer.innerHTML = data;
                actualizarVisibilidadMenu();
            })
            .catch(() => {
                actualizarVisibilidadMenu();
            });
    } else {
        actualizarVisibilidadMenu();
    }

    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        fetch('footer.html')
            .then(response => {
                if (!response.ok) throw new Error("No existe footer.html");
                return response.text();
            })
            .then(data => {
                footerContainer.innerHTML = data;
            })
            .catch(() => {
                footerContainer.innerHTML = componenteFooter;
            });
    }

    // ==========================================
    // 3. VISIBILIDAD DEL MENÚ LATERAL Y HEADER
    // ==========================================
    function actualizarVisibilidadMenu() {
        const sesionActual = obtenerSesionActiva();
        
        const menuVisitante = document.getElementById('menu-visitante');
        const menuUsuario = document.getElementById('menu-usuario');
        const menuAdmin = document.getElementById('menu-admin');
        const enlaceUsuarioHeader = document.getElementById('enlace-usuario-header');

        if (sesionActual) {
            if (menuVisitante) menuVisitante.classList.add('d-none');
            if (enlaceUsuarioHeader) enlaceUsuarioHeader.href = 'perfil_usuario.html';

            if (sesionActual.rol === 'admin') {
                if (menuAdmin) menuAdmin.classList.remove('d-none');
                if (menuUsuario) menuUsuario.classList.add('d-none');
            } else {
                if (menuUsuario) menuUsuario.classList.remove('d-none');
                if (menuAdmin) menuAdmin.classList.add('d-none');
            }
        } else {
            if (menuVisitante) menuVisitante.classList.remove('d-none');
            if (menuUsuario) menuUsuario.classList.add('d-none');
            if (menuAdmin) menuAdmin.classList.add('d-none');
            if (enlaceUsuarioHeader) enlaceUsuarioHeader.href = 'login.html';
        }
    }

    // ==========================================
    // 4. LÓGICA DE PERFIL DE USUARIO
    // ==========================================
    if (paginaActual === 'perfil_usuario.html' && sesion) {
        let usuarios = obtenerUsuarios();
        let indexUsuario = usuarios.findIndex(u => u.email.toLowerCase() === sesion.email.toLowerCase());
        
        let datosUsuario = usuarios[indexUsuario] || {
            email: sesion.email,
            nombre: sesion.nombre || sesion.email.split('@')[0],
            apellido: '',
            rut: '',
            telefono: '',
            direcciones: [],
            pedidos: []
        };

        // Mostrar Saludo Inicial
        const textoBienvenida = document.getElementById('texto-bienvenida');
        if (textoBienvenida) {
            textoBienvenida.textContent = `Bienvenido de vuelta, ${datosUsuario.nombre} ${datosUsuario.apellido || ''}.`.trim();
        }

        // Cargar Inputs de Mis Datos
        const inputNombre = document.getElementById('perfil-nombre');
        const inputApellido = document.getElementById('perfil-apellido');
        const inputEmail = document.getElementById('perfil-email');
        const inputRut = document.getElementById('perfil-rut');
        const inputTelefono = document.getElementById('perfil-telefono');

        if (inputNombre) inputNombre.value = datosUsuario.nombre || '';
        if (inputApellido) inputApellido.value = datosUsuario.apellido || '';
        if (inputEmail) inputEmail.value = datosUsuario.email || '';
        if (inputRut) inputRut.value = datosUsuario.rut || '';
        if (inputTelefono) inputTelefono.value = datosUsuario.telefono || '';

        // RENDERIZAR PEDIDOS Y DIRECCIONES
        renderizarPedidos(datosUsuario);
        renderizarDirecciones(datosUsuario);

        // Edición de Perfil
        let btnEditarTarget = document.getElementById('btn-editar-perfil');
        if (btnEditarTarget && !btnEditarTarget.dataset.initialized) {
            btnEditarTarget.dataset.initialized = "true";
            btnEditarTarget.addEventListener('click', () => {
                const esEditable = inputNombre && !inputNombre.hasAttribute('readonly');
                
                if (!esEditable) {
                    [inputNombre, inputApellido, inputTelefono, inputRut].forEach(inp => {
                        if (inp) inp.removeAttribute('readonly');
                    });
                    btnEditarTarget.textContent = 'Guardar Cambios';
                    btnEditarTarget.classList.add('btn-success');
                } else {
                    datosUsuario.nombre = inputNombre ? inputNombre.value.trim() : datosUsuario.nombre;
                    datosUsuario.apellido = inputApellido ? inputApellido.value.trim() : '';
                    datosUsuario.rut = inputRut ? inputRut.value.trim() : '';
                    datosUsuario.telefono = inputTelefono ? inputTelefono.value.trim() : '';

                    if (indexUsuario !== -1) {
                        usuarios[indexUsuario] = datosUsuario;
                    } else {
                        usuarios.push(datosUsuario);
                    }

                    guardarUsuarios(usuarios);
                    
                    sesion.nombre = datosUsuario.nombre;
                    localStorage.setItem('rectabags_sesion', JSON.stringify(sesion));
                    localStorage.setItem('sesion_rectabags', JSON.stringify(sesion));

                    [inputNombre, inputApellido, inputTelefono, inputRut].forEach(inp => {
                        if (inp) inp.setAttribute('readonly', true);
                    });

                    btnEditarTarget.textContent = 'Editar';
                    btnEditarTarget.classList.remove('btn-success');
                    
                    if (textoBienvenida) {
                        textoBienvenida.textContent = `Bienvenido de vuelta, ${datosUsuario.nombre} ${datosUsuario.apellido || ''}.`.trim();
                    }
                    alert("Datos actualizados correctamente.");
                }
            });
        }

        // Cambio de Tabs / Pestañas en Perfil
        const botonesTab = document.querySelectorAll('.tab-btn, [data-target]');
        botonesTab.forEach(btn => {
            btn.addEventListener('click', function(e) {
                const targetId = this.getAttribute('data-target');
                if (targetId) {
                    e.preventDefault();
                    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.add('d-none'));
                    const targetEl = document.getElementById(targetId);
                    if (targetEl) targetEl.classList.remove('d-none');

                    botonesTab.forEach(b => b.classList.remove('active', 'bg-dark', 'text-white'));
                    this.classList.add('active', 'bg-dark', 'text-white');
                }
            });
        });

        // Crear Nueva Dirección desde Modal
        const formNuevaDir = document.getElementById('form-nueva-direccion');
        if (formNuevaDir && !formNuevaDir.dataset.initialized) {
            formNuevaDir.dataset.initialized = "true";
            formNuevaDir.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const nombreDir = document.getElementById('nueva-dir-nombre').value.trim();
                const regionSelect = document.getElementById('nueva-dir-region');
                const regionDir = regionSelect.options[regionSelect.selectedIndex]?.text || "";
                const ciudadDir = document.getElementById('nueva-dir-ciudad').value.trim();
                const calleDir = document.getElementById('nueva-dir-calle').value.trim();

                if (!datosUsuario.direcciones) datosUsuario.direcciones = [];
                
                datosUsuario.direcciones.push({
                    nombre: nombreDir,
                    region: regionDir,
                    ciudad: ciudadDir,
                    calle: calleDir
                });

                if (indexUsuario !== -1) {
                    usuarios[indexUsuario] = datosUsuario;
                    guardarUsuarios(usuarios);
                }

                renderizarDirecciones(datosUsuario);
                
                const modalElement = document.getElementById('modalDireccion');
                if (modalElement) {
                    const modalInstancia = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
                    modalInstancia.hide();
                }
                formNuevaDir.reset();
            });
        }
    }

    // ==========================================
    // 5. CONTROLADOR GLOBAL DE CLICS Y CERRAR SESIÓN
    // ==========================================
    document.body.addEventListener('click', (e) => {
        const btnUsuario = e.target.closest('#enlace-usuario-header');
        if (btnUsuario) {
            e.preventDefault();
            const sesionActual = obtenerSesionActiva();
            const destino = sesionActual ? 'perfil_usuario.html' : 'login.html';
            if (paginaActual !== destino) {
                window.location.href = destino;
            }
        }

        const btnLogout = e.target.closest('#btn-logout') || 
                          e.target.closest('#btn-logout-perfil') ||
                          (e.target.tagName === 'A' && e.target.textContent.trim().toLowerCase() === 'cerrar sesión') ||
                          (e.target.tagName === 'BUTTON' && e.target.textContent.trim().toLowerCase() === 'cerrar sesión');
        
        if (btnLogout) {
            e.preventDefault();
            localStorage.removeItem('rectabags_sesion');
            localStorage.removeItem('sesion_rectabags');
            window.location.href = 'login.html';
        }
    });

    // ==========================================
    // 6. REGISTRO DE USUARIOS (INCLUYE DIRECCIÓN INICIAL)
    // ==========================================
    const formRegistro = document.getElementById('form-registro');
    if (formRegistro && !formRegistro.dataset.initialized) {
        formRegistro.dataset.initialized = "true";
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const inputEmail = document.getElementById('email');
            const inputPass = document.getElementById('password');
            const inputNombre = document.getElementById('nombre');
            const inputApellido = document.getElementById('apellido');
            const inputRut = document.getElementById('rut');
            const inputTelefono = document.getElementById('telefono');

            if (!inputEmail || !inputPass) return;

            const email = inputEmail.value.trim();
            const pass = inputPass.value.trim();
            const nombre = inputNombre ? inputNombre.value.trim() : email.split('@')[0];
            const apellido = inputApellido ? inputApellido.value.trim() : '';
            const rut = inputRut ? inputRut.value.trim() : '';
            const telefono = inputTelefono ? inputTelefono.value.trim() : '';

            let usuarios = obtenerUsuarios();

            if (usuarios.some(u => u.email.toLowerCase() === email.toLowerCase())) {
                alert("Este correo ya está registrado.");
                return;
            }

            // Capturar dirección si fue completada al registrarse
            let direcciones = [];
            const direccionCalle = document.getElementById('direccion')?.value.trim();
            if (direccionCalle) {
                const regionSelect = document.getElementById('region');
                const ciudadSelect = document.getElementById('ciudad');
                const regionTexto = regionSelect && regionSelect.selectedIndex > 0 ? regionSelect.options[regionSelect.selectedIndex].text : '';
                const ciudadTexto = ciudadSelect && ciudadSelect.selectedIndex > 0 ? ciudadSelect.options[ciudadSelect.selectedIndex].text : '';
                
                direcciones.push({
                    nombre: "Principal",
                    region: regionTexto,
                    ciudad: ciudadTexto,
                    calle: direccionCalle
                });
            }

            usuarios.push({ 
                email: email, 
                pass: pass,
                password: pass, 
                nombre: nombre, 
                apellido: apellido, 
                rut: rut, 
                telefono: telefono, 
                rol: 'cliente',
                direcciones: direcciones,
                pedidos: []
            });

            guardarUsuarios(usuarios);
            alert("Cuenta creada con éxito. Ahora puedes iniciar sesión.");
            window.location.href = 'login.html';
        });
    }

    // ==========================================
    // 7. INGRESO / LOGIN
    // ==========================================
    const formLogin = document.getElementById('form-login');
    if (formLogin && !formLogin.dataset.initialized) {
        formLogin.dataset.initialized = "true";
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const inputEmail = document.getElementById('email-login') || document.getElementById('email');
            const inputPass = document.getElementById('pass-login') || document.getElementById('password');

            if (!inputEmail || !inputPass) return;

            const email = inputEmail.value.trim().toLowerCase();
            const pass = inputPass.value.trim();

            if ((email === 'admin' || email === 'admin@rectabags.com') && pass === 'admin') {
                const sesionAdmin = { email: email, nombre: 'Administrador', rol: 'admin' };
                localStorage.setItem('rectabags_sesion', JSON.stringify(sesionAdmin));
                localStorage.setItem('sesion_rectabags', JSON.stringify(sesionAdmin));
                window.location.href = 'perfil_usuario.html';
                return;
            }

            let usuarios = obtenerUsuarios();
            const usuarioValido = usuarios.find(u => 
                u.email.toLowerCase() === email && (u.pass === pass || u.password === pass)
            );

            if (usuarioValido) {
                const sesionCliente = {
                    email: usuarioValido.email,
                    nombre: usuarioValido.nombre || usuarioValido.email.split('@')[0],
                    rol: 'cliente'
                };
                localStorage.setItem('rectabags_sesion', JSON.stringify(sesionCliente));
                localStorage.setItem('sesion_rectabags', JSON.stringify(sesionCliente));
                window.location.href = 'perfil_usuario.html';
            } else {
                alert("Correo o contraseña incorrectos.");
            }
        });
    }

});

// ==========================================
// 8. RENDERIZADORES DE DIRECCIONES Y PEDIDOS
// ==========================================

function renderizarDirecciones(usuario) {
    const contenedor = document.getElementById('contenedor-direcciones');
    if (!contenedor) return;

    contenedor.innerHTML = ''; 

    if (!usuario.direcciones || usuario.direcciones.length === 0) {
        contenedor.innerHTML = '<p class="text-secondary small m-0">No tienes direcciones guardadas.</p>';
        return;
    }

    usuario.direcciones.forEach((dir, index) => {
        const ubicacion = [dir.ciudad, dir.region].filter(Boolean).join(', ');
        contenedor.innerHTML += `
            <div class="border p-3 rounded-4 mb-3 position-relative border-secondary-subtle d-flex justify-content-between align-items-center bg-white shadow-sm">
                <div>
                    <h3 class="h6 fw-bold mt-1 mb-1 text-dark">${dir.nombre || 'Dirección'}</h3>
                    <p class="small text-secondary m-0">${dir.calle}${ubicacion ? '<br>' + ubicacion : ''}</p>
                </div>
                <button onclick="eliminarDireccion(${index})" class="btn btn-sm btn-outline-danger rounded-pill px-3 fw-bold">Eliminar</button>
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
        let detalleProductos = (pedido.productos || []).map(p => 
            `<li class="small text-secondary py-1 border-bottom border-light d-flex justify-content-between align-items-center">
                <span><strong>${p.nombre}</strong> (x${p.cantidad || 1})</span>
                <span class="fw-semibold text-dark">${p.precio}</span>
            </li>`
        ).join('');

        htmlPedidos += `
            <div class="border p-3 rounded-4 mb-3 border-secondary-subtle bg-white shadow-sm">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="fw-bold text-dark fs-6">${pedido.id}</span>
                    <span class="badge bg-dark rounded-pill px-3 py-2">${pedido.fecha}</span>
                </div>
                <ul class="list-unstyled mb-3 px-2">
                    ${detalleProductos}
                </ul>
                <div class="fw-bold text-end text-dark fs-6 pt-2 border-top">
                    Total: ${pedido.total}
                </div>
            </div>
        `;
    });

    contenedor.innerHTML = htmlPedidos;
}

// Función global para borrar direcciones
window.eliminarDireccion = function(index) {
    if(!confirm("¿Estás seguro de eliminar esta dirección?")) return;

    const sesionItem = localStorage.getItem('rectabags_sesion') || localStorage.getItem('sesion_rectabags');
    if (!sesionItem) return;
    const sesionActiva = JSON.parse(sesionItem);

    let usuarios = JSON.parse(localStorage.getItem('rectabags_usuarios')) || JSON.parse(localStorage.getItem('usuarios_rectabags')) || [];
    let indexUsuario = usuarios.findIndex(u => u.email.toLowerCase() === sesionActiva.email.toLowerCase());

    if (indexUsuario !== -1 && usuarios[indexUsuario].direcciones) {
        usuarios[indexUsuario].direcciones.splice(index, 1);
        localStorage.setItem('rectabags_usuarios', JSON.stringify(usuarios));
        localStorage.setItem('usuarios_rectabags', JSON.stringify(usuarios));
        renderizarDirecciones(usuarios[indexUsuario]);
    }
};