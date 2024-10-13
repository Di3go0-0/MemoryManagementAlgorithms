import React, { useEffect, useState } from "react";
import "./css/style.css";
import { useGlobalContext } from "../Context/Context";
import Optimo from "../Algorithms/Optimo.js";
import Fifo from "../Algorithms/FIFO.js";
import FFM from "../Algorithms/FFM.js";
import LRU from "../Algorithms/LRU.js";

function All() {

  const { pagesList, showFrame } = useGlobalContext();

  const [OptimoFramesState, setOptimoFramesState] = useState([]);
  const [OptimoPageFaults, setOptimoPageFaults] = useState(0);

  const [FifoFramesState, setFifoFramesState] = useState([]);
  const [FifoPageFaults, setFifoPageFaults] = useState(0);

  const [LruFramesState, setLruFramesState] = useState([]);
  const [LruPageFaults, setLruPageFaults] = useState(0);

  const [FfmFramesState, setFfmFramesState] = useState([]);
  const [FfmPageFaults, setFfmPageFaults] = useState(0);
  const [bitsReferenciaState, setBitsReferenciaState] = useState([]);

  useEffect(() => {
    console.log("All useEffect called");
    console.log("pagesList:", pagesList);
    console.log("frames:", showFrame);

    if (pagesList.length > 0 && showFrame > 0) {
      const resultadoOptimo = Optimo(pagesList, showFrame);
      console.log("Optimo resultado:", resultadoOptimo);
      setOptimoFramesState(resultadoOptimo.framesState || []);
      setOptimoPageFaults(resultadoOptimo.pageFaults || 0);

      const resultadoFifo = Fifo(pagesList, showFrame);
      console.log("Fifo resultado:", resultadoFifo);
      setFifoFramesState(resultadoFifo.framesState || []);
      setFifoPageFaults(resultadoFifo.pageFaults || 0);

      const resultadoLru = LRU(pagesList, showFrame);
      console.log("LRU resultado:", resultadoLru);
      setLruFramesState(resultadoLru.framesState || []);
      setLruPageFaults(resultadoLru.pageFaults || 0);

      const resultadoFfm = FFM(pagesList, showFrame);
      console.log("FFM resultado:", resultadoFfm);
      setFfmFramesState(resultadoFfm.framesState || []);
      setFfmPageFaults(resultadoFfm.pageFaults || 0);
      setBitsReferenciaState(resultadoFfm.bitsReferenciaState || []);
    }
  }, [pagesList, showFrame]);

  const FFMRender = () => {
    const numRows = showFrame + 1; // Número de filas (frames + 1 para el título)
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
                        color: hasReferenceBit ? "#00ff15" : "white", // Cambiar color de fondo si tiene bit de referencia
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
                      color: hasReferenceBit ? "#00ff15" : "white", // Cambiar color de fondo si tiene bit de referencia
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
    const numRows = showFrame + 1
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
              <th>Ranking</th>
              <th>Algorithm</th>
              <th>Page Faults</th>
            </tr>
          </thead>
          <tbody>
            {algorithms.map((algorithm, index) => (
              <tr key={index}>
                <td>{index + 1}°</td>
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
        <div className="result">
            <h1>Optimo</h1>
            <h2>Page Faults: {OptimoPageFaults}</h2>
          <div className="Tables">
            {RenderTable(OptimoFramesState)}
          </div>
            <h1>FIFO</h1>
            <h2>Page Faults: {FifoPageFaults}</h2>
          <div className="Tables">
            {RenderTable(FifoFramesState)}
          </div>
            <h1>LRU</h1>
            <h2>Page Faults: {LruPageFaults}</h2>
          <div className="Tables">
            {RenderTable(LruFramesState)}
          </div>
            <h1>FFM</h1>
            <h2>Page Faults: {FfmPageFaults}</h2>
          <div className="Tables">
            {FFMRender()}
          </div>
            <h1>Statistcs</h1>
          <div className="Tables">
            {EstadisticasTable()}
          </div>
        </div>
    </div>
  );
}

export default All;
