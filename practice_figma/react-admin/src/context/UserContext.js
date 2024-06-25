<<<<<<< HEAD
import { createContext, useReducer, useContext } from 'react';
=======
import { createContext, useReducer, useEffect, useContext } from 'react';
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7

// Create the context
export const UserContext = createContext();

// Define the reducer
export const userReducer = (state, action) => {
  switch (action.type) {
<<<<<<< HEAD
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
=======
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
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
      };
    default:
      return state;
  }
};

// Define the provider
export const UserContextProvider = ({ children }) => {
  const initialState = {
<<<<<<< HEAD
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
=======
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
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
  return useContext(UserContext);
};
