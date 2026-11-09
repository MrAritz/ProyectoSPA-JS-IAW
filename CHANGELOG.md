# Changelog

Todos los cambios relevantes del proyecto se documentan en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y el proyecto usa [versionado semántico](https://semver.org/lang/es/).

## [Sin publicar]

## [2.0.0] - 2026-11-09
Entrega 2: SPA con JavaScript nativo. Conservada en la rama `v2.0-spa`.

### Añadido
- `js/app.js` con navegación SPA, detalles de actividades, filtros, validación de formularios e interacción con los libros.
- Navegación entre vistas sin recargar la página, con menú activo, foco en el título y cierre del menú en el móvil.
- Botón «Ver detalles» en cada actividad que crea su fila de detalle (sin duplicados).
- Filtros Intercambio, Donación, Lectura y Todos que resaltan filas sin acumular.
- Validación con JavaScript de Contacto y Registro con mensajes de Bootstrap (`is-valid`, `is-invalid`, `alert`).
- Botones «Más información» y «Destacar» en cada libro, usando sus atributos `data-*`.

### Cambiado
- Las 4 páginas se unifican en un único `index.html` con 4 secciones. La carpeta `pages/` se elimina (sigue en `v1.0-estatica`).
- README actualizado con la explicación del JavaScript.

### Cambiado por el equipo
- Nueva paleta de colores (azul petróleo, terracota y arena).
- Nuevos libros destacados y actividades.

## [1.0.1] - 2026-11-09

### Cambiado
- CSS simplificado: colores HEX directos, fondo liso en la portada, línea de títulos con `border-bottom` y clases propias para las columnas de la tabla en lugar de selectores avanzados.

## [1.0.0] - 2026-11-09
Entrega 1: web estática multipágina con Bootstrap 5.3. Conservada en la rama `v1.0-estatica`.

### Añadido
- `.gitignore` para archivos del sistema, editores y secretos.
- `docs/PLANNING.md` con objetivos, guía de estilos (paleta HEX, tipografías, componentes) y tareas de ambas fases.
- Tablero Kanban público en GitHub Projects con todas las tareas del proyecto.
- `css/style.css` con variables CSS (paleta de biblioteca), tipografías de Google Fonts, foco visible y personalización de componentes de Bootstrap.
- Logo y portadas SVG propias para los libros destacados.
- Navbar responsive con menú colapsable y enlace activo (`aria-current`), y footer comunes a todas las páginas.
- `index.html`: presentación, objetivos de la iniciativa y 4 libros destacados en *cards*.
- `pages/events.html`: tabla accesible con 8 actividades de donación, intercambio y lectura.
- `pages/contact.html`: formulario de contacto con validación HTML5 y ayudas con `aria-describedby`.
- `pages/register.html`: formulario de inscripción con campos obligatorios y opcionales y normas de participación.
- README completo: descripción, guía de estilos, estructura, uso en local y enlaces.

### Corregido
- La tabla de actividades ya no aplasta la descripción en móvil: se desplaza dentro de `.table-responsive`.
- Fondo blanco en los campos de formulario para mejorar el contraste con el fondo de la página.

[Sin publicar]: https://github.com/MrAritz/ProyectoSPA-JS-IAW/compare/v2.0-spa...main
[2.0.0]: https://github.com/MrAritz/ProyectoSPA-JS-IAW/tree/v2.0-spa
[1.0.0]: https://github.com/MrAritz/ProyectoSPA-JS-IAW/tree/v1.0-estatica
