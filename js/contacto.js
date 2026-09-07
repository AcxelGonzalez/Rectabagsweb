const formContacto = document.getElementById('form-contacto');
const alertaContacto = document.getElementById('alerta-contacto');

if (formContacto) {
    // listener 'submit': Capta cuando se presiona enviar. Cambio: Si escuchas un 'click' en el botón, el código podría ejecutarse aunque falten campos requeridos.
    formContacto.addEventListener('submit', function(e) {
        // e.preventDefault(): Frena el envío real del formulario (que intentaría ir a un backend). Cambio: Si lo borras, la página se recargará al instante y el usuario nunca verá el mensaje de éxito.
        e.preventDefault(); 
        
        // Mapeo DOM: Cambia las clases para la UX. Cambio: Se usa classList en lugar de style.display='none' porque Bootstrap ('d-none') ya tiene prioridades CSS establecidas.
        formContacto.classList.add('d-none');
        alertaContacto.classList.remove('d-none');
    });
}