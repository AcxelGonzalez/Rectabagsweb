document.addEventListener("DOMContentLoaded", () => {

    const sesion = JSON.parse(localStorage.getItem('rectabags_sesion'));
    const path = window.location.pathname;
    const paginaActual = path.substring(path.lastIndexOf('/') + 1) || 'home.html';

    // HTML del Footer por defecto (respaldo)
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
                // Inyecta el componente HTML si no hay archivo footer.html
                footerContainer.innerHTML = componenteFooter;
            });
    }

    // ==========================================
    // 3. VISIBILIDAD DEL MENÚ LATERAL Y HEADER
    // ==========================================
    function actualizarVisibilidadMenu() {
        const sesionActual = JSON.parse(localStorage.getItem('rectabags_sesion'));
        
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
        let usuarios = JSON.parse(localStorage.getItem('rectabags_usuarios')) || [];
        let indexUsuario = usuarios.findIndex(u => u.email.toLowerCase() === sesion.email.toLowerCase());
        let datosUsuario = usuarios[indexUsuario] || {
            email: sesion.email,
            nombre: sesion.nombre || sesion.email.split('@')[0],
            apellido: '',
            rut: '',
            telefono: '',
            direcciones: []
        };

        const textoBienvenida = document.getElementById('texto-bienvenida');
        if (textoBienvenida) {
            textoBienvenida.textContent = `Bienvenido de vuelta, ${datosUsuario.nombre}.`;
        }

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

        let btnEditarTarget = document.getElementById('btn-editar-perfil');
        if (!btnEditarTarget) {
            const todosLosBotones = document.querySelectorAll('button');
            todosLosBotones.forEach(btn => {
                if (btn.textContent.trim().toLowerCase() === 'editar') {
                    btnEditarTarget = btn;
                }
            });
        }

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

                    localStorage.setItem('rectabags_usuarios', JSON.stringify(usuarios));
                    
                    sesion.nombre = datosUsuario.nombre;
                    localStorage.setItem('rectabags_sesion', JSON.stringify(sesion));

                    [inputNombre, inputApellido, inputTelefono, inputRut].forEach(inp => {
                        if (inp) inp.setAttribute('readonly', true);
                    });

                    btnEditarTarget.textContent = 'Editar';
                    btnEditarTarget.classList.remove('btn-success');
                    
                    if (textoBienvenida) {
                        textoBienvenida.textContent = `Bienvenido de vuelta, ${datosUsuario.nombre}.`;
                    }
                    alert("Datos actualizados correctamente.");
                }
            });
        }

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
    }

    // ==========================================
    // 5. CONTROLADOR GLOBAL DE CLICS
    // ==========================================
    document.body.addEventListener('click', (e) => {
        const btnUsuario = e.target.closest('#enlace-usuario-header');
        if (btnUsuario) {
            e.preventDefault();
            const sesionActual = JSON.parse(localStorage.getItem('rectabags_sesion'));
            const destino = sesionActual ? 'perfil_usuario.html' : 'login.html';
            if (paginaActual !== destino) {
                window.location.href = destino;
            }
        }

        const btnLogout = e.target.closest('#btn-logout') || 
                          (e.target.tagName === 'A' && e.target.textContent.trim().toLowerCase() === 'cerrar sesión') ||
                          (e.target.tagName === 'BUTTON' && e.target.textContent.trim().toLowerCase() === 'cerrar sesión');
        
        if (btnLogout) {
            e.preventDefault();
            localStorage.removeItem('rectabags_sesion');
            window.location.href = 'login.html';
        }
    });

    // ==========================================
    // 6. REGISTRO DE USUARIOS
    // ==========================================
    const formRegistro = document.getElementById('form-registro');
    if (formRegistro && !formRegistro.dataset.initialized) {
        formRegistro.dataset.initialized = "true";
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const inputEmail = document.getElementById('email-reg') || document.getElementById('email');
            const inputPass = document.getElementById('pass-reg') || document.getElementById('password');
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

            if (email.toLowerCase() === 'admin' || email.toLowerCase() === 'admin@rectabags.com') {
                alert("Este correo está reservado.");
                return;
            }

            let usuarios = JSON.parse(localStorage.getItem('rectabags_usuarios')) || [];

            if (usuarios.some(u => u.email.toLowerCase() === email.toLowerCase())) {
                alert("Este correo ya está registrado.");
                return;
            }

            usuarios.push({ 
                email: email, 
                pass: pass, 
                nombre: nombre, 
                apellido: apellido, 
                rut: rut, 
                telefono: telefono, 
                rol: 'cliente',
                direcciones: [] 
            });

            localStorage.setItem('rectabags_usuarios', JSON.stringify(usuarios));
            alert("Cuenta creada con éxito. Ahora puedes iniciar sesión.");
            
            if (paginaActual === 'login.html') {
                inputEmail.value = '';
                inputPass.value = '';
            } else {
                window.location.href = 'login.html';
            }
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
                window.location.href = 'perfil_usuario.html';
                return;
            }

            let usuarios = JSON.parse(localStorage.getItem('rectabags_usuarios')) || [];
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
                window.location.href = 'perfil_usuario.html';
            } else {
                alert("Correo o contraseña incorrectos.");
            }
        });
    }

});