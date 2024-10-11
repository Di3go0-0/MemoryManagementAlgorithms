import React, { useState } from "react";
import { useGlobalContext } from "../Context/Context";
import "./HomePage.css";

function HomePage() {
  const [inputValue, setInputValue] = useState("");
  const { addPages } = useGlobalContext();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    const pages = inputValue.trim().split(/\s+/).map(Number).filter(n => !isNaN(n));
    addPages(pages);
  };

  return (
    <main>
      <div className="input-container">
        <label>
          <input
            type="text"
            placeholder="Introducir páginas separadas por espacio"
            value={inputValue}
            onChange={handleInputChange}
          />
        </label>
        <div className="button-container">
          <button onClick={handleButtonClick}>OK</button>
        </div>
      </div>
      <div className="body"></div>
    </main>
  );
}

export default HomePage;