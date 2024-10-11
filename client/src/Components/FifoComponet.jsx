import React, { useState } from 'react';
import { useGlobalContext } from "../Context/Context";
import FIFO from "../Algorithms/FIFO.js";
import "./css/style.css";

function FifoComponet() {
  const [inputValue, setInputValue] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [framesState, setFramesState] = useState([]);
  const [pageFaults, setPageFaults] = useState(0);

  const { pagesList } = useGlobalContext();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    const frames = Number(inputValue); // Convertir el valor del input a número
    const resultado = FIFO(pagesList, frames);
    setFramesState(resultado.framesState);
    setPageFaults(resultado.pageFaults);
    setShowResult(true); // Mostrar el div result
  };

  const renderTable = () => {
    const numRows = Number(inputValue) + 1; // Número de filas (frames + 1 para el título)
    const numCols = pagesList.length; // Número de columnas

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
              {framesState.map((frame, colIndex) => (
                <td key={colIndex}>{frame[rowIndex] !== null ? frame[rowIndex] : ""}</td>
              ))}
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
          {renderTable()}
        </div>
      )}
    </div>
  );
}

export default FifoComponet;