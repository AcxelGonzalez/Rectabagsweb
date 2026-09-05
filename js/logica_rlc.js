document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. LÓGICA DE REGISTRO
    // ==========================================
    const formRegistro = document.getElementById('form-registro');
    if (formRegistro) {
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const pass = document.getElementById('password').value;
            const confirmPass = document.getElementById('confirm-password').value;

            if (pass !== confirmPass) {
                alert("Las contraseñas no coinciden.");
                return;
            }

            let usuarios = JSON.parse(localStorage.getItem('rectabags_usuarios')) || [];

            const usuarioExiste = usuarios.find(u => u.email === email);
            if (usuarioExiste) {
                alert("Este correo ya está registrado.");
                return;
            }

            // Guardar objeto con la clave 'email' garantizada
            const nuevoUsuario = { 
                email: email, 
                pass: pass,
                nombre: document.getElementById('nombre')?.value || '',
                apellido: document.getElementById('apellido')?.value || ''
            };

            usuarios.push(nuevoUsuario);
            localStorage.setItem('rectabags_usuarios', JSON.stringify(usuarios));
            
            alert("Cuenta creada con éxito. Ahora puedes iniciar sesión.");
            window.location.href = 'login.html';
        });
    }

    // ==========================================
    // 2. LÓGICA DE LOGIN (IDs Corregidos)
    // ==========================================
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Corrige los IDs coincidentes con login.html ('email' y 'password')
            const email = document.getElementById('email').value.trim();
            const pass = document.getElementById('password').value;

            let usuarios = JSON.parse(localStorage.getItem('rectabags_usuarios')) || [];
            
            const usuarioValido = usuarios.find(u => u.email === email && u.pass === pass);

            if (usuarioValido) {
                // Guarda la sesión activa en LocalStorage
                localStorage.setItem('rectabags_sesion', JSON.stringify(usuarioValido));
                alert("¡Sesión iniciada con éxito!");
                window.location.href = 'carrito.html'; // Redirige directamente al carrito para probar
            } else {
                alert("Correo o contraseña incorrectos.");
            }
        });
    }

    // ==========================================
    // 3. LÓGICA DE CERRAR SESIÓN
    // ==========================================
    document.body.addEventListener('click', (e) => {
        if (e.target && (e.target.id === 'btn-logout' || e.target.id === 'btn-logout-perfil')) {
            e.preventDefault();
            localStorage.removeItem('rectabags_sesion');
            window.location.href = 'home.html';
        }
    });

});