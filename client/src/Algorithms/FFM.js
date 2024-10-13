const FFM = (secuencia, numFrames) => {
    const frames = Array(numFrames).fill(null);
    const bitsReferencia = Array(numFrames).fill(0);
    const posiciones = Array(numFrames).fill(null);
    const resultado = [];
    const bitsResultado = [];
    const posicionesResultado = [];
    let pageFaults = 0;
    let iteracion = 0;

    for (let i = 0; i < secuencia.length; i++) {
        const pagina = secuencia[i];
        let encontrado = false;

        // Verificar si la página ya está en los frames
        for (let j = 0; j < numFrames; j++) {
            if (frames[j] === pagina) {
                encontrado = true;
                // Asignar bit de referencia si ya está en los frames
                bitsReferencia[j] = 1;  // Asignar el bit de referencia a la página encontrada
                // Resetear el bit de referencia de la página anterior
                for (let k = 0; k < numFrames; k++) {
                    if (k !== j) {
                        bitsReferencia[k] = 0;
                    }
                }
                break;
            }
        }

        // Si la página no está en los frames
        if (!encontrado) {
            pageFaults++; // Aumentar contador de fallos de página

            // Buscar un espacio vacío en los frames
            const espacioVacioIndex = frames.findIndex(frame => frame === null);
            if (espacioVacioIndex !== -1) {
                // Insertar la nueva página en el espacio vacío
                frames[espacioVacioIndex] = pagina;
                bitsReferencia[espacioVacioIndex] = 0; // No se asigna ningún bit de referencia
                posiciones[espacioVacioIndex] = pagina;  // Añadir la nueva página como la más reciente
            } else {
                // Si no hay espacio, encontrar la página más vieja sin bit de referencia
                let reemplazada = false;
                const posicionesAnteriores = posicionesResultado[iteracion] || posiciones;
                while (!reemplazada) {
                    const paginaMasVieja = posicionesAnteriores[0];  // Tomar la página más vieja
                    const indexViejo = frames.indexOf(paginaMasVieja); // Encontrar la página más vieja en los frames

                    if (bitsReferencia[indexViejo] === 0) {
                        // Si no tiene bit de referencia, reemplazarla
                        frames[indexViejo] = pagina;  // Reemplazar la página en los frames
                        bitsReferencia[indexViejo] = 0;  // Resetear el bit de referencia
                        posiciones.shift();  // Eliminar la página más vieja de la lista
                        posiciones.push(pagina);  // La nueva página se convierte en la más reciente
                        reemplazada = true;
                    } else {
                        // Si tiene bit de referencia, quitar el bit pero no moverla
                        bitsReferencia[indexViejo] = 0;
                        
                        const segundaPaginaMasVieja = posicionesAnteriores[1];  // Tomar la segunda página más vieja
                        const indexSegundoViejo = frames.indexOf(segundaPaginaMasVieja); // Encontrar la segunda página más vieja en los frames
                        
                        frames[indexSegundoViejo] = pagina;  // Reemplazar pagina en la segunda página más vieja
                        bitsReferencia[indexSegundoViejo] = 0;  // Resetear el bit de referencia
                        posiciones.splice(1, 1)
                        posiciones.push(pagina);  // La nueva página se convierte en la más reciente
                        reemplazada = true;
                    }
                }   
            }
        }

        // Guardar el estado actual de los frames, bits de referencia y posiciones
        resultado.push([...frames]);
        bitsResultado.push([...bitsReferencia]);
        posicionesResultado.push([...posiciones]);
        iteracion++; // Incrementar el contador de iteraciones
    }

    return {
        framesState: resultado,
        bitsReferenciaState: bitsResultado,
        posicionesState: posicionesResultado,
        pageFaults: pageFaults
    };
};

// Ejemplo de uso
const secuencia = [7, 0, 1, 2, 0, 3, 1];
const numFrames = 3;
const resultado = FFM(secuencia, numFrames);
console.log(resultado);

export default FFM;