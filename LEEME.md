# Rosario a la mesa · Sitio web V0

La primera versión funcional del sitio. Es estática: usa solo HTML, CSS y un poco de JavaScript. No necesita servidor, base de datos ni instalar nada.

## Cómo abrirlo en la computadora

1. Descomprimí la carpeta `rosario-a-la-mesa` donde quieras (por ejemplo, en Documentos).
2. Abrí `index.html` con doble clic. Se abre en el navegador.
3. Para editar, abrí la carpeta con un editor de texto (VS Code es gratuito). Guardá y recargá el navegador para ver los cambios.

> Las tipografías (Anton y Archivo) se cargan desde Google Fonts, así que se ven bien cuando hay conexión a internet. Sin conexión, el sitio funciona igual, pero con una tipografía de reemplazo.

## Estructura de archivos

```
rosario-a-la-mesa/
├── index.html                  Portada
├── quienes-somos.html          Qué es el medio, propuesta y redacción
├── css/styles.css              Todo el diseño (colores y tipografías arriba de todo, en :root)
├── js/main.js                  Menú en celular, fecha de hoy y filtros de Recomendaciones
├── img/                        Logo, favicon y, más adelante, las fotos de las notas
├── secciones/
│   ├── recomendaciones.html
│   ├── entrevistas-y-debates.html
│   └── juegos.html
└── notas/
    └── plantilla-nota.html     Modelo para cada nota nueva
```

El encabezado y el pie se repiten en cada página. Si cambian el menú, hay que cambiarlo en todos los archivos .html. Para un sitio de este tamaño es lo más simple, porque evita usar herramientas extra.

## Cómo publicar una nota nueva

1. Copiá `notas/plantilla-nota.html` y renombrala (ej.: `notas/cafe-de-barrio.html`, sin espacios ni tildes).
2. Reemplazá cada `[CORCHETE]` por el contenido real: sección, título, bajada, autor/a, fecha, foto, cuerpo, intertítulos, fuentes.
3. Guardá la foto en `img/` y reemplazá el bloque `<div class="img-ph">` por
   `<img class="foto" src="../img/nombre-foto.jpg" alt="Descripción de lo que muestra la foto">`.
4. Enlazala desde la portada y desde su sección: cambiá `plantilla-nota.html` por el nombre del archivo nuevo en la tarjeta correspondiente.

## Qué es decisión del equipo y qué es propuesta

Tomado del documento del equipo: nombre, descripción, línea editorial, promesa, tono, las 3 secciones, plataformas (YouTube e Instagram), formatos (podcast, video, verticales, notas), colores rojo y crema, tipografía Anton y el logo.

Propuestas de diseño o desarrollo (se pueden cambiar o quitar):
- Tipografía Archivo para el texto de lectura (Anton es muy gruesa para párrafos largos).
- Filtros por tipo de lugar en Recomendaciones (restaurantes, bares, cafeterías, según presupuesto, barrios gastronómicos, lugares virales). Salen de la lista de secciones del cuadro inicial.
- "Ficha del lugar" en las notas de recomendaciones (dirección, barrio, horarios, precio de referencia).
- Etiqueta "Actualidad" para distinguir notas de coyuntura de la agenda propia.
- Nombres de bloques de portada: "También en la mesa" y "Mirá y escuchá".
- Lema del encabezado: "Gastronomía rosarina: dónde comer y qué hay detrás de cada lugar".

## Contradicción detectada en el documento

El cuadro "Antes de pegar el prompt" lista 10 secciones (restaurantes, bares, cafeterías, reseñas, entrevistas, detrás de escena, lugares según presupuesto, barrios gastronómicos, lugares virales, debates gastronómicos). El prompt maestro lista 3 (recomendación, entrevistas/debate, juegos). La V0 usa las 3 del prompt como menú principal y convierte varias de las 10 en filtros dentro de Recomendaciones. "Detrás de escena" y "Reseñas" quedaron como formatos o temas, no como secciones. El equipo tiene que confirmar cuál esquema prioriza.

## Decisiones pendientes

1. Enlaces reales del canal de YouTube y la cuenta de Instagram (hoy apuntan a `#`).
2. Qué juegos van a tener y cómo participa la audiencia (la sección Juegos está vacía de contenido).
3. Integrantes de la redacción, roles y fotos (Quiénes somos).
4. Email de contacto, materia/cátedra y universidad (pie de página).
5. Criterio para elegir la nota principal de la portada y cada cuánto se actualiza.
6. Si el precio de referencia de los lugares se publica, con qué fecha de relevamiento.

## Publicación (cuando el sitio esté estable)

Opción gratuita y simple: GitHub Pages. Se sube esta carpeta a un repositorio y se activa Pages en la configuración. Todas las rutas del sitio son relativas, así que funcionan sin cambios.
