# ¡Salvemos los libros! · Instituto Cuatrovientos

Web de la iniciativa **¡Salvemos los libros!** del Instituto Cuatrovientos. La antigua biblioteca cerró y sus libros están ahora en la nueva aula de descanso: esta web los da a conocer, publica el calendario de actividades de **intercambio, donación y lectura** y permite inscribirse o contactar con la organización.

Práctica de *Implantación de Aplicaciones Web* (2º ASIR).

## Enlaces
| Recurso | URL |
|---|---|
| Repositorio | https://github.com/MrAritz/ProyectoSPA-JS-IAW |
| Web publicada (GitHub Pages) | https://mraritz.github.io/ProyectoSPA-JS-IAW/ |
| Tablero Kanban (GitHub Projects) | https://github.com/users/MrAritz/projects/1 |

## Objetivo
1. Dar a conocer el fondo de libros del aula de descanso.
2. Organizar actividades de intercambio, donación y lectura.
3. Facilitar la inscripción y el contacto.
4. Fomentar el hábito lector en el instituto.

## Fases y ramas
| Fase | Descripción | Rama |
|---|---|---|
| 1 | Web estática multipágina (4 páginas enlazadas con HTML) | `v1.0-estatica` |
| 2 | SPA con JavaScript nativo (un único `index.html` con 4 vistas) | `v2.0-spa` y `main` |

## Vistas de la SPA (Fase 2)
Todo está en un único `index.html`. La cabecera, el menú y el pie son comunes; dentro de `main` hay 4 `section class="vista"`:

| Vista (`id`) | Contenido |
|---|---|
| `inicio` | Presentación, objetivos y 4 libros destacados en *cards* con «Más información» y «Destacar» |
| `actividades` | Tabla con 8 actividades, botón «Ver detalles» por fila y filtros por tipo |
| `contacto` | Formulario de contacto validado con JavaScript |
| `registro` | Formulario de inscripción validado con JavaScript |

La versión multipágina de la Fase 1 (`pages/`) se conserva en la rama `v1.0-estatica`.

## Cómo funciona el JavaScript (`js/app.js`)
Se carga con `defer` (se ejecuta cuando el HTML ya está leído) y empieza con `'use strict'`. Solo usa JavaScript nativo: `querySelector`/`querySelectorAll`, `addEventListener`, `classList`, `dataset`, `closest`, `createElement`, `textContent` y `append`/`appendChild`.

### Organización
1. **Selectores** al principio, guardados en constantes (se buscan una sola vez).
2. **Funciones pequeñas**, cada una con una sola tarea y un comentario que la explica.
3. **`init()`** al final, que activa cada parte: `initNavegacion()`, `initDetallesEventos()`, `initFiltros()`, `initFormularios()` e `initLibros()`.

### Navegación SPA
- Los enlaces del menú (y los botones/enlaces internos) llevan `href="#vista"` y `data-view="vista"`.
- Al hacer clic: `preventDefault()` evita el salto del enlace y **la página no se recarga**.
- `mostrarVista()` recorre las secciones con `forEach` y deja visible solo la pulsada usando el atributo `hidden`.
- `marcarEnlaceActivo()` pone `active` y `aria-current="page"` solo en el enlace actual con `classList`.
- `cerrarMenu()` cierra el menú desplegable en el móvil.
- El foco pasa al título de la vista (`tabindex="-1"`) para el teclado y los lectores de pantalla.
- La vista inicial es **Inicio**.

### Actividades: detalles
- Cada fila es `<tr class="evento evento-donacion" data-tipo="donacion" data-detalle="...">`.
- `toggleDetalleEvento()` busca la fila del botón con `closest('tr')`.
- Si la fila de detalle no existe, `crearFilaDetalle()` la crea con `createElement('tr')` y `createElement('td')` (`colSpan = 5`), le pone el texto de `dataset.detalle` con `textContent` y la inserta justo debajo.
- Si ya existe, el botón solo la muestra u oculta (**nunca se duplica**), cambia su texto a «Ocultar detalles» / «Ver detalles» y actualiza `aria-expanded`.

### Actividades: filtros
- Botones Intercambio, Donación, Lectura y Todos con `data-filtro`.
- `aplicarFiltro()` primero quita la clase `resaltado` de **todas** las filas y después la añade solo a las que tienen el mismo `data-tipo`. Así los resaltados **no se acumulan**. «Todos» quita el resaltado.
- `marcarFiltroActivo()` deja un solo botón con `active` y `aria-pressed="true"`.
- **Por qué no usamos arrays, `.filter()` ni `.find()`**: los datos ya están en el HTML (en las clases y los `data-*`). Basta con recorrer las filas del DOM con `querySelectorAll` + `forEach` y comparar `dataset.tipo`, que es justo lo que pide la práctica.

### Formularios
- `addEventListener('submit')` + `preventDefault()`: el envío es **simulado** y no se guarda nada. Los formularios tienen `novalidate` para que mande nuestra validación, pero conservan sus atributos HTML5 (`required`, `type="email"`, `minlength`...).
- Se leen los valores con `.value.trim()` y `.checked`.
- **Contacto**: nombre (mínimo 2 caracteres), email, asunto y mensaje (mínimo 10) son obligatorios; el teléfono es opcional, pero si se escribe debe tener 9 cifras.
- **Registro**: nombre, email, curso, al menos un tipo de participación (`contarParticipacion()`) y aceptar las normas.
- `marcarCampo()` pone `is-valid` o `is-invalid` y Bootstrap muestra el `invalid-feedback` específico de cada campo.
- `mostrarAlerta()` crea un `alert` de Bootstrap con `createElement` y `role="alert"`. Antes vacía su contenedor, así que **no se acumulan alertas**.
- Si todo es correcto: confirmación con el nombre de la persona (vía `textContent`), `form.reset()` y limpieza de clases. Si hay errores, el foco va al primer campo incorrecto.

### Libros
- Cada *card* guarda datos extra en `data-anio`, `data-paginas`, `data-estado`, `data-ubicacion` y `data-sinopsis`.
- «Más información»: `closest('.card')` encuentra **su** card; `crearDetalleLibro()` crea el detalle con esos `dataset` y lo añade a esa card. Los siguientes clics solo lo muestran u ocultan (texto + `aria-expanded`).
- «Destacar»: `classList.toggle('destacado')` en su card y `aria-pressed` actualizado. Cada botón actúa solo sobre su propia card.

## Guía de estilos

### Paleta

| Color | HEX | Uso |
|---|---|---|
| Azul petróleo | `#34495E` | Navbar, botones principales, títulos y cabeceras |
| Azul profundo | `#253746` | Hover de botones y footer |
| Terracota oscuro | `#934D39` | Acentos, campos obligatorios y etiquetas de donación |
| Terracota suave | `#B66A50` | Detalles decorativos |
| Terracota oscuro hover | `#783D30` | Estado hover de botones de acento |
| Arena | `#D5B98C` | Líneas decorativas y foco sobre fondos oscuros |
| Azul grisáceo | `#536B7C` | Etiqueta de lectura |
| Blanco cálido | `#F3F1EB` | Fondo general |
| Arena clara | `#E8E4DA` | Cabeceras secundarias |
| Grafito | `#292D32` | Texto principal |
| Gris azulado | `#5C6670` | Texto secundario |
| Borde cálido | `#D5CEC1` | Bordes de tarjetas, formularios y cabeceras |

Los colores están definidos mediante variables CSS en `:root` de `css/style.css` y se reutilizan en los componentes de la web.

Todas las combinaciones de texto y fondo cumplen **WCAG AA** (la más baja es 4,61:1, texto secundario sobre arena clara).

### Tipografías
- **Playfair Display** (Google Fonts) para títulos → *fallback* `Georgia, serif`.
- **Source Sans 3** (Google Fonts) para el texto → *fallback* `system-ui, sans-serif`.

### Componentes de Bootstrap 5.3 usados
`navbar` con *toggler* colapsable · rejilla `container`/`row`/`col-*` · `card` · `badge` · `table` + `table-responsive` · formularios (`form-label`, `form-control`, `form-select`, `form-check`, `form-text`, `is-valid`/`is-invalid`, `invalid-feedback`) · `alert` · utilidades de espaciado, color y tipografía.

### Accesibilidad
- HTML semántico (`header`, `nav`, `main`, `section`, `aside`, `footer`) y `lang="es"`.
- Enlace "Saltar al contenido principal" y foco siempre visible (`:focus-visible`).
- Enlace activo con clase `active` + `aria-current="page"`, con subrayado (no solo color).
- Tabla con `caption`, `thead`, `th scope="col"` y `th scope="row"`; fechas con `<time datetime>`.
- Cada control tiene su `label for`; ayudas enlazadas con `aria-describedby`; checkboxes agrupados en `fieldset` + `legend`.
- Obligatorios con `required` y asterisco visual; opcionales indicados como "(opcional)".

## Estructura del proyecto
```
├── index.html            SPA: cabecera, menú, 4 vistas y pie
├── css/style.css         Estilos propios y variables
├── js/app.js             Navegación, detalles, filtros, formularios y libros
├── img/                  Logo y portadas SVG de los libros
├── docs/PLANNING.md      Planificación, guía de estilos y tareas
├── README.md
├── CHANGELOG.md
└── .gitignore
```

## Ramas
| Rama | Contenido |
|---|---|
| `main` | Versión actual (SPA), publicada en GitHub Pages |
| `v1.0-estatica` | Entrega 1: web estática de 4 páginas |
| `v2.0-spa` | Entrega 2: SPA con JavaScript |

## Cómo verlo en local
No necesita instalación: es HTML, CSS, JavaScript nativo y Bootstrap por CDN.

1. Clona el repositorio:
   ```bash
   git clone git@github.com:MrAritz/ProyectoSPA-JS-IAW.git
   cd ProyectoSPA-JS-IAW
   ```
2. Abre `index.html` en el navegador, o levanta un servidor local (recomendado):
   ```bash
   python3 -m http.server 8000
   ```
   y visita http://localhost:8000.

## Documentación
- Planificación y tareas: [`docs/PLANNING.md`](docs/PLANNING.md)
- Historial de cambios: [`CHANGELOG.md`](CHANGELOG.md)
