import { useContext } from "react";
import { ClassMemberContext } from "../context/ClassMemberContext";

export const useClassMemberContext = () => {
  const context = useContext(ClassMemberContext);

  if (!context) {
    throw new Error('useClassMemberContext must be used inside aClassMemberContextProvider');
  }

  return context;
};
