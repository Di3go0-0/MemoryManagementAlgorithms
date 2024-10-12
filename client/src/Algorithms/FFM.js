const FFM = (secuencia, numFrames) => {
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
            // La página ya está en los frames, actualizamos su bit de referencia
            if (bitsReferencia[indexPagina] === 0) {
                // Solo se activa el bit de referencia si estaba en 0
                bitsReferencia[indexPagina] = 1;
                
                // Desactiva el bit de referencia de las demás páginas
                for (let j = 0; j < numFrames; j++) {
                    if (j !== indexPagina) {
                        bitsReferencia[j] = 0; // Desactiva los otros bits de referencia
                    }
                }
            }
        } else {
            // Fallo de página, la página no está en los frames
            pageFaults++;

            // Busca la página más vieja para reemplazar
            while (bitsReferencia[indexReemplazo] === 1) {
                bitsReferencia[indexReemplazo] = 0; // Limpia el bit de referencia y sigue buscando
                indexReemplazo = (indexReemplazo + 1) % numFrames; // Mueve al siguiente frame
            }

            // Reemplaza la página más antigua
            frames[indexReemplazo] = pagina;
            bitsReferencia[indexReemplazo] = 0; // Se resetea el bit de referencia para la nueva página
            indexReemplazo = (indexReemplazo + 1) % numFrames; // Mueve al siguiente índice de reemplazo
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
};

// Ejemplo de uso
const secuenciaPaginas = [7, 0, 1, 7, 1, 2];
const numFrames = 3;

const resultado = FFM(secuenciaPaginas, numFrames);

console.log("Estado de los frames por iteración: ", resultado.framesState);
console.log("Estado de los bits de referencia por iteración: ", resultado.bitsReferenciaState);
console.log("Fallos de página: ", resultado.pageFaults);

export default FFM;
