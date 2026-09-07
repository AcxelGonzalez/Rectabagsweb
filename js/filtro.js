document.addEventListener('DOMContentLoaded', () => {
    // querySelectorAll: Captura TODOS los elementos que cumplan la condición en un NodeList (Array). Cambio: Si usas querySelector, solo atrapará el primer producto.
    const filterLinks = document.querySelectorAll('.filter-link');
    const products = document.querySelectorAll('.catalog-grid .card');

    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Evita salto hacia el top de la página por el enlace '#'.
            
            // getAttribute: Lee un atributo HTML customizado 'data-filter'. Cambio: Si lo llamas 'class' o 'id', chocaría con los estilos y lógicas nativas.
            const filterValue = link.getAttribute('data-filter');

            products.forEach(product => {
                const productCategory = product.getAttribute('data-category');

                // Condicional OR (||): Si el botón apretado fue 'all', o si la categoría del producto es igual a la del botón.
                if (filterValue === 'all' || productCategory === filterValue) {
                    product.style.display = 'block'; // Lo muestra. Cambio: Si usas 'visibility: visible', el código funciona igual pero es menos compatible.
                } else {
                    product.style.display = 'none'; // Lo oculta colapsando su espacio. Cambio: Si usas 'visibility: hidden', el producto se hace invisible pero dejará un agujero o espacio en blanco en la grilla.
                }
            });
        });
    });
});