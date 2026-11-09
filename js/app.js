/* ==========================================================
   ¡Salvemos los libros! - JavaScript de la SPA
   Se carga con "defer": se ejecuta cuando el HTML ya está leído,
   así que todos los elementos existen al buscarlos.
   ========================================================== */

'use strict';

/* ---------- Selectores (se buscan una sola vez) ---------- */

// Navegación
const enlacesVista = document.querySelectorAll('[data-view]');   // todos los enlaces que cambian de vista
const enlacesMenu = document.querySelectorAll('.navbar .nav-link'); // solo los del menú (para marcar el activo)
const vistas = document.querySelectorAll('.vista');               // las 4 secciones
const menu = document.querySelector('#menuPrincipal');            // menú desplegable del móvil
const botonMenu = document.querySelector('.navbar-toggler');      // botón "hamburguesa"

// Actividades
const botonesDetalle = document.querySelectorAll('.btn-detalle'); // botón "Ver detalles" de cada fila
const filasEvento = document.querySelectorAll('.evento');         // filas de actividades
const botonesFiltro = document.querySelectorAll('.btn-filtro');   // Intercambio / Donación / Lectura / Todos


/* ==========================================================
   1. NAVEGACIÓN SPA
   ========================================================== */

// Muestra la vista con ese id y oculta las demás
function mostrarVista(nombre, moverFoco) {
  vistas.forEach(function (vista) {
    if (vista.id === nombre) {
      vista.hidden = false;
    } else {
      vista.hidden = true;
    }
  });

  marcarEnlaceActivo(nombre);

  // Llevamos el foco al título de la vista para que el teclado
  // y los lectores de pantalla empiecen a leer desde ahí
  if (moverFoco) {
    const titulo = document.querySelector('#' + nombre + ' .titulo-vista');
    titulo.focus();
  }
}

// Pone la clase active y aria-current solo en el enlace del menú de la vista actual
function marcarEnlaceActivo(nombre) {
  enlacesMenu.forEach(function (enlace) {
    if (enlace.dataset.view === nombre) {
      enlace.classList.add('active');
      enlace.setAttribute('aria-current', 'page');
    } else {
      enlace.classList.remove('active');
      enlace.removeAttribute('aria-current');
    }
  });
}

// En el móvil, cierra el menú desplegable después de elegir una opción
function cerrarMenu() {
  if (menu.classList.contains('show')) {
    menu.classList.remove('show');
    botonMenu.classList.add('collapsed');
    botonMenu.setAttribute('aria-expanded', 'false');
  }
}

// Al pulsar cualquier enlace con data-view, cambiamos de vista sin recargar
function initNavegacion() {
  enlacesVista.forEach(function (enlace) {
    enlace.addEventListener('click', function (evento) {
      evento.preventDefault(); // evita el salto normal del enlace
      mostrarVista(enlace.dataset.view, true);
      cerrarMenu();
    });
  });

  mostrarVista('inicio', false); // vista inicial
}


/* ==========================================================
   2. ACTIVIDADES: VER DETALLES
   ========================================================== */

// Crea la fila de detalle con el texto guardado en data-detalle
function crearFilaDetalle(fila) {
  const nuevaFila = document.createElement('tr');
  nuevaFila.classList.add('detalle-evento');

  const celda = document.createElement('td');
  celda.colSpan = 5; // ocupa las 5 columnas de la tabla
  celda.textContent = fila.dataset.detalle;

  nuevaFila.appendChild(celda);
  fila.after(nuevaFila); // la colocamos justo debajo de su actividad
}

// Muestra u oculta el detalle de la fila donde está el botón pulsado
function toggleDetalleEvento(boton) {
  const fila = boton.closest('tr'); // la fila de ESTE botón
  const siguiente = fila.nextElementSibling; // la fila de debajo

  // Si la fila de debajo no es su detalle, aún no existe: la creamos
  if (siguiente === null || !siguiente.classList.contains('detalle-evento')) {
    crearFilaDetalle(fila);
    boton.textContent = 'Ocultar detalles';
    boton.setAttribute('aria-expanded', 'true');
  } else if (siguiente.hidden) {
    // Ya existe y está oculta: la enseñamos (no creamos otra)
    siguiente.hidden = false;
    boton.textContent = 'Ocultar detalles';
    boton.setAttribute('aria-expanded', 'true');
  } else {
    // Ya existe y se ve: la ocultamos
    siguiente.hidden = true;
    boton.textContent = 'Ver detalles';
    boton.setAttribute('aria-expanded', 'false');
  }
}

function initDetallesEventos() {
  botonesDetalle.forEach(function (boton) {
    boton.addEventListener('click', function () {
      toggleDetalleEvento(boton);
    });
  });
}


/* ==========================================================
   3. ACTIVIDADES: FILTROS POR TIPO
   No usamos arrays ni .filter(): recorremos las filas del DOM
   con forEach y comparamos su atributo data-tipo.
   ========================================================== */

// Resalta las filas del tipo elegido ("todos" quita el resaltado)
function aplicarFiltro(tipo) {
  // 1º) Quitamos el resaltado de TODAS las filas, para que no se acumule
  filasEvento.forEach(function (fila) {
    fila.classList.remove('resaltado');
  });

  // 2º) Resaltamos solo las que coinciden con el tipo elegido
  if (tipo !== 'todos') {
    filasEvento.forEach(function (fila) {
      if (fila.dataset.tipo === tipo) {
        fila.classList.add('resaltado');
      }
    });
  }
}

// Marca como activo solo el botón de filtro pulsado
function marcarFiltroActivo(botonPulsado) {
  botonesFiltro.forEach(function (boton) {
    boton.classList.remove('active');
    boton.setAttribute('aria-pressed', 'false');
  });
  botonPulsado.classList.add('active');
  botonPulsado.setAttribute('aria-pressed', 'true');
}

function initFiltros() {
  botonesFiltro.forEach(function (boton) {
    boton.addEventListener('click', function () {
      aplicarFiltro(boton.dataset.filtro);
      marcarFiltroActivo(boton);
    });
  });
}


/* ==========================================================
   ARRANQUE
   ========================================================== */

function init() {
  initNavegacion();
  initDetallesEventos();
  initFiltros();
}

init();
