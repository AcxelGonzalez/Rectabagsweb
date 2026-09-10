# Rectabags Web

Sitio web desarrollado para la PYME **Rectabags**, dedicada a la **fabricación de mochilas rolltop y equipamiento de bikepacking**.

El proyecto corresponde a una implementación **frontend** desarrollada en contexto académico para la carrera de **Ingeniería en Informática de Duoc UC**, aplicando HTML5, CSS3, JavaScript ES6+ y Bootstrap.

> **Estado actual:** Frontoffice funcional con persistencia local mediante `localStorage`. El proyecto simula registro, autenticación, carrito, compra, perfil y pedidos sin backend ni base de datos. Las funciones administrativas avanzadas, stock real, pagos reales y seguridad de producción quedan fuera del alcance de esta iteración.

---

## 1. Objetivo del proyecto

Rectabags Web busca entregar una experiencia de compra online para los productos de la marca, permitiendo al usuario:

- Navegar por el sitio y conocer la marca.
- Consultar el catálogo y fichas de productos.
- Filtrar y buscar productos dentro del catálogo.
- Agregar productos al carrito.
- Registrarse e iniciar sesión.
- Recuperar su contraseña dentro de la simulación frontend.
- Finalizar una compra simulada.
- Consultar el historial de pedidos.
- Visualizar y editar datos personales.
- Visualizar la dirección registrada.
- Enviar consultas mediante el formulario de contacto.

El desarrollo prioriza:

- HTML5 semántico.
- Diseño responsive.
- CSS propio complementado con Bootstrap.
- Separación de responsabilidades en JavaScript.
- Reutilización de `header` y `footer` mediante `fetch()`.
- Persistencia local mediante `localStorage` y `sessionStorage`.
- Código comentado y organizado para facilitar su mantenimiento y exposición.

---

## 2. Tecnologías utilizadas

| Tecnología | Uso |
| --- | --- |
| **HTML5** | Estructura y contenido de las distintas vistas. |
| **CSS3** | Estilos propios, responsive design, Grid, Flexbox, transiciones y personalización visual. |
| **JavaScript ES6+** | Registro, autenticación, carrito, formularios, perfil, catálogo y manipulación del DOM. |
| **Bootstrap 5** | Sistema de grillas, formularios, modales, offcanvas y utilidades responsive. |
| **LocalStorage** | Simulación de persistencia para usuarios, sesión, carritos y pedidos. |
| **SessionStorage** | Conservación temporal de la ruta de retorno después del login desde el checkout. |
| **Google Maps Embed** | Visualización de la ubicación de retiro en tienda. |
| **Git / GitHub** | Control de versiones y almacenamiento del proyecto. |

---

## 3. Funcionalidades implementadas

### 3.1 Navegación y contenido

- Página de inicio.
- Catálogo de productos.
- Fichas individuales para productos principales.
- Blog informativo.
- Página de contacto.
- Página “Quiénes Somos”.
- Página de impacto ambiental.
- Términos de compra y registro.
- Header y footer reutilizables mediante `fetch()`.
- Footer con ubicación mediante Google Maps Embed.

### 3.2 Registro de usuario

El registro actualmente contempla:

- Nombre.
- Apellido.
- RUT.
- Fecha de nacimiento mediante selector de calendario.
- Teléfono.
- Correo electrónico.
- Contraseña.
- Confirmación de contraseña.
- Región.
- Comuna dependiente dinámicamente de la región seleccionada.
- Dirección de despacho opcional en la implementación actual.

Las contraseñas deben coincidir antes de permitir el registro.

La fecha de nacimiento se almacena internamente en formato:

```text
AAAA-MM-DD
```

pero se presenta en el perfil como:

```text
DD-MM-AAAA
```

La aplicación también impide seleccionar una fecha de nacimiento futura.

### 3.3 Región y comuna

La relación Región → Comuna se gestiona dinámicamente desde JavaScript.

Actualmente el prototipo contempla comunas pertenecientes a:

- Región Metropolitana.
- Región de Valparaíso.
- Región del Biobío.

Al cambiar la región se reconstruye automáticamente el selector de comunas mediante manipulación del DOM.

### 3.4 Autenticación

Se encuentra implementado:

- Inicio de sesión de clientes.
- Cierre de sesión.
- Persistencia de la sesión mediante `localStorage`.
- Redirección después del login cuando el usuario proviene del checkout.
- Recuperación de contraseña mediante correo y RUT registrados.
- Protección básica de páginas de login/registro cuando ya existe una sesión activa.

> La autenticación es una simulación frontend. No representa un sistema de seguridad apto para producción.

### 3.5 Recuperación de contraseña

El usuario puede modificar su contraseña utilizando:

- Correo registrado.
- RUT asociado a la cuenta.
- Nueva contraseña.
- Confirmación de la nueva contraseña.

Para facilitar la comparación, el RUT es normalizado eliminando puntos y espacios.

Esta función no utiliza correo real, tokens ni servidor debido a que el proyecto no dispone de backend.

### 3.6 Perfil de usuario

El perfil permite:

- Visualizar nombre y apellido.
- Visualizar RUT.
- Visualizar fecha de nacimiento en formato `DD-MM-AAAA`.
- Visualizar teléfono y correo.
- Editar datos personales habilitados.
- Guardar cambios.
- Cancelar una edición y recuperar los últimos datos almacenados.
- Cambiar contraseña.
- Visualizar la dirección registrada durante la creación de la cuenta.
- Consultar historial de pedidos.

Actualmente no se permite agregar nuevas direcciones desde el perfil.

### 3.7 Catálogo

El catálogo incluye:

- Tarjetas de productos.
- Buscador por texto.
- Filtros por categoría.
- Acceso a fichas individuales de los productos principales.

> **Estado actual:** algunas variantes visuales del catálogo todavía deben terminar de asociarse a una categoría y/o ficha de producto. Esta es una mejora pendiente de la versión actual.

### 3.8 Carrito de compras

El carrito permite:

- Agregar productos desde las fichas.
- Seleccionar cantidad.
- Modificar cantidades dentro del carrito.
- Eliminar productos.
- Calcular subtotal y total.
- Persistir productos con `localStorage`.
- Utilizar un carrito independiente por usuario autenticado.
- Mantener un carrito temporal para visitantes.

#### Migración de carrito de invitado

Si un visitante agrega productos y posteriormente inicia sesión, el sistema migra el contenido de:

```text
recta_carrito_invitado
```

al carrito personal correspondiente al correo del usuario.

Si el usuario ya tenía unidades del mismo producto, las cantidades se combinan.

### 3.9 Checkout y pedidos

Para finalizar una compra el sistema comprueba:

- Que existan productos en el carrito.
- Que exista una sesión iniciada.
- Que los términos y condiciones hayan sido aceptados.

La compra se confirma mediante un modal y luego se registra un pedido dentro del usuario almacenado localmente.

Después de una compra exitosa:

- Se registra el pedido.
- Se vacía el carrito correspondiente.
- El pedido queda disponible en el historial del perfil.

> No existe integración con una pasarela de pago real ni procesamiento financiero.

### 3.10 Formulario de contacto

El formulario de contacto valida:

- Nombre obligatorio.
- Correo electrónico válido.
- Asunto obligatorio.
- Mensaje obligatorio.
- Máximo de 500 caracteres para el mensaje.

Después de una validación exitosa se muestra una confirmación y se restablecen los campos del formulario.

> Actualmente el envío es simulado en frontend. No se envían correos reales ni se almacenan mensajes en servidor.

---

## 4. Flujo principal del usuario

```text
Inicio
  │
  ├── Catálogo
  │     │
  │     └── Producto
  │            │
  │            └── Agregar al carrito
  │
  ├── Registro
  │     │
  │     └── Login
  │
  └── Login
         │
         └── Perfil

Producto
   │
   └── Carrito
          │
          ├── Modificar cantidades
          ├── Eliminar productos
          └── Proceder al pago
                   │
                   ├── Sin sesión → Login
                   │                    │
                   │                    └── Regreso automático al carrito
                   │
                   ├── Sin aceptar términos → Bloqueo
                   │
                   └── Confirmar compra
                              │
                              ├── Registrar pedido
                              ├── Vaciar carrito
                              └── Perfil → Historial
```

### Flujo recomendado para demostración

1. Abrir `home.html` mediante Live Server.
2. Navegar al catálogo.
3. Ingresar a una ficha de producto.
4. Seleccionar cantidad y agregar al carrito.
5. Abrir el carrito y modificar la cantidad.
6. Intentar proceder al pago como visitante.
7. Registrar un usuario.
8. Iniciar sesión.
9. Comprobar que el carrito de invitado se conserva después del login.
10. Aceptar los términos y condiciones.
11. Confirmar la compra.
12. Revisar el pedido desde el perfil.
13. Mostrar fecha de nacimiento y dirección registrada.
14. Probar Editar → Cancelar.
15. Probar Editar → Guardar.
16. Probar el formulario de contacto.
17. Cerrar sesión.

---

## 5. Estructura principal del proyecto

```text
Rectabagsweb-main/
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
│   ├── auth.js
│   ├── carrito.js
│   ├── catalogo.js
│   ├── contacto.js
│   ├── main.js
│   └── perfil.js
│
├── img/
│
└── docs/
    ├── ERS - Especificación de Requisitos del Software
    └── Planilla de Requerimientos
```

> Durante el desarrollo pueden existir archivos de prueba o vistas no utilizadas por el flujo principal. Para la entrega definitiva se recomienda conservar únicamente los recursos necesarios.

---

## 6. Organización del JavaScript

### `main.js`

Contiene funcionalidades generales y compartidas por distintas páginas:

- Carga dinámica del header y footer.
- Actualización visual del header según sesión y rol.
- Navegación general.
- Cierre de sesión desde componentes compartidos.
- Definición de regiones y comunas.
- Generación dinámica del selector Región → Comuna.

### `auth.js`

Responsable de autenticación y registro:

- Registro de usuarios.
- Validación de correo y contraseña.
- Confirmación de contraseña.
- Fecha de nacimiento.
- Inicio de sesión.
- Persistencia de sesión.
- Recuperación de contraseña.
- Normalización del RUT para recuperación.
- Migración del carrito de invitado después de iniciar sesión.
- Protección básica de páginas de autenticación.

### `carrito.js`

Responsable del flujo de compra:

- Obtención de la clave de carrito correspondiente al usuario.
- Agregar productos.
- Modificar cantidades.
- Eliminar productos.
- Cálculo de totales.
- Persistencia del carrito.
- Verificación de sesión para checkout.
- Aceptación de términos.
- Confirmación de compra.
- Creación del pedido.
- Registro en historial.

### `catalogo.js`

Responsable de:

- Filtros por categoría.
- Buscador de productos.
- Interacción con las tarjetas del catálogo.
- Integración con el header cargado dinámicamente.

### `perfil.js`

Responsable de:

- Carga del usuario autenticado.
- Renderizado de datos personales.
- Formato visual de fecha de nacimiento.
- Edición de datos.
- Guardado de cambios.
- Cancelación de cambios no guardados.
- Cambio de contraseña.
- Renderizado de pedidos.
- Visualización de la dirección registrada.

### `contacto.js`

Responsable de:

- Validación del formulario de contacto.
- Comprobación de correo.
- Validación de asunto y mensaje.
- Límite de caracteres.
- Confirmación visual.
- Reinicio del formulario después de un envío simulado.

---

## 7. Persistencia local

Al no existir backend, la aplicación utiliza almacenamiento del navegador para simular persistencia.

### `localStorage`

Se utiliza principalmente para:

- Usuarios registrados.
- Sesión activa.
- Carrito del visitante.
- Carritos individuales por usuario.
- Historial de pedidos.
- Datos personales y dirección registrada.

Entre las claves utilizadas se encuentran:

```text
rectabags_usuarios
rectabags_sesion
recta_carrito_invitado
recta_carrito_<correo-del-usuario>
```

### `sessionStorage`

Se utiliza para recordar temporalmente que un usuario fue enviado al login desde el carrito y debe regresar a este después de autenticarse.

### Consideración de seguridad

`localStorage` **no es un mecanismo seguro para almacenar credenciales en una aplicación real**.

En producción sería necesario implementar:

- Backend.
- Base de datos.
- Hash seguro de contraseñas.
- Autenticación y autorización en servidor.
- Sesiones seguras o tokens.
- Recuperación de contraseña mediante tokens temporales.

---

## 8. Validaciones implementadas

Actualmente se encuentran implementadas, entre otras:

- Campos obligatorios mediante HTML5 y JavaScript.
- Formato básico de correo electrónico.
- Restricción de dominios de correo durante el registro.
- Longitud de contraseña entre 4 y 10 caracteres.
- Confirmación de contraseña durante registro y recuperación.
- Fecha de nacimiento obligatoria.
- Bloqueo de fechas de nacimiento futuras.
- Región → Comuna dinámica.
- Validación de formulario de contacto.
- Límite de 500 caracteres en mensajes de contacto.
- Comprobación de sesión antes de comprar.
- Obligación de aceptar términos antes del checkout.

### Validaciones pendientes o por reforzar

La versión actual todavía requiere mejoras en:

- Validación matemática completa del RUT/RUN y su dígito verificador.
- Validación más estricta del número telefónico.
- Alineación definitiva del dominio académico con `@duoc.cl` según la ERS.
- Aplicación de la misma restricción de dominio al editar el correo desde Perfil.
- Validación de dirección de despacho antes de cerrar una compra cuando el usuario no registró dirección.
- Control de stock real por producto.

---

## 9. Ejecución del proyecto

El proyecto utiliza `fetch()` para cargar `header.html` y `footer.html`.

Por este motivo debe ejecutarse mediante un **servidor local** y no directamente utilizando `file://`.

### Visual Studio Code + Live Server

1. Abrir la carpeta del proyecto en Visual Studio Code.
2. Instalar la extensión **Live Server**, si todavía no está instalada.
3. Hacer clic derecho sobre `home.html`.
4. Seleccionar **Open with Live Server**.
5. Mantener abierta la consola del navegador durante las pruebas para detectar errores JavaScript o recursos faltantes.

---

## 10. Estado del módulo administrativo

El proyecto contiene vistas destinadas a:

- Gestión de productos.
- Gestión de usuarios.

Sin embargo, en la versión actual estas vistas corresponden a un **prototipo del área administrativa** y **no constituyen un CRUD completo funcional**.

Actualmente quedan pendientes:

- Protección completa de rutas administrativas según rol.
- Redirección definitiva del login administrador hacia el panel administrativo.
- CRUD real de productos.
- CRUD real de usuarios.
- Gestión de pedidos.
- Gestión de stock.

> Para la demostración del estado actual se recomienda concentrarse en el flujo de cliente y no presentar el módulo administrativo como una funcionalidad terminada.

---

## 11. Estado del catálogo

El catálogo principal permite búsqueda y filtrado para los productos correctamente categorizados.

Actualmente existen algunas variantes visuales que todavía deben terminar de asociarse a:

- Una categoría mediante `data-category`.
- Una ficha de producto existente o una ficha individual propia.

También se recomienda mantener precios coherentes entre:

- Catálogo.
- Ficha de producto.
- Carrito.

---

## 12. Optimización de imágenes

Las imágenes principales fueron reducidas respecto de las versiones originales de alta resolución para disminuir el peso total del sitio y mejorar el tiempo de carga.

Como mejora futura se recomienda:

- Convertir fotografías a WebP.
- Utilizar `loading="lazy"` en imágenes fuera del primer viewport.
- Eliminar imágenes HEIC y recursos que no sean utilizados por ninguna página.
- Mantener PNG únicamente cuando sea necesario conservar transparencias.

---

## 13. Alcance actual

La iteración actual se concentra principalmente en el **Frontoffice**.

### Implementado

- Navegación principal.
- Registro de clientes.
- Login y logout.
- Recuperación simulada de contraseña.
- Perfil.
- Edición y cancelación de datos personales.
- Fecha de nacimiento.
- Región → Comuna.
- Visualización de dirección registrada.
- Catálogo y fichas principales.
- Carrito persistente.
- Carritos independientes por usuario.
- Migración de carrito invitado.
- Checkout simulado.
- Registro de pedidos.
- Historial de pedidos.
- Contacto.
- Componentes reutilizables.

### Fuera del alcance actual / pendiente

- Backend.
- Base de datos.
- Autenticación segura de producción.
- Pasarela de pago real.
- Stock real y alertas de stock crítico.
- CRUD administrativo completo de productos.
- CRUD administrativo completo de usuarios.
- Administración de pedidos.
- Validación estricta de RUT/RUN.
- Integraciones externas de correo.
- Pruebas automatizadas end-to-end.

---

## 14. Diferencias conocidas respecto de la ERS

La documentación de requisitos contempla funcionalidades que todavía no se encuentran completamente implementadas en esta iteración.

Entre las principales diferencias se encuentran:

- Validación estricta del RUN/RUT.
- Dominio `@duoc.cl` pendiente de alineación definitiva en el código actual.
- Dirección de despacho actualmente opcional durante el registro.
- CRUD administrativo de productos.
- Stock crítico.
- CRUD administrativo de usuarios.
- Protección completa de las rutas administrativas.

Estas diferencias deben considerarse como trabajo pendiente de próximas iteraciones o ajustarse antes de declarar cumplimiento completo de la ERS.

---

## 15. Mejoras futuras

1. Implementar backend y base de datos.
2. Incorporar autenticación y autorización seguras.
3. Implementar validación completa de RUT/RUN.
4. Mejorar validación de teléfono y correo.
5. Hacer obligatoria o solicitar en checkout la dirección de despacho.
6. Completar todas las tarjetas y fichas del catálogo.
7. Implementar CRUD administrativo de productos.
8. Implementar CRUD administrativo de usuarios.
9. Incorporar stock y estados de pedidos.
10. Integrar una pasarela de pago real.
11. Continuar optimizando imágenes mediante WebP.
12. Mejorar accesibilidad.
13. Implementar pruebas funcionales automatizadas.
14. Desplegar la aplicación en un entorno productivo.

---

## 16. Documentación asociada

En la carpeta `docs/` se incluyen documentos desarrollados durante el proyecto:

- **ERS — Especificación de Requisitos del Software:** propósito, alcance, actores, restricciones y requisitos del sistema.
- **Planilla de Requerimientos:** seguimiento y clasificación de los requerimientos definidos para el proyecto.

---

## 17. Autores

**Equipo de desarrollo – Ingeniería en Informática, Duoc UC**

- Marco Carrasco Zabalaga
- Acxel Gonzalez Osorio
- Fabian Cornejo Morales

**Asignatura:** Desarrollo Fullstack II  
**Institución:** Duoc UC  
**Proyecto:** Rectabags Web

---

## 18. Licencia

Proyecto de carácter académico desarrollado con fines educativos.

El contenido visual y la identidad de marca utilizados corresponden al contexto del proyecto desarrollado para **Rectabags**.
