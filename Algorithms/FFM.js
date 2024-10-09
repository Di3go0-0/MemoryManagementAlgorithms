function FFM(secuencia, numFrames) {
    let frames = new Array(numFrames).fill(null); // Inicializamos los frames de memoria vacíos
    let bitsReferencia = new Array(numFrames).fill(null); // Inicializamos los bits de referencia
    let puntero = 0; // Inicializamos el puntero para el reemplazo FIFO
    let fallos = 0; // Contador de fallos de página
    let resultado = []; // Para almacenar el estado de los frames en cada iteración
    let bitsResultado = []; // Para almacenar el estado de los bits de referencia

    // Iteramos sobre cada página en la secuencia de páginas solicitadas
    secuencia.forEach((pagina, iteracion) => {
        console.log(`Entrando página: ${pagina}`);
        
        let indice = frames.indexOf(pagina); // Verificamos si la página ya está en los frames

        if (indice !== -1) {  
            // La página ya está en los frames, no hay fallo de página
            bitsReferencia[indice] = iteracion;  // Actualizamos el bit de referencia con el índice actual
        } else {
            // La página no está en los frames, es un fallo de página
            fallos++;  // Aumentamos el contador de fallos de página

            // Ciclo para buscar la página que será reemplazada
            while (true) {
                if (bitsReferencia[puntero] === null) {
                    // Si no tiene bit de referencia, reemplazamos
                    frames[puntero] = pagina; // Reemplazamos el frame
                    bitsReferencia[puntero] = iteracion; // Guardamos el índice de la iteración como bit de referencia
                    puntero = (puntero + 1) % numFrames; // Movemos el puntero circularmente
                    break; // Terminamos el ciclo de reemplazo
                } else {
                    // Si tiene bit de referencia, lo reseteamos y movemos el puntero
                    bitsReferencia[puntero] = null; // Reseteamos el bit de referencia
                    puntero = (puntero + 1) % numFrames; // Movemos el puntero circularmente
                }
            }
        }

        // Guardamos el estado de los frames y bits de referencia en cada iteración
        resultado.push({ ...frames }); // Copiamos el estado de los frames
        bitsResultado.push([...bitsReferencia]); // Guardamos el estado de bits de referencia

        console.log(`Frames:`, frames);
        console.log(`Bits de referencia:`, bitsReferencia);
    });

    console.log(`Total de fallos de página: ${fallos}`);

    // Retornamos el estado de los frames en cada iteración y el número de fallos
    return {
        framesState: resultado,
        bitsReferenciaState: bitsResultado,
        pageFaults: fallos
    };
}

// Ejemplo de uso
const secuenciaPaginas = [1, 2, 3, 4, 1, 2, 5, 1];
const numFrames = 4;

const resultado = FFM(secuenciaPaginas, numFrames);

// Mostramos los resultados
console.log("Estado de los frames por iteración: ", resultado.framesState);
console.log("Estado de los bits de referencia por iteración: ", resultado.bitsReferenciaState);
console.log("Total de fallos de página: ", resultado.pageFaults);