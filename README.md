# 📄 README: Extractor de Palabras Únicas (app.js)

---

## 💡 Propósito del Código

Este script de Node.js está diseñado para procesar un archivo de texto de gran tamaño, extrayendo la primera sección de cada línea (considerada una "palabra") y eliminando cualquier duplicado. El proceso utiliza *streams* de lectura y escritura (`fs` y `readline`) para manejar el archivo de manera eficiente y no bloqueante.

El archivo de texto a procesar debe contener el mismo formato que el que se obtienen cuando se exporta un mazo de Anki.

La lógica de extracción de la "palabra" es la siguiente:
1. Lee el archivo línea por línea.
2. Recorta los espacios en blanco iniciales y finales de la línea.
3. La "palabra" se define como el texto que precede a **siete espacios consecutivos** (`"       "`) dentro de la línea.
4. Utiliza una estructura de datos `Set` para garantizar que solo se procesen y escriban las palabras **únicas**.

---

## 🛠️ Requisitos

* **Node.js** instalado en tu sistema.
* El archivo de entrada debe tener el formato esperado donde las "palabras" de interés están separadas por siete espacios de cualquier contenido posterior.

Puedes obtener el archivo de entrada exportando un mazo desde Anki con los siguientes pasos:
1. Abre la ventana "Export" desde File -> Export...
2. En la selección "Export format" elige la opción "Cards in Plain Text (.txt)".
3. Desmarca todos los checkbox y presiona el botón "Export".

---

## 🚀 Cómo Usar el Código

El script requiere que proporciones la ruta o nombre del archivo de entrada como un argumento al ejecutarlo.

### Ejecución
Abre tu terminal o línea de comandos, navega hasta la carpeta donde se encuentra `app.js` y ejecuta el script de la siguiente manera:

```bash
node app.js <archivo_de_entrada>
