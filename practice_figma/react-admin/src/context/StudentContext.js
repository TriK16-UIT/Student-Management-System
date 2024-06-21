import { createContext, useReducer } from "react";

// Create the context
export const StudentInfsContext = createContext();

// Define the reducer
export const studentinfsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STUDENTINFS':
    return {
      studentinfs: action.payload
    };
    case 'CREATE_STUDENTINF':
      return {
        studentinfs: [action.payload, ...state.studentinfs]
      };
    case 'DELETE_STUDENTINF':
      return {
        studentinfs: state.studentinfs.filter((w) => w._id !== action.payload._id)
      };
    case 'UPDATE_STUDENTINF':
      return {
        studentinfs: state.studentinfs.map((studentinf) =>
          studentinf._id === action.payload._id ? action.payload : studentinf
        )
      };
    case 'REMOVE_STUDENT_FROM_CLASS':
      return {
        studentinfs: state.studentinfs.map((studentinf) =>
          studentinf._id === action.payload._id ? { ...studentinf, ClassID: "" } : studentinf
        )
      };
    case "GET_STUDENTINF":
      return {
        ...state,
        selectedStudentInf: state.studentinfs.find((w) => w._id === action.payload)
      };
    case 'UPDATE_FORM':
      return {
        ...state,
        form: { ...state.form, ...action.payload }
      };
    case 'MODIFY_WORKOUT':
      return {
        ...state,
        studentinfs: state.studentinfs.map(studentinf =>
          studentinf._id === action.payload._id ? { ...studentinf, ...action.payload } : studentinf
        )
      };
    case 'START_EDITING':
      return {
        ...state,
        editingWorkoutId: action.payload,
        form: state.studentinfs.find(w => w._id === action.payload) || state.form
      };
    case 'STOP_EDITING':
      return {
        ...state,
        editingWorkoutId: null
      };
    
    default:
      return state;
  }
};

// Define the provider
export const StudentInfsContextProvider = ({ children }) => {
  const initialState = {
    studentinfs: [],
    form: {
      firstName: '',
      lastName: '',
      dateOfBirth: new Date(),
      address: '',
      email: '',
      gender: '',
      classID: ''
    },
    editingWorkoutId: null,
  };

  const [state, dispatch] = useReducer(studentinfsReducer, initialState);

  return (
    <StudentInfsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StudentInfsContext.Provider>
  );
};
