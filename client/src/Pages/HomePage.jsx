import React, { useState } from "react";
import { useGlobalContext } from "../Context/Context";
import OptimoComponent from "../Components/OptimoComponent";
import FifoComponet from "../Components/FifoComponet";
import LruComponent from "../Components/LruComponent";
import FfmComponent from "../Components/FfmComponent";
import All from "../Components/All";

import "./HomePage.css";

function HomePage() {
  const [inputValue, setInputValue] = useState("");
  const [frameValue, setFrameValue] = useState("");
  const [activeComponent, setActiveComponent] = useState(null);
  const { addPages, addFrames } = useGlobalContext();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFrameChange = (event) => {
    setFrameValue(event.target.value);
  };

  const handleButtonClick = () => {
    const pages = inputValue.trim().split(/\s+/).map(Number).filter(n => !isNaN(n));
    if (pages.length === 0 || pages.some(n => n < 0)) {
      alert("Por favor, introduce páginas válidas");
      return;
    }
    addPages(pages);
    const frames = Number(frameValue);
    if (frames <= 0 || isNaN(frames)) {
      alert("Por favor, introduce un número válido de frames");
      return;
    }
    addFrames(frames);
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
      case 'All':
        return <All />;
      default:
        return null;
    }
  };

  return (
    <main>
      <div className="input-container">
        <label className="Pages">
          <input
            type="text"
            placeholder="Introducir las páginas separadas por espacio"
            value={inputValue}
            onChange={handleInputChange}
          />
        </label>
        <label className="Frames">
          <input
            type="number"
            placeholder="Frames"
            value={frameValue}
            onChange={handleFrameChange}
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
            className={activeComponent === 'All' ? 'active' : ''}
            onClick={() => setActiveComponent('All')}
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