import React from "react";
import "./HomePage.css";

function HomePage() {
  return (
    <main>
      <div className="input-container">
        <label>
          <input
            type="text"
            placeholder="Introducir páginas separadas por espacio"
          />
        </label>
        <div className="button-container">
          <button>OK</button>
        </div>
      </div>
      <div className="body"></div>
    </main>
  );
}

export default HomePage;
