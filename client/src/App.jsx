import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import { ContextProvider } from "./Context/Context";

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
