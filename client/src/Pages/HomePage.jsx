import React, { useState } from "react";
import { useGlobalContext } from "../Context/Context";
import OptimoComponent from "../Components/OptimoComponent";
import FifoComponet from "../Components/FifoComponet";
import LruComponent from "../Components/LruComponent";
import FfmComponent from "../Components/FfmComponent";
import "./HomePage.css";

function HomePage() {
  const [inputValue, setInputValue] = useState("");
  const [activeComponent, setActiveComponent] = useState(null);
  const { addPages } = useGlobalContext();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    const pages = inputValue.trim().split(/\s+/).map(Number).filter(n => !isNaN(n));
    addPages(pages);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'Optimo':
        return <OptimoComponent />;
      case 'FIFO':
        return <FifoComponet />;
      case 'LRU':
        return <LruComponent />;
      case 'FFM':
        return <FfmComponent />;
      default:
        return null;
    }
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
      <div className="Options">
        <div>
          <button
            className={activeComponent === 'Optimo' ? 'active' : ''}
            onClick={() => setActiveComponent('Optimo')}
          >
            Optimo
          </button>
        </div>
        <div>
          <button
            className={activeComponent === 'FIFO' ? 'active' : ''}
            onClick={() => setActiveComponent('FIFO')}
          >
            FIFO
          </button>
        </div>
        <div>
          <button
            className={activeComponent === 'LRU' ? 'active' : ''}
            onClick={() => setActiveComponent('LRU')}
          >
            LRU
          </button>
        </div>
        <div>
          <button
            className={activeComponent === 'FFM' ? 'active' : ''}
            onClick={() => setActiveComponent('FFM')}
          >
            FFM
          </button>
        </div>
        <div>
          <button
            className={activeComponent === null ? 'active' : ''}
            onClick={() => setActiveComponent(null)}
          >
            Todos
          </button>
        </div>
      </div>
      <div className="body">
        {renderActiveComponent()}
      </div>
    </main>
  );
}

export default HomePage;