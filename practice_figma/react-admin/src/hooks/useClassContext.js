import { useContext } from "react";
import { ClassContext } from "../context/ClassContext"; 

export const useClassContext = () => {
  const context = useContext(ClassContext);

  if (!context) {
    throw new Error('useClassContext must be used inside a ClassContextProvider');
  }

  return context;
};
