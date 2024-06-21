import { useContext } from "react";
import { StudentInfsContext } from "../context/StudentContext";

export const useStudentInfsContext = () => {
  const context = useContext(StudentInfsContext);

  if (!context) {
    throw new Error('useStudentInfsContext must be used inside a StudentInfsContextProvider');
  }

  return context;
};
