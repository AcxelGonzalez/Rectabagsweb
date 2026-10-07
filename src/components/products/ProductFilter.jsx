function ProductFilter({
    categoria,
    onCategoriaChange
}) {

    const categorias = [
        {
            valor: "todos",
            texto: "Todos"
        },
        {
            valor: "mochilas",
            texto: "Mochilas"
        },
        {
            valor: "cilindros",
            texto: "Cilindros"
        },
        {
            valor: "musette",
            texto: "Musette"
        }
    ];


    return (

        <div className="d-flex flex-wrap gap-2 mb-4">

            {
                categorias.map(
                    (item) => (

                        <button
                            key={item.valor}
                            type="button"
                            className={
                                categoria === item.valor
                                    ? "btn btn-dark"
                                    : "btn btn-outline-dark"
                            }
                            onClick={() =>
                                onCategoriaChange(
                                    item.valor
                                )
                            }
                        >

                            {item.texto}

                        </button>

                    )
                )
            }

        </div>

    );

}


export default ProductFilter;