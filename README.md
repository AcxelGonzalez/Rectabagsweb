# Rectabags Web

Sitio web desarrollado para la PYME **Rectabags**, dedicada a la **fabricación de mochilas rolltop y equipamiento de bikepacking**.

Este proyecto corresponde a una implementación frontend realizada en el contexto académico de la carrera **Ingeniería en Informática de Duoc UC**, aplicando conocimientos de HTML5, CSS3, JavaScript y Bootstrap.

> **Estado del proyecto:** Frontend funcional con persistencia local mediante `localStorage`. Las funcionalidades de backend, base de datos, pagos reales y administración avanzada se consideran parte de una evolución posterior.

## 1. Descripción del proyecto

Rectabags Web busca entregar una experiencia de compra online para los productos de la marca, permitiendo al usuario navegar por el catálogo, consultar productos, gestionar un carrito de compras, registrarse e iniciar sesión, administrar información de su perfil y consultar pedidos registrados.

El proyecto fue desarrollado priorizando:

* Diseño responsive para distintos tamaños de pantalla.
* Estructura semántica utilizando HTML5.
* Personalización visual mediante CSS3.
* Uso de Bootstrap como framework de apoyo.
* Interactividad y lógica de negocio mediante JavaScript.
* Persistencia local mediante `localStorage`.
* Reutilización de componentes comunes como header y footer.

## 2. Tecnologías utilizadas

| Tecnología            | Uso                                                                           |
| --------------------- | ----------------------------------------------------------------------------- |
| **HTML5**             | Estructura y contenido semántico de las páginas.                              |
| **CSS3**              | Personalización visual, layout, responsive design y componentes propios.      |
| **JavaScript ES6+**   | Lógica de interacción, sesiones, carrito, formularios y renderizado dinámico. |
| **Bootstrap 5**       | Grid responsive, formularios, modales, offcanvas y utilidades.                |
| **LocalStorage**      | Persistencia local de usuarios, sesión, carrito y pedidos.                    |
| **Google Maps Embed** | Visualización de la ubicación para retiro en tienda.                          |
| **Git / GitHub**      | Control de versiones y almacenamiento del proyecto.                           |

## 3. Funcionalidades implementadas

### Navegación y contenido

* Página de inicio.
* Catálogo de productos.
* Fichas individuales de productos.
* Blog informativo.
* Página de contacto.
* Sección “Quiénes Somos”.
* Sección de impacto ambiental.
* Términos y condiciones.
* Header y footer reutilizables.

### Usuarios

* Registro de nuevos usuarios.
* Inicio de sesión.
* Cierre de sesión.
* Recuperación de contraseña mediante correo y RUT registrados.
* Perfil de usuario.
* Edición de datos personales.
* Cambio de contraseña desde el perfil.
* Gestión de direcciones guardadas.
* Historial de pedidos.
* Diferenciación de rol cliente / administrador a nivel frontend.

### Catálogo y compra

* Visualización de productos.
* Filtros por categoría.
* Buscador.
* Selección de cantidad.
* Agregar productos al carrito.
* Modificación de cantidades.
* Eliminación de productos.
* Cálculo de subtotal y total.
* Aceptación de términos antes de finalizar la compra.
* Confirmación mediante modal.
* Registro del pedido en el historial del usuario.

## 4. Flujo principal del usuario

El flujo principal considerado para la demostración es:

```text
Inicio
  │
  ├──> Catálogo
  │      │
  │      └──> Producto
  │             │
  │             └──> Agregar al carrito
  │
  └──> Login / Registro
           │
           └──> Perfil

Catálogo / Producto
        │
        └──> Carrito
               │
               ├──> Modificar cantidades
               ├──> Eliminar productos
               └──> Proceder al pago
                         │
                         ├── Usuario no autenticado → Login
                         ├── Términos no aceptados → Bloqueo
                         └── Confirmación → Registrar pedido
                                              │
                                              └──> Historial
```

### Flujo recomendado para la demostración

1. Ingresar a `home.html` como visitante.
2. Navegar al catálogo.
3. Ingresar a una ficha de producto.
4. Seleccionar cantidad y agregar el producto al carrito.
5. Abrir el carrito y modificar cantidades.
6. Intentar proceder al pago sin iniciar sesión.
7. Registrarse como cliente.
8. Iniciar sesión.
9. Volver al carrito.
10. Aceptar los términos y condiciones.
11. Confirmar la compra.
12. Revisar el pedido desde el perfil.
13. Mostrar edición de datos y gestión de direcciones.

## 5. Estructura del proyecto

```text
Rectabagsweb/
│
├── home.html
├── catalogo.html
├── carrito.html
├── login.html
├── registro.html
├── recuperar_contrasena.html
├── perfil_usuario.html
│
├── producto_cilindro.html
├── producto_musette.html
├── producto_rc-30.html
│
├── blog.html
├── contacto.html
├── impacto_ambiental.html
├── quienes_somos.html
├── terminos_compra.html
├── terminos_registro.html
│
├── administrador_gestion_productos.html
├── administrador_gestion_usuarios.html
│
├── header.html
├── footer.html
│
├── css/
│   ├── style_home.css
│   ├── style_catalogo.css
│   ├── style_login.css
│   └── style_header_footer.css
│
├── js/
│   ├── carrito.js
│   ├── contacto.js
│   ├── filtro.js
│   └── logica_rlc.js
│
├── img/
│
└── docs/
    ├── ERS - Especificación de Requisitos del Software
    └── Planilla de Requerimientos
```

> Durante el desarrollo existieron archivos de prueba y versiones anteriores. Para la entrega final se recomienda mantener únicamente los archivos utilizados por el flujo actual.

## 6. Componentes JavaScript principales

### `logica_rlc.js`

Centraliza gran parte de la lógica general del sistema:

* Gestión de sesión.
* Registro e inicio de sesión.
* Protección básica de páginas.
* Carga del header y footer.
* Gestión del perfil.
* Gestión de direcciones.
* Renderizado del historial de pedidos.
* Manejo de roles frontend.

### `carrito.js`

Gestiona el carrito de compras:

* Agregar productos.
* Modificar cantidades.
* Eliminar productos.
* Calcular totales.
* Persistir el carrito.
* Registrar pedidos.

### `filtro.js`

Implementa la búsqueda y filtrado de productos dentro del catálogo.

### `contacto.js`

Gestiona el formulario de contacto y la respuesta visual al usuario.

## 7. Persistencia local

Debido a que el proyecto corresponde a una implementación frontend, se utiliza `localStorage` para simular la persistencia de datos.

Se almacenan principalmente:

* Usuarios registrados.
* Sesión activa.
* Carritos por usuario.
* Direcciones.
* Historial de pedidos.

### Consideración importante

Esta estrategia es adecuada para una demostración frontend y académica, pero **no debe utilizarse como mecanismo de seguridad en producción**.

Las contraseñas se almacenan localmente debido a la ausencia de backend y base de datos. En una implementación real sería necesario utilizar autenticación en servidor, hash seguro de contraseñas, sesiones o tokens y una base de datos.

## 8. Ejecución del proyecto

El proyecto utiliza `fetch()` para cargar componentes reutilizables como `header.html` y `footer.html`.

Por este motivo, se recomienda ejecutar el proyecto mediante un **servidor local** y no abrir directamente `home.html` mediante `file://`.

### Visual Studio Code + Live Server

1. Abrir la carpeta del proyecto en Visual Studio Code.
2. Instalar la extensión **Live Server**.
3. Hacer clic derecho sobre `home.html`.
4. Seleccionar **Open with Live Server**.

### Python

Desde la carpeta raíz:

```bash
python -m http.server 8000
```

Luego acceder a:

```text
http://localhost:8000/home.html
```

## 9. Credenciales de demostración

Para las pruebas del flujo administrativo en el entorno académico:

```text
Usuario: admin
Contraseña: admin
```

> Estas credenciales son exclusivamente para demostración frontend y no representan un mecanismo seguro de autenticación.

## 10. Alcance actual

El proyecto se enfoca principalmente en el **Frontoffice** y en la simulación de los principales flujos de interacción del cliente.

Las siguientes funcionalidades se consideran parte de una evolución futura:

* Backend.
* Base de datos.
* Autenticación segura.
* Pasarela de pago real.
* Gestión persistente de stock.
* CRUD completo de productos.
* CRUD completo de usuarios.
* Gestión de pedidos desde administración.
* Reportes y métricas.
* Integración con servicios externos.

Las vistas administrativas existentes permiten representar parte del alcance futuro, pero no deben considerarse un CRUD completo implementado.

## 11. Mejoras futuras

Como siguientes iteraciones del proyecto se consideran:

1. Implementación de backend y base de datos.
2. Separación definitiva de autenticación y autorización.
3. Implementación del CRUD administrativo.
4. Validación robusta de RUT, correo, teléfono y contraseña.
5. Gestión de stock y estados de pedidos.
6. Integración de un medio de pago real.
7. Optimización de imágenes y recursos.
8. Mejoras de accesibilidad.
9. Pruebas funcionales automatizadas.
10. Despliegue en un entorno productivo.

## 12. Documentación asociada

En la carpeta `docs/` se incluyen los documentos desarrollados durante el proyecto:

* **ERS — Especificación de Requisitos del Software:** definición del propósito, alcance, actores, restricciones y requisitos.
* **Planilla de Requerimientos:** seguimiento y clasificación de los requerimientos definidos.

## 13. Autores

**Equipo de desarrollo – Ingeniería en Informática, Duoc UC**

* Marco Carrasco
* Integrante 2
* Integrante 3

**Asignatura:** Fullstack II
**Institución:** Duoc UC
**Proyecto:** Rectabags Web

## 14. Licencia

Proyecto de carácter académico desarrollado con fines educativos. El contenido visual y la identidad de marca corresponden al contexto del proyecto desarrollado para Rectabags.
