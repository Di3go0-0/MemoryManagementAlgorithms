import { Context } from "./Context.jsx";
import { useContext } from "react";

export const useGlobalContext = () => {
  const contexto = useContext(Context);
  if (!contexto) {
    return;
  }
  return contexto;
};
