function FFM(secuencia, numFrames) {
    let frames = new Array(numFrames).fill(null); // Inicializa los frames vacíos
    let bitsReferencia = new Array(numFrames).fill(0); // Inicializa los bits de referencia en 0
    let resultado = []; // Estado de los frames por iteración
    let bitsResultado = []; // Estado de los bits de referencia por iteración
    let pageFaults = 0; // Contador de fallos de página
    let indexReemplazo = 0; // Índice para llevar el control del reemplazo en orden FIFO

    for (let i = 0; i < secuencia.length; i++) {
        const pagina = secuencia[i];
        const indexPagina = frames.indexOf(pagina); // Verifica si la página ya está en los frames

        if (indexPagina !== -1) {
            // La página ya está en los frames, actualiza su bit de referencia
            bitsReferencia.fill(0); // Solo puede haber un bit de referencia a la vez
            bitsReferencia[indexPagina] = 1;
        } else {
            // Fallo de página, la página no está en los frames
            pageFaults++;

            // Busca la página más vieja para reemplazar
            while (bitsReferencia[indexReemplazo] === 1) {
                bitsReferencia[indexReemplazo] = 0; // Quita el bit de referencia y sigue buscando
                indexReemplazo = (indexReemplazo + 1) % numFrames;
            }

            // Reemplaza la página más antigua
            frames[indexReemplazo] = pagina;
            bitsReferencia[indexReemplazo] = 0; // Restablece el bit de referencia de la página reemplazada
            indexReemplazo = (indexReemplazo + 1) % numFrames;
        }

        // Guarda el estado actual de los frames y los bits de referencia
        resultado.push([...frames]); // Clona el estado de los frames
        bitsResultado.push([...bitsReferencia]); // Clona el estado de los bits de referencia
    }

    return {
        framesState: resultado,
        bitsReferenciaState: bitsResultado,
        pageFaults: pageFaults
    };
}

// Ejemplo de uso
const secuenciaPaginas = [1, 2, 3, 4, 1, 2, 5, 1];
const numFrames = 4;

const resultado = FFM(secuenciaPaginas, numFrames);

console.log("Estado de los frames por iteración: ", resultado.framesState);
console.log("Estado de los bits de referencia por iteración: ", resultado.bitsReferenciaState);
console.log("Fallos de página: ", resultado.pageFaults);