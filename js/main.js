/* =========================================================
   ROSARIO A LA MESA — JavaScript mínimo
   Solo hace tres cosas:
   1. Abrir y cerrar el menú en celular.
   2. Mostrar la fecha de hoy en el encabezado.
   3. Filtrar notas por tipo de lugar en la sección Recomendaciones.
   ========================================================= */

// Marca que hay JavaScript: el CSS usa esto para ocultar el menú en celular.
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {

  // 1. Menú en celular
  var boton = document.querySelector('.boton-menu');
  var nav = document.getElementById('menu-principal');
  if (boton && nav) {
    boton.addEventListener('click', function () {
      var abierto = nav.classList.toggle('abierto');
      boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
      boton.textContent = abierto ? 'Cerrar' : 'Menú';
    });
  }

  // 2. Fecha de hoy (ej.: "martes 13 de octubre de 2026")
  var fecha = document.querySelector('[data-fecha-hoy]');
  if (fecha) {
    var hoy = new Date();
    fecha.textContent = hoy.toLocaleDateString('es-AR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
    fecha.setAttribute('datetime', hoy.toISOString().slice(0, 10));
  }

  // Videos de YouTube: al tocar la portada se carga el reproductor
  document.querySelectorAll('.video__portada').forEach(function (enlace) {
    enlace.addEventListener('click', function (e) {
      e.preventDefault();
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/' + enlace.getAttribute('data-yt') + '?autoplay=1&rel=0';
      iframe.title = enlace.getAttribute('data-titulo') || 'Video de YouTube';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allowFullscreen = true;
      enlace.parentNode.replaceChild(iframe, enlace);
    });
  });

  // 3. Filtros de la sección Recomendaciones
  //    Cada botón tiene data-filtro="cafeterias" (o "todas").
  //    Cada tarjeta tiene data-tipo="cafeterias".
  var botones = document.querySelectorAll('.filtros button');
  var tarjetas = document.querySelectorAll('[data-tipo]');
  var vacio = document.querySelector('.filtros__vacio');
  botones.forEach(function (b) {
    b.addEventListener('click', function () {
      var filtro = b.getAttribute('data-filtro');
      botones.forEach(function (otro) { otro.setAttribute('aria-pressed', otro === b ? 'true' : 'false'); });
      var visibles = 0;
      tarjetas.forEach(function (t) {
        var mostrar = filtro === 'todas' || t.getAttribute('data-tipo') === filtro;
        t.hidden = !mostrar;
        if (mostrar) visibles++;
      });
      if (vacio) vacio.hidden = visibles > 0;
    });
  });
});
