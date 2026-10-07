import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";

import PaginaEnConstruccion from "./pages/PaginaEnConstruccion";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ==============================
                    LAYOUT GENERAL
                   ============================== */}

        <Route element={<Layout />}>
          {/* HOME */}

          <Route path="/" element={<Home />} />

          {/* CATÁLOGO */}

          <Route
            path="/catalogo"
            element={<PaginaEnConstruccion titulo="Catálogo" />}
          />

          {/* BLOG */}

          <Route
            path="/blog"
            element={<PaginaEnConstruccion titulo="Blog" />}
          />

          {/* CONTACTO */}

          <Route
            path="/contacto"
            element={<PaginaEnConstruccion titulo="Contacto" />}
          />

          {/* IMPACTO */}

          <Route
            path="/impacto-ambiental"
            element={<PaginaEnConstruccion titulo="Impacto Ambiental" />}
          />

          {/* NOSOTROS */}

          <Route
            path="/quienes-somos"
            element={<PaginaEnConstruccion titulo="Quiénes Somos" />}
          />

          {/* AUTENTICACIÓN */}

          <Route
            path="/login"
            element={<PaginaEnConstruccion titulo="Iniciar Sesión" />}
          />

          <Route
            path="/registro"
            element={<PaginaEnConstruccion titulo="Registro" />}
          />

          {/* CARRITO */}

          <Route
            path="/carrito"
            element={<PaginaEnConstruccion titulo="Carrito" />}
          />

          {/* PERFIL */}

          <Route
            path="/perfil"
            element={<PaginaEnConstruccion titulo="Mi Perfil" />}
          />

          {/* 404 */}

          <Route
            path="*"
            element={<PaginaEnConstruccion titulo="Página no encontrada" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
