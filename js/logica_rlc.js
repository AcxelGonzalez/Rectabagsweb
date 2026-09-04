document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. LÓGICA DE REGISTRO
    // ==========================================
    const formRegistro = document.getElementById('form-registro');
    if (formRegistro) {
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita recargar la página
            
            const email = document.getElementById('email-reg').value;
            const pass = document.getElementById('pass-reg').value;

            // Traer usuarios existentes o crear un array vacío
            let usuarios = JSON.parse(localStorage.getItem('rectabags_usuarios')) || [];

            // Validar si el correo ya existe
            const usuarioExiste = usuarios.find(u => u.email === email);
            if (usuarioExiste) {
                alert("Este correo ya está registrado.");
                return;
            }

            // Guardar nuevo usuario
            usuarios.push({ email: email, pass: pass });
            localStorage.setItem('rectabags_usuarios', JSON.stringify(usuarios));
            
            alert("Cuenta creada con éxito. Ahora puedes iniciar sesión.");
            window.location.href = 'login.html'; // Redirigir al login
        });
    }

    // ==========================================
    // 2. LÓGICA DE LOGIN
    // ==========================================
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email-login').value;
            const pass = document.getElementById('pass-login').value;

            let usuarios = JSON.parse(localStorage.getItem('rectabags_usuarios')) || [];
            
            // Buscar si coincide correo y contraseña
            const usuarioValido = usuarios.find(u => u.email === email && u.pass === pass);

            if (usuarioValido) {
                // Crear la sesión activa
                localStorage.setItem('rectabags_sesion', JSON.stringify(usuarioValido));
                window.location.href = 'perfil_usuario.html'; // Redirigir al perfil
            } else {
                alert("Correo o contraseña incorrectos.");
            }
        });
    }

    // ==========================================
    // 3. LÓGICA DE CERRAR SESIÓN
    // ==========================================
    // Usamos delegación de eventos porque el botón podría inyectarse dinámicamente
    document.body.addEventListener('click', (e) => {
        if (e.target && e.target.id === 'btn-logout') {
            e.preventDefault();
            localStorage.removeItem('rectabags_sesion'); // Borramos la sesión
            window.location.href = 'home.html'; // Redirigir al inicio
        }
    });

});