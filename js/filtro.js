document.addEventListener('DOMContentLoaded', () => {
    const filterLinks = document.querySelectorAll('.filter-link');
    const products = document.querySelectorAll('.catalog-grid .card');

    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const filterValue = link.getAttribute('data-filter');

            products.forEach(product => {
                const productCategory = product.getAttribute('data-category');

                if (filterValue === 'all' || productCategory === filterValue) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });
});