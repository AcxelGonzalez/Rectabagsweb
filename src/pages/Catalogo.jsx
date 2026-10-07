import { useState } from "react";

import { productos } from "../data/productos";

import ProductCard
    from "../components/products/ProductCard";

import ProductFilter
    from "../components/products/ProductFilter";

import "../css/style_catalogo.css";

function Catalogo() {

    const [
        categoria,
        setCategoria
    ] = useState("todos");

    const [
        busqueda,
        setBusqueda
    ] = useState("");

    const productosFiltrados =
    productos.filter(
        (producto) => {

            const coincideCategoria =
                categoria === "todos" ||
                producto.categoria ===
                    categoria;


            const coincideBusqueda =
                producto.nombre
                    .toLowerCase()
                    .includes(
                        busqueda
                            .toLowerCase()
                            .trim()
                    );


            return (
                coincideCategoria &&
                coincideBusqueda
            );

        }
    );

    return (

        <section className="container py-5">

            <h1 className="fw-bold text-center mb-5">

                Catálogo

            </h1>

            <div className="mb-4">
                <input
                    type="search"
                    className="form-control"
                    placeholder="Buscar productos..."
                    value={busqueda}
                    onChange={
                        (evento) =>
                            setBusqueda(
                                evento.target.value
                            )
                    }
                />
            </div>

            <ProductFilter
                categoria={categoria}
                onCategoriaChange={
                    setCategoria
                }
            />

            <div className="row g-4">
                {
                    productosFiltrados.length === 0 && (

                        <div className="col-12">

                            <p
                                className="
                                    text-center
                                    text-secondary
                                    py-5
                                "
                            >

                                No se encontraron productos.

                            </p>

                        </div>

                    )
                }
                
                {
                    productosFiltrados.map(
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