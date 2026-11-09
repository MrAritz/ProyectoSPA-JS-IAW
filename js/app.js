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

// Formulario de contacto
const formContacto = document.querySelector('#form-contacto');
const alertaContacto = document.querySelector('#contacto-alerta');
const contactoNombre = document.querySelector('#contacto-nombre');
const contactoEmail = document.querySelector('#contacto-email');
const contactoTelefono = document.querySelector('#contacto-telefono');
const contactoAsunto = document.querySelector('#contacto-asunto');
const contactoMensaje = document.querySelector('#contacto-mensaje');

// Formulario de registro
const formRegistro = document.querySelector('#form-registro');
const alertaRegistro = document.querySelector('#registro-alerta');
const registroNombre = document.querySelector('#registro-nombre');
const registroEmail = document.querySelector('#registro-email');
const registroCurso = document.querySelector('#registro-curso');
const registroParticipacion = document.querySelectorAll('.participacion'); // los 3 checkboxes
const errorParticipacion = document.querySelector('#registro-participacion-error');
const registroNormas = document.querySelector('#registro-normas');

// Libros
const botonesInfoLibro = document.querySelectorAll('.btn-info-libro'); // "Más información"
const botonesDestacar = document.querySelectorAll('.btn-destacar');    // "Destacar"


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
   4. FORMULARIOS: FUNCIONES DE AYUDA
   ========================================================== */

// Pinta un campo en verde (is-valid) o en rojo (is-invalid).
// Bootstrap enseña su .invalid-feedback cuando el campo tiene is-invalid.
function marcarCampo(campo, esValido) {
  if (esValido) {
    campo.classList.remove('is-invalid');
    campo.classList.add('is-valid');
    campo.setAttribute('aria-invalid', 'false');
  } else {
    campo.classList.remove('is-valid');
    campo.classList.add('is-invalid');
    campo.setAttribute('aria-invalid', 'true');
  }
}

// Deja un campo sin color (ni verde ni rojo)
function quitarMarcas(campo) {
  campo.classList.remove('is-valid');
  campo.classList.remove('is-invalid');
  campo.removeAttribute('aria-invalid');
}

// Email sencillo: algo antes de la @, y un punto después de la @ que no esté al final
function emailValido(email) {
  const posArroba = email.indexOf('@');
  const posPunto = email.lastIndexOf('.');
  return posArroba > 0 && posPunto > posArroba + 1 && posPunto < email.length - 1;
}

// Devuelve true si el texto solo tiene cifras del 0 al 9
function soloNumeros(texto) {
  for (let i = 0; i < texto.length; i++) {
    if (texto[i] < '0' || texto[i] > '9') {
      return false;
    }
  }
  return true;
}

// Crea un alert de Bootstrap dentro del contenedor.
// Antes vacía el contenedor para que las alertas no se acumulen.
function mostrarAlerta(contenedor, tipo, texto) {
  contenedor.textContent = '';

  const alerta = document.createElement('div');
  alerta.classList.add('alert', 'alert-' + tipo); // alert-success o alert-danger
  alerta.setAttribute('role', 'alert');
  alerta.textContent = texto;

  contenedor.appendChild(alerta);
}

// Vacía el formulario y le quita todos los colores de validación
function limpiarFormulario(formulario) {
  formulario.reset();
  formulario.querySelectorAll('.is-valid, .is-invalid').forEach(function (campo) {
    quitarMarcas(campo);
  });
}

// Lleva el foco al primer campo con error para corregirlo directamente
function enfocarPrimerError(formulario) {
  const primerError = formulario.querySelector('.is-invalid');
  if (primerError !== null) {
    primerError.focus();
  }
}


/* ==========================================================
   5. FORMULARIO DE CONTACTO
   ========================================================== */

function validarContacto(evento) {
  evento.preventDefault(); // no se envía de verdad: el envío es simulado

  // Leemos los valores (trim quita los espacios del principio y del final)
  const nombre = contactoNombre.value.trim();
  const email = contactoEmail.value.trim();
  const telefono = contactoTelefono.value.trim();
  const asunto = contactoAsunto.value;
  const mensaje = contactoMensaje.value.trim();

  // Comprobamos cada campo
  const nombreOk = nombre.length >= 2;
  const emailOk = emailValido(email);
  const telefonoOk = telefono === '' || (telefono.length === 9 && soloNumeros(telefono)); // es opcional
  const asuntoOk = asunto !== '';
  const mensajeOk = mensaje.length >= 10;

  marcarCampo(contactoNombre, nombreOk);
  marcarCampo(contactoEmail, emailOk);
  marcarCampo(contactoAsunto, asuntoOk);
  marcarCampo(contactoMensaje, mensajeOk);

  // El teléfono vacío no se pinta: no es obligatorio
  if (telefono === '') {
    quitarMarcas(contactoTelefono);
  } else {
    marcarCampo(contactoTelefono, telefonoOk);
  }

  if (nombreOk && emailOk && telefonoOk && asuntoOk && mensajeOk) {
    mostrarAlerta(alertaContacto, 'success', '¡Gracias, ' + nombre + '! Hemos recibido tu mensaje y te responderemos pronto. (Envío simulado: no se ha guardado ningún dato).');
    limpiarFormulario(formContacto);
  } else {
    mostrarAlerta(alertaContacto, 'danger', 'Revisa los campos marcados en rojo antes de enviar el mensaje.');
    enfocarPrimerError(formContacto);
  }
}


/* ==========================================================
   6. FORMULARIO DE REGISTRO
   ========================================================== */

// Cuenta cuántos checkboxes de participación están marcados
function contarParticipacion() {
  let marcados = 0;
  registroParticipacion.forEach(function (casilla) {
    if (casilla.checked) {
      marcados++;
    }
  });
  return marcados;
}

function validarRegistro(evento) {
  evento.preventDefault();

  const nombre = registroNombre.value.trim();
  const email = registroEmail.value.trim();
  const curso = registroCurso.value;

  const nombreOk = nombre.length >= 2;
  const emailOk = emailValido(email);
  const cursoOk = curso !== '';
  const participacionOk = contarParticipacion() > 0;
  const normasOk = registroNormas.checked;

  marcarCampo(registroNombre, nombreOk);
  marcarCampo(registroEmail, emailOk);
  marcarCampo(registroCurso, cursoOk);
  marcarCampo(registroNormas, normasOk);

  // Los 3 checkboxes se pintan juntos y comparten un único mensaje de error
  registroParticipacion.forEach(function (casilla) {
    marcarCampo(casilla, participacionOk);
  });
  if (participacionOk) {
    errorParticipacion.classList.remove('d-block');
  } else {
    errorParticipacion.classList.add('d-block'); // d-block hace visible el mensaje
  }

  if (nombreOk && emailOk && cursoOk && participacionOk && normasOk) {
    mostrarAlerta(alertaRegistro, 'success', '¡Inscripción completada, ' + nombre + '! Te avisaremos por correo de las próximas actividades. (Envío simulado: no se ha guardado ningún dato).');
    limpiarFormulario(formRegistro);
    errorParticipacion.classList.remove('d-block');
  } else {
    mostrarAlerta(alertaRegistro, 'danger', 'Revisa los campos marcados en rojo antes de enviar la inscripción.');
    enfocarPrimerError(formRegistro);
  }
}

function initFormularios() {
  formContacto.addEventListener('submit', validarContacto);
  formRegistro.addEventListener('submit', validarRegistro);
}


/* ==========================================================
   7. LIBROS: MÁS INFORMACIÓN Y DESTACAR
   Cada botón busca SU card con closest('.card'),
   así solo afecta a ese libro.
   ========================================================== */

// Crea un párrafo del tipo "Año: 2014" (la etiqueta va en negrita)
function crearDato(etiqueta, valor) {
  const parrafo = document.createElement('p');
  parrafo.classList.add('mb-1');

  const negrita = document.createElement('strong');
  negrita.textContent = etiqueta + ': ';

  parrafo.appendChild(negrita);
  parrafo.append(valor); // append también acepta texto
  return parrafo;
}

// Crea el bloque de detalle con los data-* de la card y lo añade al final
function crearDetalleLibro(card) {
  const detalle = document.createElement('div');
  detalle.classList.add('detalle-libro');

  detalle.appendChild(crearDato('Año', card.dataset.anio));
  detalle.appendChild(crearDato('Páginas', card.dataset.paginas));
  detalle.appendChild(crearDato('Estado', card.dataset.estado));
  detalle.appendChild(crearDato('Dónde está', card.dataset.ubicacion));

  const sinopsis = document.createElement('p');
  sinopsis.classList.add('mt-2', 'mb-0');
  sinopsis.textContent = card.dataset.sinopsis;
  detalle.appendChild(sinopsis);

  card.appendChild(detalle);
}

// Muestra u oculta el detalle del libro sin crearlo dos veces
function toggleInfoLibro(boton) {
  const card = boton.closest('.card');
  const detalle = card.querySelector('.detalle-libro');

  if (detalle === null) {
    crearDetalleLibro(card);
    boton.textContent = 'Ocultar información';
    boton.setAttribute('aria-expanded', 'true');
  } else if (detalle.hidden) {
    detalle.hidden = false;
    boton.textContent = 'Ocultar información';
    boton.setAttribute('aria-expanded', 'true');
  } else {
    detalle.hidden = true;
    boton.textContent = 'Más información';
    boton.setAttribute('aria-expanded', 'false');
  }
}

// Pone o quita la clase "destacado" en la card del botón
function toggleDestacado(boton) {
  const card = boton.closest('.card');
  card.classList.toggle('destacado');

  if (card.classList.contains('destacado')) {
    boton.textContent = 'Quitar destacado';
    boton.setAttribute('aria-pressed', 'true');
  } else {
    boton.textContent = 'Destacar';
    boton.setAttribute('aria-pressed', 'false');
  }
}

function initLibros() {
  botonesInfoLibro.forEach(function (boton) {
    boton.addEventListener('click', function () {
      toggleInfoLibro(boton);
    });
  });

  botonesDestacar.forEach(function (boton) {
    boton.addEventListener('click', function () {
      toggleDestacado(boton);
    });
  });
}


/* ==========================================================
   ARRANQUE: se activa cada parte de la web
   ========================================================== */

function init() {
  initNavegacion();
  initDetallesEventos();
  initFiltros();
  initFormularios();
  initLibros();
}

init();
