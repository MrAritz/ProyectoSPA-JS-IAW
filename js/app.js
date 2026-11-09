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
   ARRANQUE
   ========================================================== */

function init() {
  initNavegacion();
}

init();
