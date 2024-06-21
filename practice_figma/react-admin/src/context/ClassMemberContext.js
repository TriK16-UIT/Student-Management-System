import React, { createContext, useContext, useReducer } from "react";

export const ClassMemberContext = createContext();

const initialState = {
  classMembers: [],
};

const classMemberReducer = (state, action) => {
  switch (action.type) {
    case "SET_CLASS_MEMBERS":
      return {
        ...state,
        classMembers: action.payload,
      };
    case "UPDATE_CLASS_MEMBER":
      return {
        ...state,
        classMembers: state.classMembers.map((member) =>
          member._id === action.payload._id ? action.payload : member
        ),
      };
    case "ADD_CLASS_MEMBERS":
      return {
        ...state,
        classMembers: [...state.classMembers, ...action.payload],
      };
    case "DELETE_CLASS_MEMBER":
      return {
        ...state,
        classMembers: state.classMembers.filter(member => member._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const ClassMemberProvider = ({ children }) => {
  const [state, dispatch] = useReducer(classMemberReducer, initialState);

  return (
    <ClassMemberContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ClassMemberContext.Provider>
  );
};

export const useClassMemberContext = () => useContext(ClassMemberContext);
