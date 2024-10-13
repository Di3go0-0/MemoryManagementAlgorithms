import React, { useEffect, useState } from 'react';
import { useGlobalContext } from "../Context/Context";
import FIFO from "../Algorithms/FIFO.js";
import "./css/style.css";

function FifoComponet() {
  const { pagesList, showFrame } = useGlobalContext();
  const [framesState, setFramesState] = useState([]);
  const [pageFaults, setPageFaults] = useState(0);

  useEffect(() => {
    console.log("FifoComponent useEffect called");
    console.log("pagesList:", pagesList);
    console.log("frames:", showFrame);

    if (pagesList.length > 0 && showFrame > 0) {
      const resultado = FIFO(pagesList, showFrame);
      console.log("Fifo resultado:", resultado);
      setFramesState(resultado.framesState || []);
      setPageFaults(resultado.pageFaults || 0);
    }
  }, [pagesList, showFrame]);

  const renderTable = () => {
    const numRows = showFrame + 1;
    const numCols = pagesList.length;

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
              {framesState.map((frame, colIndex) => {
                const prevFrame = framesState[colIndex - 1] || []; // Frame anterior

                // Para la primera columna (colIndex === 0), pintar la primera fila del tbody (rowIndex === 0)
                if (colIndex === 0) {
                  const isFirstRow = rowIndex === 0; // Verificar si estamos en la primera fila del tbody
                  return (
                    <td
                      key={colIndex}
                      style={{
                        backgroundColor: isFirstRow ? '#2c313d' : 'transparent', // Solo pinta la primera fila
                      }}
                    >
                      {frame[rowIndex] !== null && frame[rowIndex] !== undefined ? frame[rowIndex] : ""}
                    </td>
                  );
                }

                // Para las demás columnas, verificar page faults
                const hasPageFault = isPageFault(frame, prevFrame, rowIndex);

                return (
                  <td
                    key={colIndex}
                    style={{
                      backgroundColor: hasPageFault ? '#2c313d' : 'transparent',
                    }}
                  >
                    {frame[rowIndex] !== null && frame[rowIndex] !== undefined ? frame[rowIndex] : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="main">
      <div className="result">
        <h2>Page Faults: {pageFaults}</h2>
        {renderTable()}
      </div>
    </div>
  );
}

export default FifoComponet;