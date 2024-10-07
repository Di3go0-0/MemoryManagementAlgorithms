function segundaOportunidadVariante(secuencia, numFrames) {
    let frames = new Array(numFrames).fill(null);  
    let bitsReferencia = new Array(numFrames).fill(0);  
    let puntero = 0;  
    let fallos = 0;  

    secuencia.forEach(pagina => {
        console.log(`Entrando pagina: ${pagina}`);
        let indice = frames.indexOf(pagina);
        
        if (indice !== -1) {
            bitsReferencia = bitsReferencia.map(() => 0); 
            bitsReferencia[indice] = 1; 
        } else {
           
            fallos++;
           
            while (bitsReferencia[puntero] === 1) {
                bitsReferencia[puntero] = 0;  
                puntero = (puntero + 1) % numFrames; 
            }

            frames[puntero] = pagina;
            bitsReferencia = bitsReferencia.map(() => 0); 
            bitsReferencia[puntero] = 1; 
            puntero = (puntero + 1) % numFrames;  
        }

        console.log(`Frames:`, frames);
        console.log(`Bits de referencia: ${bitsReferencia}`);
    });

    console.log(`Total de fallos de página: ${fallos}`);
}

// Ejemplo de uso
const secuenciaPaginas = [7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0];
const numFrames = 3;

segundaOportunidadVariante(secuenciaPaginas, numFrames);
