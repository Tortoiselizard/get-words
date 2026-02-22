// Importa el módulo 'fs' (ya no necesitamos 'readline' porque leeremos el archivo completo)
const fs = require('fs');

// El nombre del archivo de entrada se obtiene del tercer argumento de la terminal
const archivoEntrada = process.argv[2];

// Valida que el usuario haya proporcionado un nombre de archivo
if (!archivoEntrada) {
  console.error('Error: Debes proporcionar el nombre de un archivo de entrada.');
  console.error('Uso: node app.js <archivo_de_entrada>');
  process.exit(1);
}

// Define el nombre del archivo de salida
const archivoSalida = 'words.txt';

// Usa un Set para almacenar las palabras que ya hemos visto y evitar duplicados
const palabrasVistas = new Set();

try {
  // Lee todo el contenido del archivo de forma síncrona
  // Esto es más fácil para procesar texto multilínea que usar un lector línea por línea
  const contenido = fs.readFileSync(archivoEntrada, 'utf8');

  // Expresión regular para capturar la palabra en inglés y su correspondiente en español.
  // - <div class=english_word>\s*([^<]+?)\s*<\/div> captura la palabra en inglés.
  // - [\s\S]*? permite saltar todo el contenido intermedio (como la pronunciación) incluyendo saltos de línea.
  // - <div class=spanish_word>\s*([^<]+?)\s*<\/div> captura la palabra en español.
  const regex = /<div class=english_word>\s*([^<]+?)\s*<\/div>[\s\S]*?<div class=spanish_word>\s*([^<]+?)\s*<\/div>/g;

  // Crea una stream de escritura para el archivo de salida
  const streamEscritura = fs.createWriteStream(archivoSalida);

  let match;
  
  // regex.exec() buscará todas las coincidencias en el archivo una por una
  while ((match = regex.exec(contenido)) !== null) {
    // match[1] es el primer grupo capturado (inglés) y match[2] es el segundo (español)
    const englishWord = match[1].trim();
    const spanishWord = match[2].trim();

    // Si la palabra en inglés no está en el Set, la agregamos y la escribimos en el archivo
    if (!palabrasVistas.has(englishWord)) {
      palabrasVistas.add(englishWord);
      streamEscritura.write(`${englishWord}: ${spanishWord}\n`);
    }
  }

  // Cierra el stream de escritura
  streamEscritura.end();

  // Escucha el evento 'finish' para avisar que se completó la escritura
  streamEscritura.on('finish', () => {
    console.log(`Proceso completado. Se ha creado el archivo "${archivoSalida}" con el formato solicitado.`);
  });

} catch (err) {
  // Escucha errores en caso de que el archivo no exista o haya otro problema
  console.error(`Ocurrió un error al leer o procesar el archivo: ${err.message}`);
}
