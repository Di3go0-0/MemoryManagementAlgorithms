import { createContext, useState, useContext } from "react";

export const Context = createContext();

export const useGlobalContext = () => {
    const contexto = useContext(Context);
    if (!contexto) {
      return
    }
    return contexto;
};

export const ContextProvider = ({ children }) => {
  const [pagesList, setPagesList] = useState([]);

  const addPages = (pages) => {
    setPagesList(pages);
    console.log("Pages list:");
    console.log(pages);
  };

  return (
    <Context.Provider value={{ pagesList, addPages }}>
      {children}
    </Context.Provider>
  );
};