import { createContext, useReducer } from "react";

// Create the context
export const GradesContext = createContext();

// Define the reducer
export const gradesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GRADES':
      return {
        grades: action.payload
      };
    case 'CREATE_GRADE':
      return {
        grades: [action.payload, ...state.grades]
      };
    case 'DELETE_GRADE':
      return {
        grades: state.grades.filter((g) => g._id !== action.payload._id)
      };
    case 'UPDATE_GRADE':
      return {
        grades: state.grades.map((grade) =>
          grade._id === action.payload._id ? action.payload : grade
        )
      };
    case 'GET_GRADE':
      return {
        ...state,
        selectedGrade: state.grades.find((g) => g._id === action.payload)
      };
    case 'UPDATE_FORM':
      return {
        ...state,
        form: { ...state.form, ...action.payload }
      };
    case 'START_EDITING':
      return {
        ...state,
        editingGradeId: action.payload,
        form: state.grades.find(g => g._id === action.payload) || state.form
      };
    case 'STOP_EDITING':
      return {
        ...state,
        editingGradeId: null
      };
    default:
      return state;
  }
};

// Define the provider
export const GradesContextProvider = ({ children }) => {
  const initialState = {
    grades: [],
    form: {
      studentId: '',
      score15Min: '',
      score45Min: '',
      scoreAverage: '',
    },
    editingGradeId: null,
  };

  const [state, dispatch] = useReducer(gradesReducer, initialState);

  return (
    <GradesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GradesContext.Provider>
  );
};
