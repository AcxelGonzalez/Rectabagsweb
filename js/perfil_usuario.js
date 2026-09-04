document.addEventListener("DOMContentLoaded", () => {
    
    // Agrega esta función en cualquier parte de tu archivo main.js
    function inicializarTabsPerfil() {
        // Buscamos todos los botones y las secciones de contenido
        const botonesTab = document.querySelectorAll('.tab-btn');
        const seccionesTab = document.querySelectorAll('.tab-content');

        // Si no hay botones de tab en esta página (ej: estamos en el Home), el script se detiene para no dar error
        if (botonesTab.length === 0) return;

        // Le agregamos un evento de 'clic' a cada botón
        botonesTab.forEach(boton => {
            boton.addEventListener('click', function() {
                
                // 1. A todos los botones les quitamos el fondo negro y la clase 'active'
                botonesTab.forEach(btn => {
                    btn.classList.remove('active', 'bg-dark', 'text-white', 'border-dark', 'fw-bold');
                });

                // 2. A todas las secciones de la derecha les agregamos 'd-none' para ocultarlas
                seccionesTab.forEach(seccion => {
                    seccion.classList.add('d-none');
                });

                // 3. Al botón que acabamos de hacer clic (this), lo pintamos de negro
                this.classList.add('active', 'bg-dark', 'text-white', 'border-dark', 'fw-bold');

                // 4. Obtenemos el ID de la sección que este botón debe abrir (guardado en data-target)
                const targetId = this.getAttribute('data-target');
                
                // 5. Buscamos esa sección y le quitamos el 'd-none' para que aparezca
                document.getElementById(targetId).classList.remove('d-none');
            });
        });
    }
    inicializarTabsPerfil();
});