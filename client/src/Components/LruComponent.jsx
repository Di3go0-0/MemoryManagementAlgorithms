import React, { useState } from "react";
import "./css/style.css";
import LRU from "../Algorithms/Lru";
import { useGlobalContext } from "../Context/Context";

function LruComponent() {
  const [inputValue, setInputValue] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [framesState, setFramesState] = useState([]);
  const [pageFaults, setPageFaults] = useState(0);

  const { pagesList } = useGlobalContext();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    const frames = Number(inputValue);
    if (frames <= 0 || isNaN(frames)) {
      alert("Por favor, introduce un número válido de frames");
      return;
    }
    const resultado = LRU(pagesList, frames);
    setFramesState(resultado.framesState || []);
    setPageFaults(resultado.pageFaults || 0);
    setShowResult(true);
  };

  const renderTable = () => {
    const numRows = Number(inputValue) + 1;
    const numCols = pagesList.length;
    
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
                <td key={colIndex}>
                  {frame[rowIndex] !== null && frame[rowIndex] !== undefined ? frame[rowIndex] : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  };

  return (
    <div className="main">
      <div className="input-Frame">
        <label>
          <input
            type="Number"
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
          <h2>Fallos de página: {pageFaults}</h2>
          {renderTable()}
        </div>
      )}

    </div>
  );
}

export default LruComponent;
