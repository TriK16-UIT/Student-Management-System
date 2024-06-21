import { createContext, useReducer } from "react";

// Create the context
export const ClassContext = createContext();

// Define the reducer
export const classReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CLASSES':
      return {
        classes: action.payload
      };
    case 'CREATE_CLASS':
      return {
        classes: [action.payload, ...state.classes]
      };
    case 'DELETE_CLASS':
      return {
        classes: state.classes.filter((cls) => cls._id !== action.payload._id)
      };
    case 'UPDATE_CLASS':
      return {
        classes: state.classes.map((cls) =>
          cls._id === action.payload._id ? action.payload : cls
        )
      };
    default:
      return state;
  }
};

// Define the provider
export const ClassContextProvider = ({ children }) => {
  const initialState = {
    classes: [],
  };

  const [state, dispatch] = useReducer(classReducer, initialState);

  return (
    <ClassContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ClassContext.Provider>
  );
};
