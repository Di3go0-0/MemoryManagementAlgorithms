let secuence = "7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 1 2 0"
    .split(" ")
    .map(Number);
const frames = 4;
const pages = secuence.length;
let page_faults = 0;
let pages_memori = []; // Pages in memory

// Función para encontrar la página que será reemplazada (la que está más lejos de usarse)
function findFarthestPage(secuence, pages_memori, current_index) {
    let farthest_index = -1;
    let page_to_replace = -1;

    for (let j = 0; j < pages_memori.length; j++) {
        let future_use = secuence.slice(current_index + 1).indexOf(pages_memori[j]);

        if (future_use === -1) {
            // Si una página no se usará más, la reemplazamos directamente
            return j;
        } else if (future_use > farthest_index) {
            // Encontramos la página que está más lejos de usarse
            farthest_index = future_use;
            page_to_replace = j;
        }
    }
    return page_to_replace;
}

// Implementación del algoritmo Óptimo
for (let i = 0; i < pages; i++) {
    let current_page = secuence[i];

    // Si la página ya está en memoria, continuar
    if (pages_memori.includes(current_page)) {
        console.log(pages_memori);
        continue;
    }

    // Si no hay espacio en los frames, buscamos cuál reemplazar
    if (pages_memori.length === frames) {
        let page_to_replace = findFarthestPage(secuence, pages_memori, i);

        // Reemplazamos la página que está más lejos de usarse
        pages_memori[page_to_replace] = current_page;
        page_faults++;
        console.log(pages_memori);
    } else {
        // Si hay espacio, simplemente insertamos la página
        pages_memori.push(current_page);
        page_faults++;
        console.log(pages_memori);
    }
}

console.log("Secuence: ", secuence);
console.log("Frames: ", frames);
console.log("Pages: ", pages);
console.log("Page faults: ", page_faults);
