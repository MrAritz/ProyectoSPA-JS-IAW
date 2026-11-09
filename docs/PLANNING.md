# Planning · ¡Salvemos los libros!

## Qué construyo
Una web para el Instituto Cuatrovientos que da a conocer los libros de la antigua biblioteca, ahora en la nueva aula de descanso, y anima a participar en actividades de intercambio, donación y lectura.

## Por qué lo construyo
- **Problema real:** los libros de la antigua biblioteca están en el aula de descanso, pero nadie sabe qué hay ni cómo usarlos. La web les da visibilidad y organiza la participación.
- **Habilidades que quiero adquirir (IAW, 2º ASIR):** maquetación responsive con Bootstrap 5.3, HTML semántico y accesible, formularios con validación, y manipulación del DOM con JavaScript nativo para convertir una web multipágina en una SPA (*Single Page Application*: una sola página que cambia de vista sin recargar).

## Objetivos de la iniciativa
1. Dar a conocer el fondo de libros del aula de descanso.
2. Organizar actividades de **intercambio**, **donación** y **lectura**.
3. Facilitar la inscripción y el contacto con el equipo organizador.
4. Fomentar el hábito lector entre alumnado y profesorado.

## Qué necesito aprender para hacerlo
- Sistema de rejilla de Bootstrap (`container`, `row`, `col-*`) y componentes (`navbar`, `card`, `table`, formularios).
- Accesibilidad: `aria-current`, `aria-describedby`, `aria-expanded`, `aria-pressed`, foco visible y contraste AA.
- Validación HTML5 (`required`, `pattern`, `minlength`...) y validación con JavaScript.
- DOM: `querySelectorAll`, `addEventListener`, `classList`, `dataset`, `closest`, `createElement`.
- GitHub Projects (Kanban), ramas y GitHub Pages.

## Stack y por qué ese stack
| Tecnología | Justificación |
|---|---|
| HTML5 semántico | Estructura accesible y válida W3C. |
| Bootstrap 5.3.3 (CDN) | Rejilla responsive y componentes accesibles sin escribir CSS desde cero. Versión fijada con SRI. |
| CSS propio con variables | Identidad visual propia (paleta de biblioteca) sobre Bootstrap. |
| JavaScript nativo (Fase 2) | Requisito de la práctica: sin frameworks ni librerías. |
| GitHub Pages | Hosting gratuito de sitios estáticos directamente desde `main`. |

## Guía de estilos

### Paleta de colores
| Variable CSS | HEX | Uso |
|---|---|---|
| `--color-primary` | `#1F4E3D` | Verde biblioteca: navbar, botones principales, encabezados |
| `--color-primary-dark` | `#163A2D` | Hover/activo de botones y footer |
| `--color-accent` | `#8C2F39` | Burdeos: acentos, marcas de obligatorio, destacados |
| `--color-gold` | `#C9A227` | Dorado: detalles decorativos (nunca texto pequeño sobre claro) |
| `--color-paper` | `#FAF6EE` | Papel antiguo: fondo general |
| `--color-ink` | `#2B2420` | Tinta: texto principal |
| `--color-muted` | `#5C524A` | Texto secundario |

Todas las combinaciones de texto superan el contraste **WCAG AA** (≥ 4.5:1): tinta y verde sobre papel, papel sobre verde, burdeos sobre papel.

### Tipografías (Google Fonts)
- **Encabezados:** *Playfair Display* (serif, evoca imprenta clásica) → fallback `Georgia, 'Times New Roman', serif`.
- **Texto:** *Source Sans 3* (sans-serif muy legible) → fallback `system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif`.

### Componentes previstos
- `navbar` responsive con toggler colapsable y enlace activo (`active` + `aria-current="page"`).
- Sección *hero* de presentación.
- `card` para libros destacados (portada, título, autor, género, sinopsis).
- `table` en `.table-responsive` con `caption` para actividades.
- Formularios Bootstrap (`form-label`, `form-control`, `form-select`, `form-check`, `form-text`).
- `alert` para mensajes de confirmación/error (Fase 2).
- `footer` común.

## Qué NO voy a hacer
- Sin backend, base de datos ni envío real de formularios (el envío es simulado).
- Sin `localStorage`/`sessionStorage`, `fetch`, jQuery, frameworks ni librerías extra.
- Sin arrays de objetos con datos ni `.filter()`/`.find()`: los datos viven en el HTML (`data-*`).
- Sin `innerHTML` para crear contenido.
- Sin buscador, login de usuarios ni catálogo completo de libros.

## Ideas para el futuro
- Catálogo completo con buscador.
- Sistema de préstamo con fechas de devolución.
- Modo oscuro.

## Fases en orden

### Fase 1 — Web estática multipágina → *"puedo navegar por 4 páginas con enlaces HTML y ver libros, actividades y formularios"*
| ID | Tarea |
|---|---|
| F1-01 | Configuración inicial: `.gitignore`, `PLANNING.md`, esqueleto de `README.md` y `CHANGELOG.md` |
| F1-02 | Crear tablero Kanban (GitHub Project) público y vinculado al repo |
| F1-03 | Estilos base: variables CSS, paleta, tipografías y foco visible |
| F1-04 | Navbar responsive y footer comunes en las 4 páginas |
| F1-05 | `index.html`: presentación, objetivos y 3+ libros destacados en cards |
| F1-06 | `pages/events.html`: tabla accesible con 6+ actividades |
| F1-07 | `pages/contact.html`: formulario de contacto con validación HTML5 |
| F1-08 | `pages/register.html`: formulario de inscripción con obligatorios y opcionales |
| F1-09 | README completo: descripción, guía de estilos, estructura, uso local y enlaces |
| F1-10 | Revisión rúbrica 1: responsive, accesibilidad, enlaces y validez W3C |
| F1-11 | Entrega 1: commit, rama `v1.0-estatica` y despliegue en GitHub Pages |

### Fase 2 — SPA con JavaScript nativo → *"puedo usar toda la web sin que se recargue la página e interactuar con actividades, formularios y libros"*
| ID | Tarea |
|---|---|
| F2-01 | Unificar en un único `index.html` con 4 `section` y eliminar `pages/` |
| F2-02 | Navegación SPA: mostrar/ocultar vistas, menú activo, foco y cierre del menú móvil |
| F2-03 | Actividades: botón "Ver detalles" que crea/alterna la fila de detalle |
| F2-04 | Actividades: filtros por tipo sin acumulación de resaltados |
| F2-05 | Formulario de contacto: validación JS con feedback Bootstrap |
| F2-06 | Formulario de registro: validación JS (obligatorios, email, participación, normas) |
| F2-07 | Libros: "Más información" y "Destacar" localizados en cada card |
| F2-08 | Organización del JS: funciones pequeñas, constantes, `init()` y comentarios |
| F2-09 | README actualizado con la parte SPA |
| F2-10 | Verificación: interacciones, consola sin errores y grep de prácticas prohibidas |
| F2-11 | Entrega 2: commit, rama `v2.0-spa` y despliegue en GitHub Pages |
