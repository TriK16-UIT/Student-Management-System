import { useContext } from "react";
import { GradesContext } from "../context/GradeContext"

export const useGradesContext = () => {
  const context = useContext(GradesContext);

  if (!context) {
    throw new Error('useGradesContext must be used inside a GradesContextProvider');
  }

  return context;
};
