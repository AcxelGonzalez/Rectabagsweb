function Header(){
    return (
        <>
            <header className="header-principal fixed-top bg-black text-white py-3">
                <div className="container-fluid px-4 d-flex justify-content-between align-items-center">


                    <div className="header-left d-flex align-items-center gap-3">
                        <button className="btn btn-link p-0" aria-label="Menú" data-bs-toggle="offcanvas" data-bs-target="#menuLateral" aria-controls="menuLateral">
                            <img src="img/HEADER/icons8-menu-50.png" alt="Menú" className="icono-nav" />
                        </button>
                        <form id="form-buscar" className="d-flex align-items-center m-0" role="search">
                            <input id="input-buscar" className="form-control form-control-sm me-2 bg-dark border-secondary text-white d-none d-md-block" type="search" placeholder="Buscar..." aria-label="Search"/>
                            <button id="btn-buscar" className="btn btn-link p-0" aria-label="Buscar" type="submit">
                                <img src="img/HEADER/icons8-search-50.png" alt="Buscar" className="icono-nav"/>
                            </button>
                        </form>
                    </div>


                    <div className="header-center text-center">
                        <a href="home.html">
                            <img src="img/HEADER/Logo R.jpg" alt="Recta" className="logo-img"/>
                        </a>
                        <p className="eslogan m-0 small mt-1">“De ciclista para ciclistas”</p>
                    </div>


                    <div className="header-right d-flex gap-3">
                       
                        <a id="enlace-usuario-header" className="btn btn-link p-0" aria-label="Usuario" href="#">
                            <img src="img/HEADER/icons8-user-50.png" alt="Usuario" className="icono-nav"/>
                        </a>
                        <a className="btn btn-link p-0" aria-label="Carrito" href="carrito.html">
                            <img src="img/HEADER/icons8-shopping-cart-50.png" alt="Carrito" className="icono-nav"/>
                        </a>
                    </div>


                    <div className="offcanvas offcanvas-start bg-dark text-white" tabIndex="-1" id="menuLateral" aria-labelledby="menuLateralLabel">
                        <div className="offcanvas-header border-bottom border-secondary">
                            <h5 className="offcanvas-title fw-bold" id="menuLateralLabel">RectaBags</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
                    </div>
                        
                        <div className="offcanvas-body d-flex flex-column">
                            <ul className="nav nav-pills flex-column mb-auto">
                                <li className="nav-item"><a href="home.html" className="nav-link active bg-secondary text-white">Inicio</a></li>
                                <li className="nav-item"><a href="catalogo.html" className="nav-link text-white">Catálogo</a></li>
                                <li className="nav-item"><a href="blog.html" className="nav-link text-white">Blog</a></li>
                                <li className="nav-item"><a href="contacto.html" className="nav-link text-white">Contacto</a></li>
                                <li className="nav-item"><a href="impacto_ambiental.html" className="nav-link text-white">Impacto Ambiental</a></li>
                                <li className="nav-item"><a href="quienes_somos.html" className="nav-link text-white">Quiénes Somos</a></li>
                            </ul>

                            <hr className="border-secondary"/>


                            <div id="menu-visitante">
                                <ul className="nav nav-pills flex-column">
                                    <li className="nav-item"><a href="login.html" className="nav-link text-white">Log in</a></li>
                                    <li className="nav-item"><a href="registro.html" className="nav-link text-white">Registro</a></li>
                                </ul>
                            </div>


                            <div id="menu-usuario" className="d-none">
                                <ul className="nav nav-pills flex-column">
                                    <li className="nav-item"><a href="perfil_usuario.html" className="nav-link text-white fw-bold">Mi Perfil</a></li>
                                    <li className="nav-item"><a href="#" className="nav-link text-danger fw-bold btn-logout">Cerrar Sesión</a></li>
                                </ul>
                            </div>


                            <div id="menu-admin" className="d-none">

                                <div className="text-warning fw-bold small mb-2">
                                    ▼ ADMINISTRACIÓN
                                </div>

                                <ul className="nav nav-pills flex-column">

                                    <li className="nav-item">
                                        <a
                                            href="administrador_gestion_productos.html"
                                            className="nav-link text-warning">
                                            ≡ Gestión de Productos
                                        </a>
                                    </li>

                                    <li className="nav-item">
                                        <a
                                            href="administrador_gestion_usuarios.html"
                                            className="nav-link text-warning">
                                            ≡ Gestión de Usuarios
                                        </a>
                                    </li>

                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link text-danger fw-bold btn-logout">
                                            Cerrar Sesión
                                        </a>
                                    </li>

                                </ul>

                            </div>

                        </div>
                    </div>

                </div>
            </header>
        </>

    );
}

export default Header;