export const LRU = (List, Frames) => {
  let lru = []; // Lista para mantener las páginas en los frames
  let page_faults = 0; // Contador de fallos de página
  let result = Array(List.length)
    .fill(null)
    .map(() => Array(Frames).fill(null)); // Para guardar los estados de los frames con orden fijo

  // Array para simular el frame con valores iniciales nulos
  let frameArray = Array(Frames).fill(null);

  // Función para gestionar el proceso de inserción en el algoritmo LRU
  const insertIntoLRU = (page, currentIndex) => {
    let pageIndex = lru.indexOf(page);

    // Si la página ya está en los frames, no es un fallo de página y no se reemplaza nada
    if (pageIndex !== -1) {
      lru.splice(pageIndex, 1); // Eliminamos la página de su posición actual en LRU
      lru.push(page); // La movemos al final como la más recientemente utilizada
      result[currentIndex] = [...frameArray]; // Guardamos el estado actual de los frames
      return; // No hay fallo de página
    }

    // Si la página no está en los frames, es un fallo de página
    page_faults++; // Contamos el fallo de página

    // Si hay espacio disponible en los frames
    if (lru.length < Frames) {
      lru.push(page); // Insertamos la nueva página en LRU
      frameArray[lru.length - 1] = page; // Actualizamos el frame correspondiente
    } else {
      // Si no hay espacio, reemplazamos la página menos utilizada
      let pageToReplace = lru.shift(); // Sacamos la página menos recientemente utilizada
      let replaceIndex = frameArray.indexOf(pageToReplace); // Encontramos su índice en los frames
      frameArray[replaceIndex] = page; // Reemplazamos la página en el índice correspondiente
      lru.push(page); // Agregamos la nueva página a LRU
    }

    // Guardamos el estado actual de los frames
    result[currentIndex] = [...frameArray];
  };

  // Iteramos sobre la lista de páginas y las procesamos
  for (let i = 0; i < List.length; i++) {
    insertIntoLRU(List[i], i);
  }

  // Retornamos el estado de los frames y el número de fallos de página
  return {
    framesState: result,
    pageFaults: page_faults,
  };
};

// // Ejemplo de uso
// const secuence = [6, 1, 7, 1, 2, 1, 5, 6, 0, 1, 7, 1, 1, 6, 0, 7, 0 , 1, 2, 6, 1];
// const frames = 3;
// const result = LRU(secuence, frames);

// console.log("Frames State: ", result.framesState);
// console.log("Page Faults: ", result.pageFaults);

