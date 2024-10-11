import React, { useState } from "react";
import "./css/style.css";
import { useGlobalContext } from "../Context/Context";
import Optimo from "../Algorithms/Optimo";
import Fifo from "../Algorithms/FIFO.js";
import FFM from "../Algorithms/FFM";
import LRU from "../Algorithms/Lru";

function All() {
  const [inputValue, setInputValue] = useState("");
  const [showResult, setShowResult] = useState(false);

  const [FifoFramesState, setFifoFramesState] = useState([]);
  const [FifoPageFaults, setFifoPageFaults] = useState(0);

  const [OptimoFramesState, setOptimoFramesState] = useState([]);
  const [OptimoPageFaults, setOptimoPageFaults] = useState(0);

  const [LruFramesState, setLruFramesState] = useState([]);
  const [LruPageFaults, setLruPageFaults] = useState(0);

  const [FfmFramesState, setFfmFramesState] = useState([]);
  const [FfmPageFaults, setFfmPageFaults] = useState(0);
  const [bitsReferenciaState, setBitsReferenciaState] = useState([]);

  const { pagesList } = useGlobalContext();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    const frames = Number(inputValue); // Convertir el valor del input a número
    if (frames <= 0 || isNaN(frames)) {
      alert("Por favor, introduce un número válido de frames");
      return;
    }

    const resultadoFifo = Fifo(pagesList, frames);
    setFifoFramesState(resultadoFifo.framesState || []);
    setFifoPageFaults(resultadoFifo.pageFaults || 0);

    const resultadoOptimo = Optimo(pagesList, frames);
    setOptimoFramesState(resultadoOptimo.framesState || []);
    setOptimoPageFaults(resultadoOptimo.pageFaults || 0);

    const resultadoLru = LRU(pagesList, frames);
    setLruFramesState(resultadoLru.framesState || []);
    setLruPageFaults(resultadoLru.pageFaults || 0);

    const resultadoFfm = FFM(pagesList, frames);
    setFfmFramesState(resultadoFfm.framesState || []);
    setBitsReferenciaState(resultadoFfm.bitsReferenciaState || []);
    setFfmPageFaults(resultadoFfm.pageFaults || 0);

    setShowResult(true); // Mostrar el div result
  };

  const FFMRender = () => {
    const numRows = Number(inputValue) + 1; // Número de filas (frames + 1 para el título)
    const numCols = pagesList.length; // Número de columnas

    // Detectar si la página en una celda fue reemplazada
    const isPageFault = (currentFrame, prevFrame, rowIndex) => {
      if (!prevFrame) return false; // No hay frame anterior en la primera iteración
      return currentFrame[rowIndex] !== prevFrame[rowIndex]; // Solo verifica cambios en la posición específica
    };

    return (
      <table>
        <thead>
          <tr>
            {pagesList.map((page, index) => (
              <th key={index}>{page}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: numRows - 1 }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {FfmFramesState.map((frame, colIndex) => {
                const prevFrame = FfmFramesState[colIndex - 1] || []; // Frame anterior
                const bitReferencia = bitsReferenciaState[colIndex]?.[rowIndex]; // Obtener el bit de referencia para esta celda
                const hasReferenceBit = bitReferencia === 1;

                // Para la primera columna (colIndex === 0), pintar la primera fila del tbody (rowIndex === 0)
                if (colIndex === 0) {
                  const isFirstRow = rowIndex === 0; // Verificar si estamos en la primera fila del tbody
                  return (
                    <td
                      key={colIndex}
                      style={{
                        backgroundColor: isFirstRow ? "#2c313d" : "transparent", // Solo pinta la primera fila
                        color: hasReferenceBit ? "black" : "white", // Cambiar color de fondo si tiene bit de referencia
                        fontWeight: hasReferenceBit ? "bold" : "normal", // Cambiar el peso de la fuente si tiene bit de referencia
                      }}
                    >
                      {frame[rowIndex] !== null && frame[rowIndex] !== undefined
                        ? frame[rowIndex]
                        : ""}
                    </td>
                  );
                }

                // Para las demás columnas, verificar page faults
                const hasPageFault = isPageFault(frame, prevFrame, rowIndex);

                return (
                  <td
                    key={colIndex}
                    style={{
                      backgroundColor: hasPageFault ? "#2c313d" : "transparent",
                      color: hasReferenceBit ? "black" : "white", // Cambiar color de fondo si tiene bit de referencia
                      fontWeight: hasReferenceBit ? "bold" : "normal", // Cambiar el peso de la fuente si tiene bit de referencia
                    }}
                  >
                    {frame[rowIndex] !== null && frame[rowIndex] !== undefined
                      ? frame[rowIndex]
                      : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const RenderTable = (framesState) => {
    const numRows = Number(inputValue) + 1
    const numCols = pagesList.length

    // Detectar si la página en una celda fue reemplazada
    const isPageFault = (currentFrame, prevFrame, rowIndex) => {
      if (!prevFrame) return false // No hay frame anterior en la primera iteración
      return currentFrame[rowIndex] !== prevFrame[rowIndex] // Solo verifica cambios en la posición específica
    }

    return (
      <table>
        <thead>
          <tr>
            {pagesList.map((page, index) => (
              <th key={index}>{page}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: numRows - 1 }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {framesState.map((frame, colIndex) => {
                const prevFrame = framesState[colIndex - 1] || [] // Frame anterior

                // Para la primera columna (colIndex === 0), pintar la primera fila del tbody (rowIndex === 0)
                if (colIndex === 0) {
                  const isFirstRow = rowIndex === 0 // Verificar si estamos en la primera fila del tbody
                  return (
                    <td
                      key={colIndex}
                      style={{
                        backgroundColor: isFirstRow ? '#2c313d' : 'transparent' // Solo pinta la primera fila
                      }}
                    >
                      {frame[rowIndex] !== null && frame[rowIndex] !== undefined ? frame[rowIndex] : ""}
                    </td>
                  )
                }

                // Para las demás columnas, verificar page faults
                const hasPageFault = isPageFault(frame, prevFrame, rowIndex)

                return (
                  <td
                    key={colIndex}
                    style={{
                      backgroundColor: hasPageFault ? '#2c313d' : 'transparent'
                    }}
                  >
                    {frame[rowIndex] !== null && frame[rowIndex] !== undefined ? frame[rowIndex] : ""}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    )
  };

    const EstadisticasTable = () => {
    const algorithms = [
      { name: 'Optimo', faults: OptimoPageFaults },
      { name: 'FIFO', faults: FifoPageFaults },
      { name: 'LRU', faults: LruPageFaults },
      { name: 'FFM', faults: FfmPageFaults },
    ];
  
    // Ordenar los algoritmos por el número de fallos de página (de menor a mayor)
    algorithms.sort((a, b) => a.faults - b.faults);
  
    return (
      <table>
        <thead>
          <tr>
            <th>Algoritmo</th>
            <th>Page Faults</th>
          </tr>
        </thead>
        <tbody>
          {algorithms.map((algorithm, index) => (
            <tr key={index}>
              <td>{algorithm.name}</td>
              <td>{algorithm.faults}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="main">
      <div className="input-Frame">
        <label>
          <input
            type="number" // Asegurarse de que el input solo acepte números
            placeholder="Frames"
            value={inputValue}
            onChange={handleInputChange}
          />
        </label>
        <div className="button-Frame">
          <button onClick={handleButtonClick}>OK</button>
        </div>
      </div>

      {showResult && (
        <div className="result">
          <div className="Tables">
            <h1>Optimo</h1>
            <h2>Page Faults: {OptimoPageFaults}</h2>
            {RenderTable(OptimoFramesState)}
          </div>
          <div className="Tables">
            <h1>FIFO</h1>
            <h2>Page Faults: {FifoPageFaults}</h2>
            {RenderTable(FifoFramesState)}
          </div>
          <div className="Tables">
            <h1>LRU</h1>
            <h2>Page Faults: {LruPageFaults}</h2>
            {RenderTable(LruFramesState)}
          </div>
          <div className="Tables">
            <h1>FFM</h1>
            <h2>Page Faults: {FfmPageFaults}</h2>
            {FFMRender()}
          </div>
          <div className="Tables">
            <h1>Statistcs</h1>
            {EstadisticasTable()}
          </div>
        </div>
      )}
    </div>
  );
}

export default All;
