import { createContext, useReducer } from "react";

// Create the context
export const ConfigContext = createContext();

// Define the reducer
export const configReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONFIG':
      return {
        config: action.payload
      };
    case 'UPDATE_CONFIG':
      return {
        config: { ...state.config, ...action.payload }
      };
    case 'GET_CONFIG':
      return {
        ...state,
        selectedConfig: state.config
      };
    default:
      return state;
  }
};

// Define the provider
export const ConfigContextProvider = ({ children }) => {
  const initialState = {
    config: {
      minAge: '',
      maxAge: '',
      maxClassSize: '',
      passingGrade: '',
    },
    selectedConfig: null,
  };

  const [state, dispatch] = useReducer(configReducer, initialState);

  return (
    <ConfigContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ConfigContext.Provider>
  );
};
