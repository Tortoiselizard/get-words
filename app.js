// Importa los módulos 'fs' y 'readline'
const fs = require('fs');
const readline = require('readline');

// El nombre del archivo de entrada se obtiene del tercer argumento de la terminal
const archivoEntrada = process.argv[2];

// Valida que el usuario haya proporcionado un nombre de archivo
if (!archivoEntrada) {
  console.error('Error: Debes proporcionar el nombre de un archivo de entrada.');
  console.error('Uso: node numerar-lineas.js <archivo_de_entrada>');
  process.exit(1);
}

// Define el nombre del archivo de salida
const archivoSalida = 'words.txt';

// Usa un Set para almacenar las líneas que ya hemos visto y evitar duplicados
const lineasVistas = new Set();
// Usa un contador para numerar las líneas
let contadorLineas = 1;

// Crea una interfaz de lectura de líneas para el archivo de entrada
const rl = readline.createInterface({
  input: fs.createReadStream(archivoEntrada),
  output: process.stdout,
  terminal: false // Establece a 'false' para evitar que se envíe a la consola
});

// Crea una stream de escritura para el archivo de salida
const streamEscritura = fs.createWriteStream(archivoSalida);

// Escucha el evento 'line' que se dispara por cada línea leída
rl.on('line', (linea) => {
  debugger
  // Elimina espacios en blanco al principio y al final de la línea
  const lineaLimpia = linea.trim();

  // Si la línea no está vacía, le añade un número y la escribe en el nuevo archivo
  if (lineaLimpia.length > 0) {
    const indexWord = lineaLimpia.indexOf("       ")
    const word = lineaLimpia.slice(0,indexWord)
    if (!lineasVistas.has(word)) {
      lineasVistas.add(word)
      streamEscritura.write(`${word}\n`);
      contadorLineas++;
    }
  }
});

// Escucha el evento 'close' que se dispara al terminar de leer el archivo
rl.on('close', () => {
  console.log(`Proceso completado. Se ha creado el archivo "${archivoSalida}" con las líneas numeradas.`);
  streamEscritura.end(); // Cierra el stream de escritura
});

// Escucha errores en caso de que el archivo no exista o haya otro problema
rl.on('error', (err) => {
  console.error(`Ocurrió un error al leer el archivo: ${err}`);
});
