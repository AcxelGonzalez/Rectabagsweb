// Esperamos a que la página cargue completamente
document.addEventListener("DOMContentLoaded", () => {
    
    const btnBuscar = document.getElementById('btn-buscar');
    const inputBuscar = document.getElementById('input-buscar');
    const formBuscar = document.getElementById('form-buscar');

    // Escuchamos el clic en el botón de la lupa
    btnBuscar.addEventListener('click', function(evento) {
        
        // Obtenemos cómo se está renderizando el input en este momento
        const estiloInput = window.getComputedStyle(inputBuscar);
        
        // ESCENARIO 1: Estamos en celular y la barra está oculta
        if (estiloInput.display === 'none') {
            evento.preventDefault(); // Evitamos que el formulario se envíe
            
            // Quitamos la clase de Bootstrap que lo oculta y forzamos que se muestre
            inputBuscar.classList.remove('d-none');
            inputBuscar.classList.add('d-block');
            
            // Ponemos el cursor adentro automáticamente para que el usuario escriba
            inputBuscar.focus();
        } 
        // ESCENARIO 2: La barra ya está visible, pero el usuario no escribió nada
        else if (inputBuscar.value.trim() === '') {
            evento.preventDefault(); // Evitamos buscar algo vacío
            
            // Si estamos en celular y el usuario apretó la lupa sin escribir, volvemos a ocultar la barra
            if (window.innerWidth < 768) {
                inputBuscar.classList.add('d-none');
                inputBuscar.classList.remove('d-block');
            } else {
                // En PC, simplemente le recordamos que debe escribir haciendo focus
                inputBuscar.focus();
            }
        }
        // ESCENARIO 3: La barra está visible y el usuario sí escribió algo
        // Al no poner evento.preventDefault(), el formulario se enviará de forma natural.
    });

});