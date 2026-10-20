# Rosario a la mesa · Cómo cargar contenido

Página publicada: **https://mateoaleu06-ops.github.io/Rosario-a-la-mesa/**

Todo se hace desde la web de GitHub, sin instalar nada. Cada vez que guardás un cambio ("Commit changes"), la página se actualiza sola en 1 o 2 minutos.

## Publicar una nota nueva

1. Si la nota tiene foto, subila primero: entrá a la carpeta `img/notas` → **Add file → Upload files** → arrastrá la foto → **Commit changes**.
   Usá nombres simples, sin espacios ni tildes: `cafe-don-pedro.jpg`.
2. Abrí `PLANTILLA-NOTA.md` y copiá todo su contenido.
3. Entrá a la carpeta `_notas` → **Add file → Create new file**.
4. Nombre del archivo: palabras separadas por guiones y terminado en `.md`. Por ejemplo, `cafe-don-pedro.md`.
5. Pegá la plantilla, completá los datos de arriba (título, bajada, sección, autor, fecha, foto…) y escribí el texto abajo.
6. Tocá **Commit changes**.

La nota aparece sola en la portada, en "Últimas publicaciones" y en su sección.

- **Nota principal de portada:** la más reciente que tenga `destacada: true`. Si ninguna lo tiene, va la más reciente.
- **Videos:** si la nota tiene `youtube:` con un enlace, el video aparece dentro de la nota y en el bloque "Mirá y escuchá" de la portada.
- **Verticales:** las notas con `formato: Vertical` aparecen en la columna "Verticales" de la portada.

## Editar o borrar una nota

Entrá a `_notas`, abrí la nota y usá el lápiz para editar. Para borrarla, usá los tres puntos (…) → **Delete file**.
**Borren `ejemplo-borrar.md` cuando publiquen la primera nota real.**

## Otros datos del sitio

| Qué | Dónde se cambia |
|---|---|
| Enlaces de YouTube e Instagram, email, materia, universidad, franja de "versión de prueba" | `_config.yml` |
| Integrantes de la redacción (Quiénes somos) | `_data/equipo.yml` (fotos en `img/equipo/`) |
| Nombre y descripción de las secciones | `_data/secciones.yml` |
| Textos de Quiénes somos | `quienes-somos.html` |
| Colores y tipografías | `css/styles.css` (bloque `:root`, al principio) |

## Si algo sale mal

Si después de guardar la página no cambia o deja de verse, casi siempre falta una comilla o un dato quedó mal escrito en la parte de arriba de la nota (entre las dos líneas `---`).
Para ver qué pasó, en el repositorio entrá a la pestaña **Actions**: una cruz roja indica el error. Siempre se puede volver atrás desde el historial del archivo (**History**).

## Cómo está armado (para quien quiera saber)

El sitio usa Jekyll, la herramienta que GitHub Pages trae incorporada y gratis. Las carpetas que empiezan con guion bajo son las piezas que se repiten: `_layouts` (moldes de página), `_includes` (encabezado, pie, tarjetas) y `_notas` (el contenido). Para cargar contenido no hace falta tocar `_layouts` ni `_includes`.
