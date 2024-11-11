import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [pagesList, setPagesList] = useState([]);
  const [showFrame, setFrames] = useState(0);

  const addPages = (pages) => {
    setPagesList(pages);
    console.log();
    console.log(pages);
  };

  const addFrames = (frames) => {
    setFrames(frames);
    console.log("Frames:");
    console.log(frames);
  };

  return (
    <Context.Provider value={{ pagesList, addPages, showFrame, addFrames }}>
      {children}
    </Context.Provider>
  );
};

