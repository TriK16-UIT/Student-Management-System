import { useContext } from "react";
import { SubjectContext } from "../context/SubjectContext"; // Adjust the import path according to your project structure

export const useSubjectContext = () => {
  const context = useContext(SubjectContext);

  if (!context) {
    throw new Error('useSubjectContext must be used inside a SubjectContextProvider');
  }

  return context;
};
