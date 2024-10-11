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
            // La página ya está en los frames, limpia todos los bits y luego asigna el bit de referencia
            bitsReferencia.fill(0); // Limpiamos todos los bits de referencia
            bitsReferencia[indexPagina] = 1; // Asignamos el bit de referencia a la página actual
        } else {
            // Fallo de página, la página no está en los frames
            pageFaults++;

            // Busca la página más vieja para reemplazar
            let found = false;
            while (!found) {
                if (bitsReferencia[indexReemplazo] === 1) {
                    // Si tiene bit de referencia, se lo quitamos
                    bitsReferencia[indexReemplazo] = 0;
                } else {
                    // Si no tiene bit de referencia, reemplazamos
                    frames[indexReemplazo] = pagina;
                    found = true; // Marcamos que ya hemos encontrado el lugar para reemplazar
                }
                indexReemplazo = (indexReemplazo + 1) % numFrames;
            }

            // Después de reemplazar, limpiamos todos los bits y asignamos el bit de referencia a la nueva página
            bitsReferencia.fill(0); // Limpiamos todos los bits de referencia
            bitsReferencia[indexReemplazo] = 0; // Se resetea el bit de referencia
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
const secuenciaPaginas = [1, 2, 1, 2];
const numFrames = 2;

const resultado = FFM(secuenciaPaginas, numFrames);

console.log("Estado de los frames por iteración: ", resultado.framesState);
console.log("Estado de los bits de referencia por iteración: ", resultado.bitsReferenciaState);
console.log("Fallos de página: ", resultado.pageFaults);

export default FFM;