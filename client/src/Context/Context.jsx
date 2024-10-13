import { createContext, useState, useContext } from "react";

export const Context = createContext();

export const useGlobalContext = () => {
  const contexto = useContext(Context);
  if (!contexto) {
    return;
  }
  return contexto;
};

export const ContextProvider = ({ children }) => {
  const [pagesList, setPagesList] = useState([]);
  const [showFrame, setFrames] = useState(0);

  const addPages = (pages) => {
    setPagesList(pages);
    console.log("Pages list:");
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