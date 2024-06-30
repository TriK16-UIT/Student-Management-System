import { createContext, useReducer } from "react";

// Create the context
export const SubjectContext = createContext();

// Define the reducer
export const subjectReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SUBJECTS':
      return {
        subjects: action.payload
      };
    case 'CREATE_SUBJECT':
      return {
        subjects: [action.payload, ...state.subjects]
      };
    case 'DELETE_SUBJECT':
      return {
        subjects: state.subjects.filter((subject) => subject._id !== action.payload._id)
      };
    case 'UPDATE_SUBJECT':
      return {
        subjects: state.subjects.map((subject) =>
          subject._id === action.payload._id ? action.payload : subject
        )
      };
    default:
      return state;
  }
};

// Define the provider
export const SubjectContextProvider = ({ children }) => {
  const initialState = {
    subjects: [],
  };

  const [state, dispatch] = useReducer(subjectReducer, initialState);

  return (
    <SubjectContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SubjectContext.Provider>
  );
};
