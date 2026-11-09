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
| 2 | SPA con JavaScript nativo | `main` (en desarrollo) |

## Páginas (Fase 1)
| Página | Contenido |
|---|---|
| `index.html` | Presentación, objetivos de la iniciativa y 4 libros destacados en *cards* |
| `pages/events.html` | Tabla accesible con 8 actividades (nombre, fecha, lugar y descripción) |
| `pages/contact.html` | Formulario de contacto con validación HTML5 |
| `pages/register.html` | Formulario de inscripción con campos obligatorios y opcionales |

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
`navbar` con *toggler* colapsable · rejilla `container`/`row`/`col-*` · `card` · `badge` · `table` + `table-responsive` · formularios (`form-label`, `form-control`, `form-select`, `form-check`, `form-text`) · utilidades de espaciado, color y tipografía.

### Accesibilidad
- HTML semántico (`header`, `nav`, `main`, `section`, `aside`, `footer`) y `lang="es"`.
- Enlace "Saltar al contenido principal" y foco siempre visible (`:focus-visible`).
- Enlace activo con clase `active` + `aria-current="page"`, con subrayado (no solo color).
- Tabla con `caption`, `thead`, `th scope="col"` y `th scope="row"`; fechas con `<time datetime>`.
- Cada control tiene su `label for`; ayudas enlazadas con `aria-describedby`; checkboxes agrupados en `fieldset` + `legend`.
- Obligatorios con `required` y asterisco visual; opcionales indicados como "(opcional)".

## Estructura del proyecto
```
├── index.html            Página de inicio
├── pages/
│   ├── events.html       Actividades
│   ├── contact.html      Contacto
│   └── register.html     Inscripción
├── css/style.css         Estilos propios y variables
├── img/                  Logo y portadas SVG de los libros
├── docs/PLANNING.md      Planificación, guía de estilos y tareas
├── README.md
├── CHANGELOG.md
└── .gitignore
```

## Cómo verlo en local
No necesita instalación: es HTML, CSS y Bootstrap por CDN.

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
