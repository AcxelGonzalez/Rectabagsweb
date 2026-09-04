document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Inyectar el Header
    fetch('header.html')
        .then(respuesta => respuesta.text()) // Convertimos la respuesta a texto HTML
        .then(html => {
            // Lo insertamos en el contenedor vacío
            document.getElementById('header-container').innerHTML = html;
            
            // ¡AHORA el header existe! Ya podemos activar la lógica de la lupa
            activarBuscador(); 
        })
        .catch(error => console.error('Error al cargar el header:', error));

    // 2. Inyectar el Footer
    fetch('footer.html')
        .then(respuesta => respuesta.text())
        .then(html => {
            document.getElementById('footer-container').innerHTML = html;
        })
        .catch(error => console.error('Error al cargar el footer:', error));

});

// Metemos la lógica de la lupa en una función aparte
function activarBuscador() {
    const btnBuscar = document.getElementById('btn-buscar');
    const inputBuscar = document.getElementById('input-buscar');
    
    // Si el botón existe en la página actual, le agregamos el evento
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
                } else {
                    inputBuscar.focus();
                }
            }
        });
    }
}