import {
    Link,
    useParams
} from "react-router-dom";

import { productos } from "../data/productos";


function ProductoDetalle() {

    const { id } =
        useParams();


    const producto =
        productos.find(
            (item) =>
                item.id === Number(id)
        );


    if (!producto) {

        return (

            <section
                className="container text-center py-5"
            >

                <h1 className="fw-bold">

                    Producto no encontrado

                </h1>


                <p className="text-secondary">

                    El producto solicitado
                    no existe.

                </p>


                <Link
                    to="/catalogo"
                    className="btn btn-dark"
                >
                    Volver al catálogo
                </Link>

            </section>

        );

    }


    const precioFormateado =
        producto.precio.toLocaleString(
            "es-CL",
            {
                style: "currency",
                currency: "CLP"
            }
        );


    return (

        <section className="container py-5">

            <div className="row g-5 align-items-center">


                {/* IMAGEN */}

                <div className="col-12 col-lg-6">

                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="img-fluid rounded"
                    />

                </div>


                {/* INFORMACIÓN */}

                <div className="col-12 col-lg-6">

                    <p
                        className="
                            text-uppercase
                            text-secondary
                            fw-semibold
                        "
                    >
                        {producto.categoria}
                    </p>


                    <h1 className="fw-bold">

                        {producto.nombre}

                    </h1>


                    <p className="fs-3 fw-bold">

                        {precioFormateado}

                    </p>


                    <p className="text-secondary">

                        {
                            producto.descripcionCompleta
                        }

                    </p>


                    <p>

                        <strong>
                            Stock disponible:
                        </strong>{" "}

                        {producto.stock}

                    </p>


                    <button
                        type="button"
                        className="btn btn-dark px-4"
                    >
                        Agregar al carrito
                    </button>


                    <div className="mt-4">

                        <Link
                            to="/catalogo"
                            className="text-dark"
                        >
                            ← Volver al catálogo
                        </Link>

                    </div>

                </div>

            </div>

        </section>

    );

}


export default ProductoDetalle;