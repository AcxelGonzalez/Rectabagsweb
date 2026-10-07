function ProductCard({
    producto
}) {

    const precioFormateado =
        producto.precio.toLocaleString(
            "es-CL",
            {
                style: "currency",
                currency: "CLP"
            }
        );


    return (

        <article className="card h-100">

            <img
                src={producto.imagen}
                className="card-img-top"
                alt={producto.nombre}
            />


            <div className="card-body">

                <h3 className="h5 fw-bold">

                    {producto.nombre}

                </h3>


                <p className="fw-bold">

                    {precioFormateado}

                </p>


                <p className="card-text">

                    {producto.descripcion}

                </p>

            </div>

        </article>

    );

}


export default ProductCard;