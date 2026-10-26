/* =========================================================
   ROSARIO A LA MESA — Juegos de la sección Juegos
   1. Trivia gastronómica (datos en _data/trivia.yml)
   2. Cada pasta con su salsa (datos en _data/pastas_juego.yml)
   ========================================================= */
(function () {
  function mezclar(lista) {
    var a = lista.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function el(tag, attrs, texto) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (texto != null) e.textContent = texto;
    return e;
  }

  /* ---------- 1. TRIVIA ---------- */
  var cajaTrivia = document.querySelector('[data-trivia]');
  var datosTrivia = document.getElementById('datos-trivia');
  if (cajaTrivia && datosTrivia) {
    var D = JSON.parse(datosTrivia.textContent);
    var preguntas, actual, aciertos;

    function empezar() {
      preguntas = mezclar(D.preguntas);
      actual = 0; aciertos = 0;
      mostrar();
    }

    function mostrar() {
      var p = preguntas[actual];
      cajaTrivia.innerHTML = '';
      cajaTrivia.appendChild(el('p', { 'class': 'trivia__progreso' }, 'Pregunta ' + (actual + 1) + ' de ' + preguntas.length));
      var barra = el('div', { 'class': 'trivia__barra', 'aria-hidden': 'true' });
      var lleno = el('span'); lleno.style.width = (actual / preguntas.length * 100) + '%';
      barra.appendChild(lleno); cajaTrivia.appendChild(barra);
      var titulo = el('p', { 'class': 'trivia__pregunta', tabindex: '-1' }, p.pregunta);
      cajaTrivia.appendChild(titulo);
      var lista = el('div', { 'class': 'trivia__opciones', role: 'group', 'aria-label': 'Opciones' });
      mezclar(p.opciones).forEach(function (op) {
        var b = el('button', { type: 'button', 'class': 'trivia__opcion' }, op);
        b.addEventListener('click', function () { responder(b, op, p); });
        lista.appendChild(b);
      });
      cajaTrivia.appendChild(lista);
      cajaTrivia.appendChild(el('div', { 'class': 'trivia__feedback', 'aria-live': 'polite' }));
      titulo.focus({ preventScroll: true });
    }

    function responder(boton, op, p) {
      var bien = op === p.correcta;
      if (bien) aciertos++;
      cajaTrivia.querySelectorAll('.trivia__opcion').forEach(function (b) {
        b.disabled = true;
        if (b.textContent === p.correcta) b.classList.add('es-correcta');
      });
      if (!bien) boton.classList.add('es-incorrecta');
      var fb = cajaTrivia.querySelector('.trivia__feedback');
      fb.appendChild(el('p', { 'class': 'trivia__veredicto ' + (bien ? 'ok' : 'no') }, bien ? '¡Correcto!' : 'No era esa.'));
      fb.appendChild(el('p', null, p.dato));
      if (p.nota && D.notas[p.nota]) {
        var fuente = el('p', { 'class': 'juego__fuente' }, 'Leé más: ');
        fuente.appendChild(el('a', { href: D.base + p.nota + '/' }, D.notas[p.nota]));
        fb.appendChild(fuente);
      }
      var ultima = actual === preguntas.length - 1;
      var sig = el('button', { type: 'button', 'class': 'boton boton--rojo' }, ultima ? 'Ver resultado' : 'Siguiente pregunta');
      sig.addEventListener('click', function () { actual++; ultima ? final() : mostrar(); });
      fb.appendChild(sig);
      sig.focus({ preventScroll: true });
    }

    function final() {
      var total = preguntas.length;
      var msj = aciertos === total ? '¡Perfecto! Sabés más que nosotros.'
        : aciertos >= total * 0.7 ? '¡Muy bien! Tenés buen paladar para los datos.'
        : aciertos >= total * 0.4 ? 'Nada mal. Hay un par de notas que te van a encantar.'
        : 'Hay mucho por descubrir: arrancá por nuestras notas.';
      cajaTrivia.innerHTML = '';
      cajaTrivia.appendChild(el('p', { 'class': 'trivia__puntaje', tabindex: '-1' }, aciertos + ' de ' + total));
      cajaTrivia.appendChild(el('p', { 'class': 'trivia__mensaje' }, msj));
      var otra = el('button', { type: 'button', 'class': 'boton boton--rojo' }, 'Jugar de nuevo');
      otra.addEventListener('click', empezar);
      cajaTrivia.appendChild(otra);
      cajaTrivia.querySelector('.trivia__puntaje').focus({ preventScroll: true });
    }

    cajaTrivia.querySelector('[data-empezar]').addEventListener('click', empezar);
  }

  /* ---------- 2. CADA PASTA CON SU SALSA ---------- */
  var form = document.querySelector('[data-pastas]');
  var datosPastas = document.getElementById('datos-pastas');
  if (form && datosPastas) {
    var P = JSON.parse(datosPastas.textContent);
    var listaP = form.querySelector('.pastas__lista');
    var resultado = form.querySelector('.juego__resultado');
    var reiniciar = form.querySelector('[data-reiniciar]');

    function armar() {
      listaP.innerHTML = ''; resultado.textContent = '';
      reiniciar.hidden = true;
      form.querySelector('[type=submit]').disabled = false;
      var salsas = mezclar(P.map(function (x) { return x.salsa; }));
      mezclar(P).forEach(function (item, i) {
        var li = el('li', { 'class': 'pastas__item' });
        var id = 'pasta-' + i;
        var label = el('label', { 'for': id, 'class': 'pastas__pasta' });
        label.appendChild(el('strong', null, item.pasta));
        label.appendChild(el('span', { 'class': 'pastas__tipo' }, item.tipo));
        var sel = el('select', { id: id, 'data-correcta': item.salsa });
        sel.appendChild(el('option', { value: '' }, 'Elegí una salsa…'));
        salsas.forEach(function (s) { sel.appendChild(el('option', { value: s }, s)); });
        li.appendChild(label); li.appendChild(sel);
        li.appendChild(el('p', { 'class': 'pastas__porque', hidden: '' }, item.porque));
        listaP.appendChild(li);
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var sels = listaP.querySelectorAll('select');
      var faltan = Array.prototype.some.call(sels, function (s) { return !s.value; });
      if (faltan) { resultado.textContent = 'Te falta elegir la salsa de alguna pasta.'; return; }
      var bien = 0;
      sels.forEach(function (s) {
        var li = s.closest('li');
        var ok = s.value === s.getAttribute('data-correcta');
        if (ok) bien++;
        li.classList.toggle('es-correcta', ok);
        li.classList.toggle('es-incorrecta', !ok);
        var porque = li.querySelector('.pastas__porque');
        porque.hidden = false;
        porque.textContent = (ok ? '✔ ' : '✘ Le va: ' + s.getAttribute('data-correcta') + '. ') + porque.textContent.replace(/^(✔ |✘ Le va: .*?\. )/, '');
        s.disabled = true;
      });
      resultado.textContent = bien === sels.length ? '¡Perfecto! ' + bien + ' de ' + sels.length + '. Sos de la escuela italiana.'
        : bien + ' de ' + sels.length + '. Mirá la explicación de cada una.';
      form.querySelector('[type=submit]').disabled = true;
      reiniciar.hidden = false;
    });
    reiniciar.addEventListener('click', armar);
    armar();
  }
})();
