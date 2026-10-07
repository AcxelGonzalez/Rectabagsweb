function PaginaEnConstruccion({
    titulo
}) {

    return (

        <section
            className="container text-center py-5"
            style={{
                minHeight: "60vh"
            }}>

            <h1 className="fw-bold">

                {titulo}

            </h1>


            <p className="text-secondary mt-3">

                Esta vista será migrada
                progresivamente a React.

            </p>

        </section>

    );

}


export default PaginaEnConstruccion;