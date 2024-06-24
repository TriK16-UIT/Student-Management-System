import { createContext, useReducer, useContext } from 'react';

// Create the context
export const UserContext = createContext();

// Define the reducer
export const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      };
    case 'CREATE_USER':
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id ? { ...user, ...action.payload } : user
        ),
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload.id),
      };
    default:
      return state;
  }
};

// Define the provider
export const UserContextProvider = ({ children }) => {
  const initialState = {
    users: [],
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  // Create a delayed dispatch function
  const delayedDispatch = (action) => {
    setTimeout(() => {
      dispatch(action);
    }, 50);
  };

  return (
    <UserContext.Provider value={{ ...state, dispatch: delayedDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
  return useContext(UserContext);
};
