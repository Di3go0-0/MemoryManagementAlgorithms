export const FIFO = (List, Frames) => {
  let fifo = new Array(Frames).fill(null); // Inicializamos el FIFO con 'null'
  let page_faults = 0;
  let result = [];
  let pointer = 0; // Para mantener un seguimiento de la página más vieja

  const insertIntoFIFO = (page) => {
    if (!fifo.includes(page)) {
      fifo[pointer] = page; // Reemplaza la página más vieja
      pointer = (pointer + 1) % Frames; // Mueve el puntero para la próxima página a ser reemplazada
      page_faults++;
    }
    result.push([...fifo]); // Guardar el estado actual
  };

  for (let i = 0; i < List.length; i++) {
    insertIntoFIFO(List[i]);
  }

  // Convertimos el estado final a la estructura deseada con los índices de frames
  const framesState = result.map((state) => {
    let frameState = new Array(Frames).fill(null);
    for (let i = 0; i < Frames; i++) {
      frameState[i] = state[i] !== undefined ? state[i] : null;
    }
    return frameState;
  });

  // Retornamos el resultado final con el conteo de fallos
  return {
    framesState: framesState,
    pageFaults: page_faults,
  };
};

// // Ejemplo de uso
// const secuence = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5];
// const frames = 4;
// const result = Fifo(secuence, frames);

// console.log("Frames State: ", result.framesState);
// console.log("Page Faults: ", result.pageFaults);

