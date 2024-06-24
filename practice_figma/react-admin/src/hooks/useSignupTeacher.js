import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useUserContext } from '../context/UserContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {user } = useAuthContext()
  const {dispatch} = useUserContext();
  
  const signup = async (firstName, lastName, email, username, password, role, subjectName) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('http://localhost:4000/api/teacher/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({ firstName, lastName, email, username, password, role, subjectName })
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    } else {
      setIsLoading(false);
      dispatch({ type: 'CREATE_USER', payload: json });
    }
  };

  return { signup, error, isLoading };
};
