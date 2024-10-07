const secuence = "1 2 3 4 1 2 5 1 2 3 4 5".split(" ").map(Number);
const frames = 4;
const pages = secuence.length;
let page_faults = 0;
let lru = []; // Array para guardar las páginas en memoria

// Función para insertar en LRU y gestionar los fallos de página
function insertIntoLRU(page) {
    let pageIndex = lru.indexOf(page);

    // Si la página ya está en memoria, simplemente la movemos al final (se acaba de usar)
    if (pageIndex !== -1) {
        lru.splice(pageIndex, 1); // Eliminar la página de su posición anterior
        lru.push(page); // Moverla al final (más recientemente usada)
        printFrameState();
        return; // No hay fallo de página
    }

    // Si hay un espacio disponible en los frames
    if (lru.length < frames) {
        lru.push(page); // Insertamos la nueva página
        page_faults++; // Contamos un fallo de página
    } else {
        // Si no hay espacio, reemplazamos la página menos recientemente usada (la primera en el array)
        lru.shift(); // Eliminamos la página más vieja
        lru.push(page); // Insertamos la nueva página
        page_faults++; // Contamos un fallo de página
    }

    printFrameState(); // Mostrar el estado actual de los frames
}

// Función para imprimir el estado de los frames
function printFrameState() {
    console.log("Frames: ", [...lru]); // Mostrar el estado del frame actual
}

// Implementación del algoritmo LRU
for (let i = 0; i < pages; i++) {
    insertIntoLRU(secuence[i]);
}

console.log("Secuence: ", secuence);
console.log("Frames: ", frames);
console.log("Pages: ", pages);
console.log("Page faults: ", page_faults);
