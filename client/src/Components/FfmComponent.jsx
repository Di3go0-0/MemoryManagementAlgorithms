import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../Context/Context";
import FFM from "../Algorithms/FFM.js";
import "./css/style.css";

function FfmComponent() {
  const { pagesList, showFrame } = useGlobalContext();
  const [framesState, setFramesState] = useState([]);
  const [pageFaults, setPageFaults] = useState(0);
  const [bitsReferenciaState, setBitsReferenciaState] = useState([]);

  useEffect(() => {
    console.log("FfmComponent useEffect called");
    console.log("pagesList:", pagesList);
    console.log("frames:", showFrame);

    if (pagesList.length > 0 && showFrame > 0) {
      const resultado = FFM(pagesList, showFrame);
      console.log("FFM resultado:", resultado);
      setFramesState(resultado.framesState || []);
      setPageFaults(resultado.pageFaults || 0);
      setBitsReferenciaState(resultado.bitsReferenciaState || []);
    }
  }, [pagesList, showFrame]);

  const renderTable = () => {
    const numRows = showFrame + 1; // Número de filas (showFrame + 1 para el título)
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
              {framesState.map((frame, colIndex) => {
                const prevFrame = framesState[colIndex - 1] || []; // Frame anterior
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

  return (
    <div className="main">
      <div className="result">
        <h2>Page Faults: {pageFaults}</h2>
        <div className="Tables">

        {renderTable()}
        </div>
      </div>
    </div>
  );
}

export default FfmComponent;