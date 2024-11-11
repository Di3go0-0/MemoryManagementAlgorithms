import { useState, useEffect } from "react";
import { useGlobalContext } from "../Context";
import { FFM } from "../Algorithms";
import "./css/style.css";

export function FfmComponent() {
  const { pagesList, showFrame } = useGlobalContext();
  const [framesState, setFramesState] = useState([]);
  const [pageFaults, setPageFaults] = useState(0);
  const [bitsReferenciaState, setBitsReferenciaState] = useState([]);

  const [secondFrames, setSecondFrames] = useState(0); // Estado para la segunda cantidad de frames
  const [secondFramesState, setSecondFramesState] = useState([]); // Estado para los resultados del segundo frame
  const [secondPageFaults, setSecondPageFaults] = useState(0); // Estado para los page faults del segundo frame
  const [secondBitsReferenciaState, setSecondBitsReferenciaState] = useState(
    [],
  ); // Estado para los bits de referencia del segundo frame

  const [beladyAnomaly, setBeladyAnomaly] = useState(false); // Estado para la anomalía de Belady

  const handleSecondFramesChange = (e) => {
    const { value } = e.target;
    setSecondFrames(Number(value));
  };

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

    if (pagesList.length > 0 && secondFrames > 0) {
      const resultado = FFM(pagesList, secondFrames);
      console.log("Optimo resultado para secondFrames:", resultado);
      setSecondFramesState(resultado.framesState || []);
      setSecondPageFaults(resultado.pageFaults || 0);
      setSecondBitsReferenciaState(resultado.bitsReferenciaState || []);

      // Detectar la anomalía de Belady
      if (secondFrames > showFrame && resultado.pageFaults > pageFaults) {
        setBeladyAnomaly(true);
      } else if (
        showFrame > secondFrames &&
        pageFaults > resultado.pageFaults
      ) {
        setBeladyAnomaly(true);
      } else {
        setBeladyAnomaly(false);
      }
    }
  }, [pagesList, showFrame, secondFrames, pageFaults]);

  const renderTable = (showFrame, framesState, bitsReferenciaState) => {
    const numRows = showFrame + 1; // Número de filas (showFrame + 1 para el título)

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
          {renderTable(showFrame, framesState, bitsReferenciaState)}
        </div>
      </div>

      <div className="extra">
        <h2>Compare with another Frame quantity </h2>
        <input
          type="number"
          value={secondFrames}
          onChange={handleSecondFramesChange}
          placeholder="Enter the number of frames for second table"
        />
        {secondFrames > 0 && (
          <>
            <h3>Page Faults: {secondPageFaults}</h3>
            <div className="Tables">
              {renderTable(
                secondFrames,
                secondFramesState,
                secondBitsReferenciaState,
              )}
            </div>
            <div>
              <h2>Belady Anomaly: {beladyAnomaly ? "Sí" : "No"}</h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

