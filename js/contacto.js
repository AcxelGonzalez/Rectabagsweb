const formContacto = document.getElementById('form-contacto');
const alertaContacto = document.getElementById('alerta-contacto');

if (formContacto) {
    formContacto.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita que la página parpadee o se recargue
        
        // Oculta el formulario y muestra el mensaje de éxito
        formContacto.classList.add('d-none');
        alertaContacto.classList.remove('d-none');
    });
}