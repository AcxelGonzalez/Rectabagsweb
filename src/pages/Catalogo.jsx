import { productos } from "../data/productos";

import ProductCard
    from "../components/products/ProductCard";

import "../css/style_catalogo.css";


function Catalogo() {

    return (

        <section className="container py-5">

            <h1 className="fw-bold text-center mb-5">

                Catálogo

            </h1>


            <div className="row g-4">

                {
                    productos.map(
                        (producto) => (

                            <div
                                className="col-12 col-md-6 col-lg-4"
                                key={producto.id}
                            >

                                <ProductCard
                                    producto={producto}
                                />

                            </div>

                        )
                    )
                }

            </div>

        </section>

    );

}


export default Catalogo;