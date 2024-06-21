import { useContext } from "react";
import { ConfigContext } from "../context/ConfigContext";

export const useConfigContext = () => {
  const context = useContext(ConfigContext);

  if (!context) {
    throw new Error('useConfigContext must be used inside a ConfigContextProvider');
  }

  return context;
};
