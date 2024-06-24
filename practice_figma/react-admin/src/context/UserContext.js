import { createContext, useReducer, useEffect, useContext } from 'react';

// Create the context
export const UserContext = createContext();

// Define the reducer
export const userReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_USER':
      return { ...state, userinfs: [action.payload, ...state.userinfs] };
    case 'UPDATE_USER':
      return { ...state, userinf: { ...state.userinf, ...action.payload } };
    case 'SET_USERS':
      return { ...state, userinfs: action.payload };
    case 'DELETE_USER':
      return {
        ...state,
        userinfs: state.userinfs.filter(userinf => userinf.id !== action.payload.id)
      };
    default:
      return state;
  }
};

// Define the provider
export const UserContextProvider = ({ children }) => {
  const initialState = {
    userinf: null,
    userinfs: [],
    form: {
        _id: '',
        id: '',
        username: '',
        firstName: '',
        lastName: '',
        email: '',
    },
    editingUserId: null,
  }

  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const userinf = JSON.parse(localStorage.getItem('userinf'));
    if (userinf) {
      dispatch({ type: 'LOGIN', payload: userinf });
    }
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
  return useContext(UserContext);
};
