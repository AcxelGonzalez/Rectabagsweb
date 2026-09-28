import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/style_home.css';

function Home() {
    return (
        <>
            <Header/>    
            <main>
            <section className="hero-section d-flex align-items-end">
                
                <div className="container mb-5">
                <div className="hero-content text-white">
                
                    <h2 className="display-4 fw-bold mb-1">La mochila perfecta</h2>
                    <p className="fs-5">para viajar, trabajar y explorar</p>
                </div>
                </div>
            </section>

        
            <section className="productos-section py-5">
                <div className="container">
                <h2 className="text-center fw-bold mb-5 text-uppercase titulo-pesado">
                    Explora nuestros productos
                </h2>


                <div className="row align-items-center text-center text-md-start">
                    <div className="col-md-3 mb-4 mb-md-0">

                    <h3 className="fw-bold text-uppercase titulo-pesado lh-sm">
                        Selecciona el que mejor se ajuste a tus necesidades
                    </h3>
                    </div>
                    
                    <div className="col-md-7 mb-4 mb-md-0">
                    
                    <div className="row g-2">
                    
                        <div className="col-3">
                            
                            <img src="img/HOME/image 7.png" alt="Explora 1" className="img-fluid w-100 h-100 object-fit-cover rounded-3"/>
                        </div>
                        <div className="col-3">
                            <img src="img/HOME/image 9.png" alt="Explora 2" className="img-fluid w-100 h-100 object-fit-cover rounded-3"/>
                        </div>
                        <div className="col-3">
                            <img src="img/HOME/image 8.png" alt="Explora 3" className="img-fluid w-100 h-100 object-fit-cover rounded-3"/>
                        </div>
                        <div className="col-3">
                            <img src="img/HOME/image 10.png" alt="Explora 4" className="img-fluid w-100 h-100 object-fit-cover rounded-3"/>
                        </div>
                    </div>
                    </div>

                    <div className="col-md-2 text-center text-md-end">
                    <a href="catalogo.html" className="btn btn-secondary px-4 py-2">
                        Ver más ➔
                    </a>
                    </div>
                </div>
                </div>
            </section>  


            <section className="redes-section bg-black text-white py-5">
                <div className="container">
                <div className="row align-items-center">
                    
                    <div className="col-md-4 mb-4 mb-md-0">
                    <h2 className="fw-bold text-uppercase titulo-pesado">Síguenos en redes</h2>

                    <div className="d-flex align-items-center gap-3 mb-3 mt-4">
                        <a href="https://www.instagram.com/rectabags" target="_blank">
                        <img src="img/RRSS/icons8-instagram-50.png" alt="Instagram" className="icono-nav"/>
                        </a>
                        <p className="fs-5 m-0">@rectabags</p>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <a href="https://www.tiktok.com/@rectabags" target="_blank">
                        <img src="img/RRSS/icons8-tiktok-50.png" alt="TikTok" className="icono-nav"/>
                        </a>
                        <p className="fs-5 m-0">@rectabags</p>
                    </div>
                    </div>

                    <div className="col-md-8">
                        <div className="row g-2">

                            <div className="col-6 col-md-3">
                            <img src="img/RRSS/image 5.png" alt="Instagram 1" className="img-fluid" />
                            </div>
                            <div className="col-6 col-md-3">
                            <img src="img/RRSS/image 11.png" alt="Instagram 2" className="img-fluid" />
                            </div>
                            <div className="col-6 col-md-3">
                            <img src="img/RRSS/image 12.png" alt="Instagram 3" className="img-fluid" />
                            </div>
                            <div className="col-6 col-md-3">
                            <img src="img/RRSS/image 4.png" alt="Instagram 4" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                    
                    </div>
                </div>
            </section>
            </main>
            <Footer/>
        </>
    

    );
}

export default Home;