export const Optimo = (secuence, frames) => {
  const pages = secuence.length;
  let page_faults = 0;
  let pages_memori = new Array(frames).fill(null); // Iniciamos la memoria con 'null'
  let result = [];

  // Función para encontrar la página que será reemplazada (la que está más lejos de usarse)
  function findFarthestPage(secuence, pages_memori, current_index) {
    let farthest_index = -1;
    let page_to_replace = -1;

    for (let j = 0; j < pages_memori.length; j++) {
      let future_use = secuence
        .slice(current_index + 1)
        .indexOf(pages_memori[j]);

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
      result.push([...pages_memori]); // Guardar el estado actual
      continue;
    }

    // Si no hay espacio en los frames, buscamos cuál reemplazar
    if (pages_memori.filter((page) => page !== null).length === frames) {
      let page_to_replace = findFarthestPage(secuence, pages_memori, i);

      // Reemplazamos la página que está más lejos de usarse
      pages_memori[page_to_replace] = current_page;
      page_faults++;
    } else {
      // Si hay espacio, simplemente insertamos la página
      pages_memori[pages_memori.indexOf(null)] = current_page;
      page_faults++;
    }

    // Guardar el estado actual después de cada inserción o reemplazo
    result.push([...pages_memori]);
  }

  // Retornar el resultado final
  return {
    pageFaults: page_faults,
    framesState: result,
  };
};

// // Ejemplo de uso
// const secuence = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0];
// const frames = 4;
// const resultado = Optimo(secuence, frames);
// console.log("Frames State: ", resultado.framesState);
// console.log("Page Faults: ", resultado.pageFaults);

